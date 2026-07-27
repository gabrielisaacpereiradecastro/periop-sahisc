import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Russell LA, Craig C, Flores EK, et al. Preoperative
 * Management of Medications for Rheumatologic and HIV Diseases: SPAQI
 * Consensus Statement. Mayo Clin Proc. 2022;97(8):1551-1571.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/reumatologico-hiv.md
 *
 * Nota: os AINEs (Tabela 5 do artigo-fonte) têm `classe: "analgesicos"`
 * neste arquivo por decisão de UX (usuário procura AINE em "Analgésicos"),
 * mas a fonte bibliográfica real é este artigo reumatológico (referência 7).
 *
 * Decisões já tomadas pelo usuário sobre ambiguidades do artigo-fonte
 * (ver seção "Ambiguidades para o usuário revisar" do relatório):
 * - AINEs não-seletivos: usa-se o tempo de suspensão específico por fármaco
 *   (baseado em meia-vida), não o "7 dias" genérico da classe — o "7 dias"
 *   aparece só como piso conservador de fallback em `situacoesEspeciais`.
 * - Belimumabe/Rituximabe em LES grave/não-grave: modelados via `indicacoes`
 *   replicando a lógica "continuar ciclo ininterrupto" (grave) vs. "suspender
 *   por 1 intervalo de dose" (não grave); a incerteza do artigo sobre a
 *   célula truncada da Tabela 3 (belimumabe) e sobre a extrapolação da lógica
 *   de LES grave para rituximabe fica registrada em `situacoesEspeciais`.
 * - Canakinumabe e Sarilumabe: o artigo declara não ter encontrado dados
 *   específicos — a recomendação aplicada é por extrapolação de classe,
 *   com aviso de confiança menor em `situacoesEspeciais`.
 * - Anifrolumabe e Voclosporina: a recomendação de texto é "continuar o
 *   ciclo ininterrupto e agendar o procedimento para perto do fim do ciclo".
 *   Como o sistema de tipos não tem um `TipoRecomendacao` dedicado a esse
 *   conceito, ela foi modelada como `suspender_intervalo_dose` com
 *   `numeroIntervalos: 1` (mesma matemática de data — 1 intervalo de dose
 *   após a última aplicação — mesmo o texto não descrevendo uma suspensão
 *   real da dose), com a ressalva explicada em `situacoesEspeciais`.
 *
 * Nota sobre o sistema de tipos: `Indicacao` (usado em `micofenolato`,
 * `azatioprina`, `ciclosporina`, `tacrolimo`, `voclosporina`(*), `belimumabe`,
 * `rituximabe`) não tem campo próprio de `situacoesEspeciais` por indicação —
 * as notas específicas de cada indicação (ex.: incerteza de célula truncada
 * do PDF para belimumabe em LES não grave) foram consolidadas no campo
 * `situacoesEspeciais` do Farmaco, um parágrafo por indicação.
 * (*) Voclosporina não usa `indicacoes` (sem distinção grave/não-grave
 * documentada no artigo para ela) — ver comentário no próprio fármaco.
 */
export const FARMACOS_REUMATOLOGICO_HIV: Farmaco[] = [
  // ---------------------------------------------------------------------
  // Imunossupressores convencionais (Tabela 2, p.1554-1555)
  // ---------------------------------------------------------------------
  {
    id: "metotrexato",
    nomeGenerico: "Metotrexato",
    nomesComerciais: ["Otrexup", "Rasuvo", "Trexall", "Rheumatrex"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Inibe competitivamente a di-hidrofolato redutase. Estudo randomizado com 388 pacientes mostrou risco de infecção pós-operatória de 2% com continuação vs. 15% com suspensão. Suspensão pode causar flare da doença, prejudicando reabilitação (ex.: cirurgia ortopédica).",
    situacoesEspeciais:
      "Nenhuma restrição especial; não é considerado de risco de infecção aumentado.",
    fonteReferenciaNumero: 7,
    fontePagina: "1553-1554",
  },
  {
    id: "auranofina",
    nomeGenerico: "Auranofina",
    nomesComerciais: ["Ridaura"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Suprime resposta inflamatória por inibição de fagocitose. Não há dados específicos sobre manejo perioperatório nem interações anestésicas conhecidas — recomendação por extrapolação/consenso.",
    fonteReferenciaNumero: 7,
    fontePagina: "1553-1554",
  },
  {
    id: "hidroxicloroquina",
    nomeGenerico: "Hidroxicloroquina",
    nomesComerciais: ["Plaquenil"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Interfere no processamento de antígenos; sem aumento de risco de infecção perioperatória.",
    situacoesEspeciais:
      "Pode prolongar intervalo QT — cautela ao usar concomitantemente outros agentes que prolongam QT (anestésicos voláteis, metadona, proclorperazina, ondansetrona).",
    fonteReferenciaNumero: 7,
    fontePagina: "1553-1554",
  },
  {
    id: "ciclofosfamida",
    nomeGenerico: "Ciclofosfamida",
    nomesComerciais: ["Cytoxan", "Neosar"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "suspender_periodo_fixo", valor: 28, unidade: "dias" },
    racional:
      "Agente alquilante; metabólito ativo (acroleína) causa toxicidade cardíaca e de bexiga (cistite hemorrágica); risco significativo de infecção por linfopenia/granulocitopenia (pico em 7 e 14 dias pós-infusão respectivamente). Não há recomendação formal publicada especificamente para reumatologia; extrapolação considerada 'razoável' pelo grupo de 4 semanas para evitar neutropenia no período cirúrgico.",
    situacoesEspeciais:
      "Pode prolongar efeito de succinilcolina (inibe pseudocolinesterase); pode causar SIADH/hiponatremia.",
    fonteReferenciaNumero: 7,
    fontePagina: "1553-1555",
  },
  {
    id: "glicocorticoides_reumatologicos",
    nomeGenerico: "Glicocorticoides (uso reumatológico)",
    nomesComerciais: ["Prednisona", "Medrol (metilprednisolona)"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Uso crônico associado a maior risco de infecção de sítio cirúrgico, deiscência, pneumonia, ITU, reintubação não planejada e readmissão (dose- e duração-dependente: >20 mg/dia de prednisona por >2 semanas, ou >5 mg/dia por período mais longo, aumentam risco). Supressão do eixo hipotálamo-hipófise-adrenal com uso >5mg/dia por >4 semanas — considerar corticoide 'dose de estresse' em cenários de alto estresse cirúrgico. Guideline ACR/AAHKS 2017 sugere reduzir a menos de 16mg/dia (se factível) antes de artroplastia total de quadril/joelho, mas sob orientação do reumatologista tratante (desmame pode causar flare).",
    situacoesEspeciais:
      "Artroplastia de quadril/joelho eletiva — considerar redução guiada por reumatologista. Cirurgia de coluna — risco aumentado de deiscência, TVP, transfusão, mortalidade em usuários crônicos.",
    fonteReferenciaNumero: 7,
    fontePagina: "1555-1556",
  },
  {
    id: "apremilaste",
    nomeGenerico: "Apremilaste",
    nomesComerciais: ["Otezla"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Inibidor da fosfodiesterase 4; meia-vida curta (6-9h); sem evidência de aumento de risco infeccioso ou atraso de cicatrização, e sem interação anestésica conhecida (apesar de uma abordagem conservadora sugerir suspender 2-3 dias, o grupo optou por recomendar continuação dada a falta de evidência de dano).",
    fonteReferenciaNumero: 7,
    fontePagina: "1556",
  },
  {
    id: "sulfassalazina",
    nomeGenerico: "Sulfassalazina",
    nomesComerciais: ["Azulfidine"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Reduz imunoglobulinas e função de células T; preocupação mínima com cicatrização; um estudo cita até menor incidência de infecção perioperatória.",
    situacoesEspeciais: "Uso concomitante com AINEs aumenta risco de sangramento.",
    fonteReferenciaNumero: 7,
    fontePagina: "1556",
  },
  {
    id: "leflunomida",
    nomeGenerico: "Leflunomida",
    nomesComerciais: ["Arava"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor convencional",
    regra: { tipo: "continuar" },
    racional:
      "Metabólito ativo com ação prolongada (persiste até 2 anos após suspensão, com risco de hepatotoxicidade e interações mesmo após parar) — logo, suspender não elimina rapidamente o efeito imunossupressor. Recomendações da literatura são conflitantes, mas o peso das evidências favorece continuação.",
    fonteReferenciaNumero: 7,
    fontePagina: "1556-1558",
  },
  {
    id: "micofenolato",
    nomeGenerico: "Micofenolato",
    nomesComerciais: ["CellCept", "Myfortic"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor para LES",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
      },
    ],
    racional:
      "Dados perioperatórios esparsos e de baixa qualidade; extrapolados de pacientes transplantados em regime imunossupressor semelhante. Apesar de aumento de complicações pós-operatórias relatado com continuação, há preocupação maior com flare de LES grave causando dano a órgão-alvo significativo se a terapia for interrompida.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1559",
  },
  {
    id: "azatioprina",
    nomeGenerico: "Azatioprina",
    nomesComerciais: ["Imuran", "Azasan"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor para LES",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
      },
    ],
    racional:
      "Dados perioperatórios esparsos e de baixa qualidade; extrapolados de pacientes transplantados em regime imunossupressor semelhante. Apesar de aumento de complicações pós-operatórias relatado com continuação, há preocupação maior com flare de LES grave causando dano a órgão-alvo significativo se a terapia for interrompida.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1559",
  },
  {
    id: "ciclosporina",
    nomeGenerico: "Ciclosporina",
    nomesComerciais: ["Gengraf", "Neoral", "Sandimmune"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor para LES",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
      },
    ],
    racional:
      "Dados perioperatórios esparsos e de baixa qualidade; extrapolados de pacientes transplantados em regime imunossupressor semelhante. Apesar de aumento de complicações pós-operatórias relatado com continuação, há preocupação maior com flare de LES grave causando dano a órgão-alvo significativo se a terapia for interrompida.",
    situacoesEspeciais:
      "Múltiplas interações medicamentosas (inibe/induz CYP3A4), nefrotoxicidade, neurotoxicidade, prolongamento de QT; reinício sugerido 3-5 dias pós-operatório se não houver problema de cicatrização/infecção.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1559",
  },
  {
    id: "tacrolimo",
    nomeGenerico: "Tacrolimo",
    nomesComerciais: ["Prograf", "Astagraf", "Hecoria", "Protopic", "Envarsus"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor para LES",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
      },
    ],
    racional:
      "Dados perioperatórios esparsos e de baixa qualidade; extrapolados de pacientes transplantados em regime imunossupressor semelhante. Apesar de aumento de complicações pós-operatórias relatado com continuação, há preocupação maior com flare de LES grave causando dano a órgão-alvo significativo se a terapia for interrompida.",
    situacoesEspeciais:
      "Múltiplas interações medicamentosas (inibe/induz CYP3A4), nefrotoxicidade, neurotoxicidade, prolongamento de QT; reinício sugerido 3-5 dias pós-operatório se não houver problema de cicatrização/infecção.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1559",
  },
  {
    id: "voclosporina",
    nomeGenerico: "Voclosporina",
    nomesComerciais: ["Lupkynis"],
    classe: "reumatologico-hiv",
    subclasse: "Imunossupressor para LES",
    // Sem distinção grave/não-grave documentada para este fármaco
    // especificamente (dado limitado) — por isso não usa `indicacoes` como
    // micofenolato/azatioprina/ciclosporina/tacrolimo.
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Dados perioperatórios esparsos e de baixa qualidade; extrapolados de pacientes transplantados em regime imunossupressor semelhante. Ao contrário de micofenolato/azatioprina/ciclosporina/tacrolimo, o artigo não documenta uma distinção grave/não-grave específica para voclosporina.",
    situacoesEspeciais:
      "Recomendação do artigo: continuar o ciclo ininterrupto e agendar a cirurgia para o final do ciclo (dado limitado, sem distinção de gravidade documentada). Modelado aqui como 'suspender por 1 intervalo de dose' pela matemática de data equivalente (agendar no fim do ciclo em curso), não porque o artigo recomende de fato suspender uma dose.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1559",
  },

  // ---------------------------------------------------------------------
  // Biológicos e DMARDs (Tabela 3, p.1557-1558)
  // Princípio geral: suspender por um ciclo de dosagem completo (~3-5
  // meias-vidas) antes da cirurgia eletiva; reinício em geral aos 14 dias
  // pós-operatórios se não houver problema de cicatrização/infecção
  // (exceção: inibidores de JAK, reinício em 3 dias).
  // ---------------------------------------------------------------------
  {
    id: "adalimumabe",
    nomeGenerico: "Adalimumabe",
    nomesComerciais: ["Humira e biossimilares"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de TNF-α",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Risco de infecção com resultados mistos na literatura (alguns estudos mostram risco discretamente elevado, outros nenhum aumento); pode causar/piorar insuficiência cardíaca e hepatotoxicidade. Pode prejudicar cicatrização (papel do TNF-α no recrutamento celular inflamatório para reparo tecidual). Guideline ACR/AAHKS 2017/2022 e British Society for Rheumatology 2019 também recomendam suspensão baseada na meia-vida.",
    situacoesEspeciais:
      "Dose a cada 1-2 semanas → agendar cirurgia na semana 3. Uma revisão retrospectiva grande sugeriu que pode ser seguro continuar em cirurgias de baixo risco, mas cirurgias de alto risco exigem decisão caso a caso; risco de infecção maior quando combinado com outros imunomoduladores.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1563",
  },
  {
    id: "certolizumabe",
    nomeGenerico: "Certolizumabe",
    nomesComerciais: ["Cimzia"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de TNF-α",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Risco de infecção com resultados mistos na literatura; pode causar/piorar insuficiência cardíaca; pode prejudicar cicatrização (papel do TNF-α no recrutamento celular inflamatório para reparo tecidual). Guideline ACR/AAHKS 2017/2022 e British Society for Rheumatology 2019 também recomendam suspensão baseada na meia-vida.",
    situacoesEspeciais:
      "Dose a cada 2 ou 4 semanas → agendar cirurgia na semana 3 ou 5. Risco de infecção maior quando combinado com outros imunomoduladores.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1563",
  },
  {
    id: "etanercepte",
    nomeGenerico: "Etanercepte",
    nomesComerciais: ["Enbrel"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de TNF-α",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Risco de infecção com resultados mistos na literatura; pode causar/piorar insuficiência cardíaca; pode prejudicar cicatrização (papel do TNF-α no recrutamento celular inflamatório para reparo tecidual). Guideline ACR/AAHKS 2017/2022 e British Society for Rheumatology 2019 também recomendam suspensão baseada na meia-vida.",
    situacoesEspeciais:
      "Dose semanal → agendar cirurgia na semana 2. Uma revisão retrospectiva grande sugeriu que pode ser seguro continuar em cirurgias de baixo risco, mas cirurgias de alto risco exigem decisão caso a caso; risco de infecção maior quando combinado com outros imunomoduladores.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1563",
  },
  {
    id: "golimumabe",
    nomeGenerico: "Golimumabe",
    nomesComerciais: ["Simponi", "Simponi Aria"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de TNF-α",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Risco de infecção com resultados mistos na literatura; pode causar/piorar insuficiência cardíaca; pode prejudicar cicatrização (papel do TNF-α no recrutamento celular inflamatório para reparo tecidual). Guideline ACR/AAHKS 2017/2022 e British Society for Rheumatology 2019 também recomendam suspensão baseada na meia-vida.",
    situacoesEspeciais:
      "Dose a cada 4 semanas SC ou 8 semanas IV → agendar cirurgia na semana 5 (SC) ou semana 9 (IV). Risco de infecção maior quando combinado com outros imunomoduladores.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1563",
  },
  {
    id: "infliximabe",
    nomeGenerico: "Infliximabe",
    nomesComerciais: ["Remicade e biossimilares"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de TNF-α",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Risco de infecção com resultados mistos na literatura; pode causar/piorar insuficiência cardíaca e hepatotoxicidade. Pode prejudicar cicatrização (papel do TNF-α no recrutamento celular inflamatório para reparo tecidual). Guideline ACR/AAHKS 2017/2022 e British Society for Rheumatology 2019 também recomendam suspensão baseada na meia-vida.",
    situacoesEspeciais:
      "Dose a cada 4-8 semanas → agendar cirurgia na semana 5 ou 9. Uma revisão retrospectiva grande sugeriu que pode ser seguro continuar em cirurgias de baixo risco, mas cirurgias de alto risco exigem decisão caso a caso; risco de infecção maior quando combinado com outros imunomoduladores.",
    fonteReferenciaNumero: 7,
    fontePagina: "1558-1563",
  },
  {
    id: "anakinra",
    nomeGenerico: "Anakinra",
    nomesComerciais: ["Kineret"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-1",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Atividade anti-inflamatória modesta comparada a anti-TNF; dados esparsos. Opinião de especialistas (uma revisão): continuar anakinra em procedimentos de baixo risco e suspender 24-48h antes em procedimentos de risco moderado a alto; outros recomendam suspender 24-48h antes de todos os procedimentos.",
    situacoesEspeciais: "Dose diária → agendar cirurgia no dia 2.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "canakinumabe",
    nomeGenerico: "Canakinumabe",
    nomesComerciais: ["Ilaris"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-1",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Atividade anti-inflamatória modesta comparada a anti-TNF; dados esparsos. Em RCT (não perioperatório) canakinumabe foi associado a maior incidência de infecção fatal e sepse.",
    situacoesEspeciais:
      "Dose a cada 4 ou 8 semanas → agendar cirurgia na semana 5 ou 9. O artigo declara não ter encontrado dados/recomendações específicas para este fármaco — recomendação por extrapolação de classe, confiança menor.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "rilonacepte",
    nomeGenerico: "Rilonacepte",
    nomesComerciais: ["Arcalyst"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-1",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Atividade anti-inflamatória modesta comparada a anti-TNF; dados esparsos sobre manejo perioperatório específico deste fármaco.",
    situacoesEspeciais: "Dose semanal → agendar cirurgia na semana 2.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "tocilizumabe",
    nomeGenerico: "Tocilizumabe",
    nomesComerciais: ["Actemra"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-6",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Associado a risco aumentado de infecções em geral, mas dados limitados sugerem não haver aumento em infecções pós-operatórias após cirurgia articular; cicatrização retardada relatada em cirurgia de pé/tornozelo e coluna; um estudo retrospectivo pequeno associou tocilizumabe a maior perda sanguínea em artroplastia total de joelho.",
    situacoesEspeciais:
      "Dose semanal SC ou a cada 4 semanas IV → agendar cirurgia na semana 2 (SC) ou semana 5 (IV).",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "sarilumabe",
    nomeGenerico: "Sarilumabe",
    nomesComerciais: ["Kevzara"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-6",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Evidência para sarilumabe especificamente no manejo perioperatório é inexistente; recomendação segue a lógica geral de inibidores de IL-6.",
    situacoesEspeciais:
      "Dose a cada 2 semanas → agendar cirurgia na semana 3. O artigo declara não ter encontrado dados/recomendações específicas para este fármaco — recomendação por extrapolação de classe, confiança menor.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "secukinumabe",
    nomeGenerico: "Secukinumabe",
    nomesComerciais: ["Cosentyx"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-17",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Sem dados diretos guiando manejo perioperatório; preocupações extrapoladas de outros biológicos (risco infeccioso, cicatrização prejudicada).",
    situacoesEspeciais: "Dose a cada 2 semanas → agendar cirurgia na semana 3.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "brodalumabe",
    nomeGenerico: "Brodalumabe",
    nomesComerciais: ["Siliq"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-17",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Sem dados diretos guiando manejo perioperatório; preocupações extrapoladas de outros biológicos (risco infeccioso, cicatrização prejudicada).",
    situacoesEspeciais: "Dose a cada 2 semanas → agendar cirurgia na semana 3.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "ixekizumabe",
    nomeGenerico: "Ixekizumabe",
    nomesComerciais: ["Taltz"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-17",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Sem dados diretos guiando manejo perioperatório; preocupações extrapoladas de outros biológicos (risco infeccioso, cicatrização prejudicada).",
    situacoesEspeciais: "Dose a cada 4 semanas → agendar cirurgia na semana 5.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563",
  },
  {
    id: "ustequinumabe",
    nomeGenerico: "Ustequinumabe",
    nomesComerciais: ["Stelara"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-12/23",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Em estudo de pacientes com doença de Crohn (outra indicação de ustequinumabe) submetidos a cirurgia abdominal, não houve aumento de infecção de ferida cirúrgica precoce ou tardia; amostras pequenas em outros estudos impedem conclusões robustas.",
    situacoesEspeciais: "Dose a cada 12 semanas → agendar cirurgia na semana 13.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563-1564",
  },
  {
    id: "guselcumabe",
    nomeGenerico: "Guselcumabe",
    nomesComerciais: ["Tremfya"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-23",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Sem dados disponíveis especificamente para inibidores de IL-23 no manejo perioperatório; recomendação por extrapolação de classe.",
    situacoesEspeciais: "Dose a cada 12 semanas → agendar cirurgia na semana 13.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563-1564",
  },
  {
    id: "risanquizumabe",
    nomeGenerico: "Risanquizumabe",
    nomesComerciais: ["Skyrizi"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de IL-23",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Sem dados disponíveis especificamente para inibidores de IL-23 no manejo perioperatório; recomendação por extrapolação de classe.",
    situacoesEspeciais: "Dose a cada 12 semanas → agendar cirurgia na semana 13.",
    fonteReferenciaNumero: 7,
    fontePagina: "1563-1564",
  },
  {
    id: "abatacepte",
    nomeGenerico: "Abatacepte",
    nomesComerciais: ["Orencia"],
    classe: "reumatologico-hiv",
    subclasse: "Bloqueador de coestimulação",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Uma revisão de agentes biológicos recomendou especificamente suspender abatacepte por 25 dias antes de procedimentos cirúrgicos, principalmente por risco de infecção.",
    situacoesEspeciais:
      "Dose semanal SC ou a cada 4 semanas IV → agendar cirurgia na semana 2 (SC) ou semana 5 (IV).",
    fonteReferenciaNumero: 7,
    fontePagina: "1564",
  },
  {
    id: "rituximabe",
    nomeGenerico: "Rituximabe",
    nomesComerciais: ["Rituxan"],
    classe: "reumatologico-hiv",
    subclasse: "Agente anti-célula B",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
      },
    ],
    racional:
      "Rituximabe depleta células B CD20+ por até 6 meses após uma dose; uma revisão sugeriu adiar cirurgia até 100 dias após a última infusão; guideline ACR/AAHKS recomenda suspender de 4 a 6 meses antes de procedimento eletivo planejado. Abordagem individualizada por gravidade de LES: apesar do aumento de complicações pós-operatórias relatado com continuação, há preocupação com flare de LES grave causando dano a órgão-alvo se a terapia for interrompida.",
    situacoesEspeciais:
      "LES não grave: suspender por 1 intervalo de dose (ciclo a cada 6 meses); agendar cirurgia no mês 7. LES grave: a Tabela 3 do artigo indica agendamento no mês 6, mas o texto principal não nomeia rituximabe individualmente ao descrever a lógica de 'continuar ciclo ininterrupto, agendar pouco antes do fim do ciclo' (essa lógica é descrita explicitamente para belimumabe) — não é 100% claro se rituximabe segue exatamente essa lógica em LES grave, dado que seu intervalo de 6 meses é muito mais longo que os intervalos semanais/mensais dos outros agentes anti-célula B. Conferir a Tabela 3 (p.1557, linha Rituximabe) no PDF original antes de uso clínico definitivo caso haja dúvida.",
    fonteReferenciaNumero: 7,
    fontePagina: "1564",
  },
  {
    id: "belimumabe",
    nomeGenerico: "Belimumabe",
    nomesComerciais: ["Benlysta"],
    classe: "reumatologico-hiv",
    subclasse: "Agente anti-célula B",
    indicacoes: [
      {
        id: "les_grave",
        descricao:
          "LES grave (nefrite lúpica significativa, comprometimento renal, lúpus neuropsiquiátrico, citopenias, vasculite)",
        regra: { tipo: "continuar" },
      },
      {
        id: "les_nao_grave",
        descricao: "LES não grave (manifestações cutâneas, úlceras orais, artrite)",
        regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
      },
    ],
    racional:
      "Dados perioperatórios escassos, sobretudo para belimumabe; abordagem individualizada por gravidade do LES, replicando o update ACR/AAHKS de 2022. Apesar de preocupação teórica com aumento de complicações pós-operatórias com continuação, o risco de flare de LES grave com dano a órgão-alvo pesa mais a favor de manter o fármaco ininterrupto em doença grave.",
    situacoesEspeciais:
      "LES grave: continuar o ciclo ininterrupto; agendar o procedimento eletivo a qualquer momento (SC) ou até a semana 4 (IV) — ou seja, pouco antes do fim do ciclo IV mensal (recomendação explícita do texto). LES não grave: suspender por 1 intervalo de dose; agendar cirurgia na semana 2 (SC) ou semana 5 (IV). Recomendação inferida de célula de tabela parcialmente truncada no PDF original — conferir Tabela 3 (p.1557) antes de uso clínico definitivo caso haja dúvida.",
    fonteReferenciaNumero: 7,
    fontePagina: "1564",
  },
  {
    id: "anifrolumabe",
    nomeGenerico: "Anifrolumabe",
    nomesComerciais: ["Saphnelo"],
    classe: "reumatologico-hiv",
    subclasse: "Agente anti-interferon",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Aprovado para LES moderado a grave; principal preocupação perioperatória é risco aumentado de infecções pulmonares; sem interações anestésicas descritas.",
    situacoesEspeciais:
      "Recomendação do artigo: continuar o ciclo ininterrupto e agendar procedimento pouco antes do fim do ciclo (a cada 4 semanas, IV). Modelado aqui como 'suspender por 1 intervalo de dose' pela matemática de data equivalente (agendar no fim do ciclo em curso), não porque o artigo recomende de fato suspender uma dose.",
    fonteReferenciaNumero: 7,
    fontePagina: "1564-1565",
  },
  {
    id: "baricitinibe",
    nomeGenerico: "Baricitinibe",
    nomesComerciais: ["Olumiant"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de Janus quinase (JAK)",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "Revisão sistemática/meta-análise em pacientes não cirúrgicos em uso de inibidor de JAK (tofacitinibe) mostrou risco claramente elevado de infecções; tromboembolismo venoso/arterial é evento adverso conhecido associado à classe — relevante no perioperatório (advertência de tarja preta por risco aumentado de infarto do miocárdio, AVC ou trombose; considerar profilaxia trombótica perioperatória). Guidelines ACR/AAHKS e British Society for Rheumatology sugeriam suspender por 7 dias, mas dados recentes apontam risco de flare com suspensão prolongada — por isso o grupo optou por um tempo mais curto (3 dias), alinhado com o update ACR/AAHKS de 2022. Agendamento: dia 4.",
    situacoesEspeciais:
      "Baricitinibe não tem metabolismo hepático significativo — é eliminado predominantemente inalterado pelo rim (diferente de tofacitinibe/upadacitinibe, metabolizados via CYP450).",
    fonteReferenciaNumero: 7,
    fontePagina: "1565",
  },
  {
    id: "tofacitinibe",
    nomeGenerico: "Tofacitinibe",
    nomesComerciais: ["Xeljanz"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de Janus quinase (JAK)",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "Revisão sistemática/meta-análise em pacientes não cirúrgicos em uso de tofacitinibe mostrou risco claramente elevado de infecções; tromboembolismo venoso/arterial é evento adverso conhecido associado à classe — relevante no perioperatório (advertência de tarja preta por risco aumentado de infarto do miocárdio, AVC ou trombose; considerar profilaxia trombótica perioperatória). Guidelines ACR/AAHKS e British Society for Rheumatology sugeriam suspender por 7 dias, mas dados recentes apontam risco de flare com suspensão prolongada — por isso o grupo optou por um tempo mais curto (3 dias), alinhado com o update ACR/AAHKS de 2022. Agendamento: dia 4.",
    situacoesEspeciais:
      "Metabolizado via CYP3A4 — ajuste de dose pode ser necessário com inibidores fortes dessa via; parcialmente excretado por via renal.",
    fonteReferenciaNumero: 7,
    fontePagina: "1565",
  },
  {
    id: "upadacitinibe",
    nomeGenerico: "Upadacitinibe",
    nomesComerciais: ["Rinvoq"],
    classe: "reumatologico-hiv",
    subclasse: "Inibidor de Janus quinase (JAK)",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "Revisão sistemática/meta-análise em pacientes não cirúrgicos em uso de inibidor de JAK (tofacitinibe) mostrou risco claramente elevado de infecções; tromboembolismo venoso/arterial é evento adverso conhecido associado à classe — relevante no perioperatório (advertência de tarja preta por risco aumentado de infarto do miocárdio, AVC ou trombose; considerar profilaxia trombótica perioperatória). Guidelines ACR/AAHKS e British Society for Rheumatology sugeriam suspender por 7 dias, mas dados recentes apontam risco de flare com suspensão prolongada — por isso o grupo optou por um tempo mais curto (3 dias), alinhado com o update ACR/AAHKS de 2022. Agendamento: dia 4.",
    situacoesEspeciais:
      "Metabolizado via CYP3A4 e CYP2D6 — ajuste de dose pode ser necessário com inibidores fortes dessas vias; parcialmente excretado por via renal.",
    fonteReferenciaNumero: 7,
    fontePagina: "1565",
  },

  // ---------------------------------------------------------------------
  // Antirretrovirais para HIV (Tabela 4, p.1560-1567)
  // Recomendação de consenso geral e única para TODAS as classes de ART:
  // continuar no pré-operatório, incluindo no dia da cirurgia (DOS). Não
  // suspender parcialmente um esquema combinado (risco de resistência).
  // Idealmente, carga viral indetectável antes de cirurgia eletiva. Se NPO
  // prolongado ou via oral impossibilitada, consultar especialista em HIV
  // para adaptar o esquema — nunca interromper por conta própria.
  // ---------------------------------------------------------------------
  {
    id: "art_nrtis",
    nomeGenerico: "Inibidores nucleosídeos da transcriptase reversa (NRTIs)",
    nomesComerciais: [
      "Abacavir (ABC)",
      "Didanosina (ddI)",
      "Emtricitabina (FTC)",
      "Estavudina (d4T)",
      "Lamivudina (3TC)",
      "Tenofovir alafenamida (TAF)",
      "Tenofovir disoproxila fumarato (TDF)",
      "Zidovudina (AZT)",
      "Epzicom/Kivexa",
      "Trizivir",
      "Descovy",
      "Truvada",
      "Combivir",
    ],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — NRTI",
    regra: { tipo: "continuar" },
    racional:
      "Poucas interações medicamentosas significativas — a maioria dos NRTIs não interage com o sistema do citocromo P450 hepático. Recomendação categórica do artigo para toda a terapia antirretroviral (ART): continuar no pré-operatório, incluindo DOS — suspensão parcial de um esquema combinado não é recomendada pelo risco de resistência viral.",
    situacoesEspeciais:
      "Risco de acidose lática — evitar infusão de propofol em pacientes tratados com NRTIs no perioperatório. Redução de dose indicada se função renal pós-operatória prejudicada (para FTC, 3TC, TAF, TDF, AZT). Zidovudina (AZT/ZDV) disponível em formulação IV — consultar especialista em HIV se considerado. Comprimidos combinados podem precisar ser trocados por fármacos individuais para dosagem apropriada.",
    fonteReferenciaNumero: 7,
    fontePagina: "1560, 1565-1566",
  },
  {
    id: "art_nnrtis",
    nomeGenerico: "Inibidores não nucleosídeos da transcriptase reversa (NNRTIs)",
    nomesComerciais: [
      "Delavirdina (DLV)",
      "Doravirina (DOR)",
      "Efavirenz (EFV)",
      "Etravirina (ETR)",
      "Nevirapina (NVP)",
      "Rilpivirina (RPV)",
      "Delstrigo",
      "Atripla",
      "Odefsey",
      "Complera",
    ],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — NNRTI",
    regra: { tipo: "continuar" },
    racional:
      "Metabolizados pelo citocromo P450 hepático — interações medicamentosas variáveis relevantes no perioperatório. Recomendação categórica do artigo para toda a ART: continuar no pré-operatório, incluindo DOS.",
    situacoesEspeciais:
      "Coadministração com opioides e benzodiazepínicos comumente usados no perioperatório (fentanil, oxicodona, hidrocodona, tramadol, midazolam) pode reduzir os níveis desses fármacos e a eficácia de sedação/analgesia; vários NNRTIs prolongam o intervalo QT (risco de arritmia se combinados com outros prolongadores de QT); com bloqueadores de canal de cálcio, podem reduzir significativamente a eficácia do bloqueio. Comprimidos de nevirapina (liberação prolongada) nunca devem ser triturados (existe suspensão disponível); cápsulas de efavirenz podem ser abertas, mas o comprimido não deve ser triturado; rilpivirina requer acidez gástrica para absorção — se for necessário bloqueador ácido no pós-operatório com paciente NPO, considerar mudança do esquema ART antes da cirurgia.",
    fonteReferenciaNumero: 7,
    fontePagina: "1560-1561, 1566",
  },
  {
    id: "art_inibidores_protease",
    nomeGenerico: "Inibidores de protease",
    nomesComerciais: [
      "Amprenavir (APV)",
      "Atazanavir (ATV)",
      "Darunavir (DRV)",
      "Fosamprenavir (FPV)",
      "Indinavir (IDV)",
      "Nelfinavir (NFV)",
      "Ritonavir (RTV)",
      "Saquinavir (SQV)",
      "Tipranavir (TPV)",
      "Evotaz",
      "Prezcobix",
      "Symtuza",
      "Kaletra",
    ],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — inibidor de protease",
    regra: { tipo: "continuar" },
    racional:
      "Fortes inibidores do CYP3A4 hepático — interações medicamentosas significativas e relevantes no perioperatório. Recomendação categórica do artigo para toda a ART: continuar no pré-operatório, incluindo DOS.",
    situacoesEspeciais:
      "Prolongam efeito de vários opioides e benzodiazepínicos (recuperação anestésica mais lenta, sedação e depressão respiratória aumentadas — considerar doses menores/titulação); prolongam intervalo QT (risco de arritmia com sevoflurano, ondansetrona, proclorperazina, prometazina, droperidol); interação com bloqueadores de canal de cálcio e betabloqueadores (aumento de PR, bradicardia, hipotensão, arritmias); supressores ácidos (IBP, bloqueadores H2) podem aumentar toxicidade do inibidor de protease; podem potencializar efeito de corticoides. Não requer ajuste de dose para insuficiência renal, mas a dose de muitos outros fármacos pode precisar de ajuste — considerar farmacêutico. Atazanavir requer acidez gástrica para absorção (mesma consideração de bloqueador ácido pós-operatório citada para rilpivirina).",
    fonteReferenciaNumero: 7,
    fontePagina: "1561, 1566-1567",
  },
  {
    id: "art_inibidores_integrase",
    nomeGenerico: "Inibidores de integrase",
    nomesComerciais: [
      "Cabotegravir (CAB)",
      "Dolutegravir (DTG)",
      "Elvitegravir (EVG)",
      "Raltegravir (RAL)",
      "Biktarvy",
      "Cabenuva",
      "Triumeq",
      "Dovato",
      "Juluca",
      "Genvoya",
      "Stribild",
    ],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — inibidor de integrase",
    regra: { tipo: "continuar" },
    racional:
      "Elvitegravir metabolizado por CYP3A4 (interações mais prováveis); os demais, em geral, não requerem redução de dose por insuficiência renal. Recomendação categórica do artigo para toda a ART: continuar no pré-operatório, incluindo DOS.",
    situacoesEspeciais:
      "Concentrações podem ser reduzidas por antiácidos/suplementos com cátions polivalentes; se insuficiência renal pós-operatória for esperada, considerar trocar para esquema com componentes individuais sob supervisão de especialista em HIV; raltegravir existe em comprimido mastigável que pode ser triturado ou administrado por sonda; nem todos os inibidores de integrase estão disponíveis como fármacos individuais.",
    fonteReferenciaNumero: 7,
    fontePagina: "1561-1562, 1567",
  },
  {
    id: "art_inibidores_entrada",
    nomeGenerico: "Inibidores de entrada em CD4 (CCR5/gp41)",
    nomesComerciais: ["Enfuvirtida (Fuzeon)", "Fostemsavir (Rukobia)", "Maraviroque (Selzentry)"],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — inibidor de entrada",
    regra: { tipo: "continuar" },
    racional:
      "Uso incomum, limitado a pacientes com vírus resistente e experiência prévia de tratamento; hospitais provavelmente não têm esses fármacos em estoque — orientar paciente a trazer o próprio suprimento. Recomendação categórica do artigo para toda a ART: continuar no pré-operatório, incluindo DOS.",
    situacoesEspeciais:
      "Nenhum ajuste de dose necessário para insuficiência renal; maraviroque e fostemsavir são fortes inibidores do CYP450 hepático; maraviroque disponível em formulação líquida oral; maraviroque associado a risco aumentado de infarto do miocárdio/isquemia, particularmente em pacientes com hipotensão postural, doença cardíaca de base, ou em uso de anti-hipertensivos; fostemsavir pode causar prolongamento do QT (especialmente em doses maiores ou com fármacos que afetam substratos de CYP3A); interações medicamentosas com outros fármacos que também prolongam QT.",
    fonteReferenciaNumero: 7,
    fontePagina: "1562, 1567",
  },
  {
    id: "ibalizumabe",
    nomeGenerico: "Ibalizumabe",
    nomesComerciais: ["Trogarzo"],
    classe: "reumatologico-hiv",
    subclasse: "Antirretroviral — inibidor de pós-fixação em CD4",
    regra: { tipo: "continuar" },
    racional:
      "Anticorpo monoclonal que bloqueia entrada do HIV-1 em células CD4; único inibidor de pós-fixação aprovado; administrado por infusão IV a cada 2 semanas; usado apenas em pacientes já tratados/experientes. Recomendação categórica do artigo para toda a ART: continuar no pré-operatório, incluindo DOS.",
    situacoesEspeciais:
      "Discutir plano cirúrgico com o provedor de HIV. Risco alto de resistência viral se o paciente ficar em NPO por mais de 24 horas no perioperatório enquanto recebe monoterapia (efetivamente); pode ser administrado precocemente para evitar dificuldades logísticas de administração durante a internação; sem ajuste de dose necessário para insuficiência renal.",
    fonteReferenciaNumero: 7,
    fontePagina: "1562, 1567-1568",
  },

  // ---------------------------------------------------------------------
  // AINEs (Tabela 5, p.1567-1568) — classe "analgesicos" por decisão de UX
  // (fonte bibliográfica real é este artigo reumatológico, referência 7).
  // Usa-se o tempo de suspensão específico por fármaco (baseado em
  // meia-vida), não o "7 dias" genérico da classe — ver nota no topo do
  // arquivo. Racional geral: risco de sangramento em sítio cirúrgico, lesão
  // renal e eventos cardiovasculares associados à inibição de COX-1
  // (proteção gastrointestinal e agregação plaquetária); literatura sobre
  // efeitos adversos perioperatórios de AINEs é inconsistente/mista.
  // ---------------------------------------------------------------------
  {
    id: "diclofenaco",
    nomeGenerico: "Diclofenaco",
    nomesComerciais: ["Cataflam", "Voltaren-XR", "Dyloject", "Cambia", "Zipsor", "Zorvolex"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 2-3h. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "diflunisal",
    nomeGenerico: "Diflunisal",
    nomesComerciais: ["Dolobid"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 8-12h. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "etodolaco",
    nomeGenerico: "Etodolaco",
    nomesComerciais: ["Lodine"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 7-11h. Na dose diária de 600-800mg é relativamente COX-2 seletivo; poderia ser continuado na ausência de cirurgia de alto risco de sangramento. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "fenoprofeno",
    nomeGenerico: "Fenoprofeno",
    nomesComerciais: ["Nalfon"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 3h. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "flurbiprofeno",
    nomeGenerico: "Flurbiprofeno",
    nomesComerciais: ["Ansaid", "Ocufen", "Strepfen"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 7-8h. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "ibuprofeno",
    nomeGenerico: "Ibuprofeno",
    nomesComerciais: ["Brufen", "Advil", "Motrin", "Nurofen"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 2-3h. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "indometacina",
    nomeGenerico: "Indometacina",
    nomesComerciais: ["Indocin", "Indocid"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 4-5h (valor como consta na Tabela 5 do artigo). Potente inibidor da síntese de prostaglandina renal. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "cetoprofeno",
    nomeGenerico: "Cetoprofeno",
    nomesComerciais: ["Orudis", "Oruvail"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 2-4h. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "cetorolaco",
    nomeGenerico: "Cetorolaco",
    nomesComerciais: ["Toradol"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 6h. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "meloxicam",
    nomeGenerico: "Meloxicam",
    nomesComerciais: ["Mobic"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 15-20h. Na dose diária de 7,5mg é relativamente COX-2 seletivo (5-50x); poderia ser continuado na ausência de cirurgia de alto risco de sangramento. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "nabumetona",
    nomeGenerico: "Nabumetona",
    nomesComerciais: ["Relafen"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 6, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 26h. Na dose diária ≥1000mg/d é relativamente COX-2 seletivo. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "naproxeno",
    nomeGenerico: "Naproxeno",
    nomesComerciais: ["Aleve", "Naprosyn"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 12-17h. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "oxaprozina",
    nomeGenerico: "Oxaprozina",
    nomesComerciais: ["Daypro"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 10, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 36-92h. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias — neste caso o valor específico por meia-vida (10 dias) é MAIOR que o piso genérico.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "piroxicam",
    nomeGenerico: "Piroxicam",
    nomesComerciais: ["Feldene"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 10, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 50h. Doses diárias ≥20mg aumentam risco de complicações gastrointestinais sérias. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias — neste caso o valor específico por meia-vida (10 dias) é MAIOR que o piso genérico.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "salsalato",
    nomeGenerico: "Salsalato",
    nomesComerciais: ["Mono-Gesic", "Salflex", "Disalcid", "Salsitab"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 1h. Não interfere na função plaquetária/sangramento GI; nefrotoxicidade rara. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "sulindaco",
    nomeGenerico: "Sulindaco",
    nomesComerciais: ["Clinoril", "Sunil"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 16-18h. Pode causar anormalidades reversíveis de enzimas hepáticas. Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "tolmetina",
    nomeGenerico: "Tolmetina",
    nomesComerciais: ["Tolectin"],
    classe: "analgesicos",
    subclasse: "AINE não seletivo (inibidor de COX-1/COX-2)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "Risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Literatura sobre efeitos adversos perioperatórios de AINEs é inconsistente, com resultados mistos.",
    situacoesEspeciais:
      "Meia-vida: 2-6h. Classificado no artigo como fármaco mais COX-1 seletivo (nota de rodapé da Tabela 5). Piso conservador genérico da classe (Tabela 5), caso a meia-vida exata não possa ser confirmada: suspender por 7 dias.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567-1568",
  },
  {
    id: "celecoxibe",
    nomeGenerico: "Celecoxibe",
    nomesComerciais: ["Celebrex"],
    classe: "analgesicos",
    subclasse: "Inibidor seletivo de COX-2",
    regra: { tipo: "continuar" },
    racional:
      "Efeito mínimo sobre a coagulação (sem efeito na função plaquetária), o que o torna atrativo na população cirúrgica; cada vez mais incorporado em protocolos perioperatórios de analgesia multimodal para reduzir uso de opioide e melhorar recuperação funcional, embora a maioria dos estudos não seja potente o suficiente para avaliar efeitos adversos como desfecho primário.",
    situacoesEspeciais: "Meia-vida: 11h.",
    fonteReferenciaNumero: 7,
    fontePagina: "1568",
  },
];
