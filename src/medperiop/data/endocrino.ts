import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Pfeifer KJ, Selzer A, Mendez CE, et al. Preoperative
 * Management of Endocrine, Hormonal, and Urologic Medications: SPAQI
 * Consensus Statement. Mayo Clin Proc. 2021;96(6):1655-1669.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/endocrino.md
 *
 * Fora de escopo deste arquivo (decisões já tomadas, ver relatório):
 * - GLP-1 agonistas (liraglutida, lixisenatida, semaglutida, dulaglutida) —
 *   coberto por app dedicado.
 * - "Dose de estresse" de corticosteroide — o próprio artigo trata como tema
 *   em debate, fora do escopo das suas recomendações; não há limiar numérico.
 */
export const FARMACOS_ENDOCRINO: Farmaco[] = [
  // ---------------------------------------------------------------------
  // Insulinas (Tabela 1)
  // ---------------------------------------------------------------------
  {
    id: "insulina_basal_longa",
    nomeGenerico: "Insulina de ação longa (basal)",
    nomesComerciais: ["Glargina", "Detemir", "Degludeca"],
    classe: "endocrino",
    subclasse: "Insulina, ação longa (basal)",
    regra: {
      tipo: "reduzir_dose",
      ajusteDose:
        "Reduzir para 60%-80% da dose usual na noite anterior (ou na manhã da cirurgia, se normalmente tomada de manhã); 25%-50% de redução é razoável em pacientes de alto risco de hipoglicemia.",
    },
    racional:
      "Manter insulina basal evita cetoacidose em DM tipo 1; a farmacocinética de longa duração permite ajuste percentual em vez de suspensão. Um RCT (n=410, tipo 1 e 2) mostrou que redução empírica de 20% da dose de glargina na noite anterior foi tão eficaz quanto ajuste guiado por tabela médica. A ADA recomenda 80% da dose usual de insulina de longa duração na manhã da cirurgia.",
    situacoesEspeciais:
      "Risco elevado de hipoglicemia = hipoglicemia noturna frequente, necessidade de lanche antes de dormir para evitar hipoglicemia, queda glicêmica noturna >40 mg/dL, desnutrição, insuficiência renal ou hepática.",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },
  {
    id: "insulina_nph",
    nomeGenerico: "Insulina NPH (ação intermediária)",
    nomesComerciais: ["NPH"],
    classe: "endocrino",
    subclasse: "Insulina, ação intermediária (NPH)",
    regra: {
      tipo: "reduzir_dose",
      ajusteDose:
        "Reduzir a dose em 50% na manhã da cirurgia; considerar redução adicional de 25% na noite anterior (reduções potencialmente cumulativas, não alternativas). Especialmente em DM tipo 2 e risco aumentado de hipoglicemia.",
    },
    racional:
      "NPH tem efeito de pico e cobertura prandial do almoço, exigindo redução na manhã da cirurgia quando o paciente estará em jejum. A ADA recomenda metade da dose usual de NPH na manhã da cirurgia.",
    situacoesEspeciais:
      "Mesmos fatores de risco de hipoglicemia citados para a insulina basal longa.",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },
  {
    id: "insulina_premisturada",
    nomeGenerico: "Insulina pré-misturada (premixed)",
    nomesComerciais: [
      "NPH/regular humana 70/30",
      "Lispro protamina/lispro 75/25",
      "Lispro protamina/lispro 50/50",
    ],
    classe: "endocrino",
    subclasse: "Insulina pré-misturada",
    regra: {
      tipo: "reduzir_dose",
      ajusteDose:
        "Continuar dose usual no dia anterior. Na manhã da cirurgia: se hiperglicemia de jejum (>200 mg/dL), usar metade da dose usual de insulina pré-misturada; caso contrário, NÃO administrar a pré-mistura — aplicar metade da dose do componente intermediário/longo como insulina intermediária ou longa isolada.",
    },
    racional:
      "Evita o componente prandial/curto da pré-mistura em paciente em jejum, mas preserva cobertura basal.",
    situacoesEspeciais:
      "Decisão condicional ao valor de glicemia de jejum medido no dia (>200 mg/dL é o corte citado, point-of-care).",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },
  {
    id: "insulina_bomba",
    nomeGenerico: "Insulina em bomba de infusão contínua",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Insulina em bomba (pump)",
    regra: {
      tipo: "reduzir_dose",
      ajusteDose:
        "Manter taxa basal a 60%-80% do usual até o paciente chegar à área de preparo anestésico na manhã da cirurgia; não administrar bolus.",
    },
    racional:
      "Manutenção do fornecimento basal contínuo evita cetoacidose; bolus prandial não é necessário em jejum.",
    situacoesEspeciais:
      "Consultar o diabetologista do paciente sempre que possível; manejo intraoperatório/pós-operatório é fora do escopo do artigo.",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },
  {
    id: "insulina_prandial",
    nomeGenerico: "Insulina de ação curta/rápida (prandial)",
    nomesComerciais: ["Regular", "Aspart", "Lispro", "Glulisina"],
    classe: "endocrino",
    subclasse: "Insulina, ação curta/rápida (prandial)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Cobertura prandial não é necessária em jejum; manter aumentaria risco de hipoglicemia.",
    situacoesEspeciais:
      "Pode ser usada na manhã da cirurgia apenas para tratamento urgente de hiperglicemia aguda, conforme protocolo institucional (via subcutânea ou infusão).",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },
  {
    id: "insulina_u500",
    nomeGenerico: "Insulina regular U-500 (concentrada)",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Insulina U-500 (concentrada)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Continuar dose usual no dia anterior; reduzir a dose na manhã da cirurgia com base na glicemia do paciente e nos fatores de risco de hipoglicemia. O artigo não dá um percentual fixo de redução — insulina concentrada de alta potência requer ajuste cuidadoso e individualizado, idealmente com o diabetologista do paciente.",
    },
    racional:
      "Insulina concentrada de alta potência requer ajuste cuidadoso e individualizado.",
    situacoesEspeciais:
      "Mesmos fatores de risco de hipoglicemia já listados para insulina basal.",
    fonteReferenciaNumero: 3,
    fontePagina: "3-4",
  },

  // ---------------------------------------------------------------------
  // Hipoglicemiantes não-insulina (Tabela 2)
  // ---------------------------------------------------------------------
  {
    id: "alfa_glicosidase_inibidores",
    nomeGenerico: "Alfa-glicosidase inibidores",
    nomesComerciais: ["Acarbose", "Miglitol"],
    classe: "endocrino",
    subclasse: "Alfa-glicosidase inibidores",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Mecanismo (retardo da absorção intestinal de carboidratos) tem baixo risco de hipoglicemia isolado, mas não há estudos perioperatórios; recomendação segue diretriz ADA de suspender no dia da cirurgia.",
    situacoesEspeciais:
      "Nenhuma condicional adicional; efeito colateral conhecido é desconforto GI/gases, não perioperatório específico.",
    fonteReferenciaNumero: 3,
    fontePagina: "4-5",
  },
  {
    id: "metformina",
    nomeGenerico: "Metformina",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Metformina (biguanida)",
    condicaoClinica: {
      pergunta:
        "Função renal preservada (GFR > 50 mL/min) E cirurgia ambulatorial com no máximo uma refeição a ser omitida?",
      regraSeSim: { tipo: "continuar" },
      regraSeNao: { tipo: "suspender_dia_cirurgia" },
    },
    racional:
      "Risco teórico de acidose láctica (inibição da gliconeogênese hepática), mas revisão sistemática Cochrane 2010 (347 ensaios, 70.490 pacientes-ano) não mostrou aumento de acidose láctica em uso ambulatorial. O risco perioperatório real vem de condições que aumentam risco de acidose láctica no período (função renal comprometida, insuficiência cardíaca, exposição a contraste), não da metformina isolada.",
    situacoesEspeciais:
      "Os autores dizem explicitamente que não recomendam cancelar/adiar cirurgia se metformina foi tomada na manhã da cirurgia. Se o GFR não for conhecido, a recomendação padrão (suspender na manhã) é a aposta mais segura.",
    fonteReferenciaNumero: 3,
    fontePagina: "4-5",
  },
  {
    id: "dpp4_inibidores",
    nomeGenerico: "DPP-4 inibidores",
    nomesComerciais: ["Vildagliptina", "Sitagliptina", "Saxagliptina", "Linagliptina", "Alogliptina"],
    classe: "endocrino",
    subclasse: "DPP-4 inibidores",
    condicaoClinica: {
      pergunta:
        "Cirurgia ambulatorial com no máximo uma refeição a ser omitida (uso ininterrupto pode ser aceitável)?",
      regraSeSim: { tipo: "continuar" },
      regraSeNao: { tipo: "suspender_dia_cirurgia" },
    },
    racional:
      "Não há benefício demonstrado em prevenir hiperglicemia pós-operatória quando administrado 1-2 dias antes de cirurgia cardíaca/não-cardíaca vs placebo; em idosos ou pacientes com IC (real ou suspeita), uso de DPP-4i associado a piora de insuficiência cardíaca.",
    situacoesEspeciais:
      "Cautela em pacientes idosos ou com IC (suspeita ou confirmada). Linguagem do carve-out ambulatorial é mais fraca/hedged ('pode ser aceitável') que a do metformina.",
    fonteReferenciaNumero: 3,
    fontePagina: "5-7",
  },
  {
    id: "sulfonilureias_glinidas",
    nomeGenerico: "Sulfonilureias e glinidas (secretagogos de insulina)",
    nomesComerciais: ["Glipizida", "Glibenclamida (glyburide)", "Glimepirida", "Repaglinida", "Nateglinida"],
    classe: "endocrino",
    subclasse: "Sulfonilureias e glinidas (secretagogos de insulina)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Estimulam secreção de insulina endógena independentemente da glicemia/ingestão alimentar, causando risco de hipoglicemia, sobretudo com função renal comprometida ou baixa ingestão oral. Prevalência de hipoglicemia aumentada em internados >65 anos e GFR <30 mL/min.",
    situacoesEspeciais:
      "Interações relevantes: inibidores de CYP2C9 (fluoroquinolonas, fluconazol, amiodarona, sulfametoxazol-trimetoprima, valproato) potencializam efeito hipoglicemiante. Para glinidas especificamente, o texto narrativo diz que não são recomendadas no período perioperatório de forma mais ampla, mas a Tabela 2 as agrupa com sulfonilureias sob a mesma recomendação.",
    fonteReferenciaNumero: 3,
    fontePagina: "5-6",
  },
  {
    id: "sglt2_inibidores",
    nomeGenerico: "Inibidores de SGLT2 — canagliflozina, dapagliflozina, empagliflozina",
    nomesComerciais: ["Canagliflozina", "Dapagliflozina", "Empagliflozina"],
    classe: "endocrino",
    subclasse: "Inibidores de SGLT2",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "Risco de cetoacidose diabética euglicêmica (complicação relatada como significativa no perioperatório), além de risco de infecção urogenital, lesão renal aguda, desidratação e hipotensão por efeito glicosúrico. FDA emitiu boletim recomendando suspensão temporária antes de cirurgia programada.",
    situacoesEspeciais:
      "Esta é a classe com o alerta mais crítico de segurança do artigo inteiro: a cetoacidose euglicêmica pode ocorrer com glicemia normal/pouco elevada, dificultando o diagnóstico. Monitorar glicemia cuidadosamente após suspensão.",
    fonteReferenciaNumero: 3,
    fontePagina: "5-6",
  },
  {
    id: "ertugliflozina",
    nomeGenerico: "Ertugliflozina (inibidor de SGLT2)",
    nomesComerciais: ["Ertugliflozina"],
    classe: "endocrino",
    subclasse: "Inibidores de SGLT2",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Mesmo racional dos demais inibidores de SGLT2 (risco de cetoacidose diabética euglicêmica), mas com janela de suspensão mais longa citada especificamente para a ertugliflozina.",
    situacoesEspeciais:
      "Esta é a classe com o alerta mais crítico de segurança do artigo inteiro: a cetoacidose euglicêmica pode ocorrer com glicemia normal/pouco elevada, dificultando o diagnóstico. Monitorar glicemia cuidadosamente após suspensão.",
    fonteReferenciaNumero: 3,
    fontePagina: "5-6",
  },
  {
    id: "tiazolidinedionas",
    nomeGenerico: "Tiazolidinedionas",
    nomesComerciais: ["Pioglitazona"],
    classe: "endocrino",
    subclasse: "Tiazolidinedionas",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Risco de retenção de líquidos; contraindicada em IC congestiva, instabilidade hemodinâmica ou disfunção hepática; falta de evidência de segurança/eficácia perioperatória.",
    situacoesEspeciais: "Nenhuma condicional numérica — recomendação categórica de suspender no dia.",
    fonteReferenciaNumero: 3,
    fontePagina: "5-6",
  },

  // ---------------------------------------------------------------------
  // Hormonais/endócrino não-diabetes (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "hormonio_tireoidiano",
    nomeGenerico: "Reposição de hormônio tireoidiano",
    nomesComerciais: ["Levotiroxina", "Liotironina", "Extrato de tireoide dessecado"],
    classe: "endocrino",
    subclasse: "Reposição de hormônio tireoidiano",
    regra: { tipo: "continuar" },
    racional:
      "Dose de reposição usual administrada por via enteral no dia da cirurgia é suficiente; não há necessidade de conversão parenteral nem suplementação adicional.",
    fonteReferenciaNumero: 3,
    fontePagina: "7-8",
  },
  {
    id: "antitireoidianos",
    nomeGenerico: "Antitireoidianos",
    nomesComerciais: ["Metimazol", "Propiltiouracila"],
    classe: "endocrino",
    subclasse: "Antitireoidianos",
    regra: { tipo: "continuar" },
    racional:
      "Não há estudos sobre segurança/eficácia perioperatória; para evitar risco de tempestade tireoidiana (thyroid storm), essas medicações devem ser continuadas sem interrupção.",
    fonteReferenciaNumero: 3,
    fontePagina: "7-8",
  },
  {
    id: "corticosteroides_sistemicos",
    nomeGenerico: "Corticosteroides sistêmicos",
    nomesComerciais: [
      "Betametasona",
      "Triancinolona",
      "Hidrocortisona",
      "Cortisona",
      "Prednisona",
      "Metilprednisolona",
      "Budesonida",
      "Dexametasona",
      "Fludrocortisona",
    ],
    classe: "endocrino",
    subclasse: "Corticosteroides sistêmicos",
    regra: { tipo: "continuar" },
    racional:
      "Possível supressão do eixo hipotálamo-hipófise-adrenal com uso crônico; risco de hiperglicemia e outros efeitos adversos documentados de forma inconsistente na literatura. Uso crônico de longo prazo e dose mais alta pode requerer avaliação adicional para eventual suplementação perioperatória, mas essa avaliação está fora do escopo desta recomendação.",
    situacoesEspeciais:
      "O artigo afirma explicitamente que o tema 'dose de estresse' é objeto de debate em andamento e está fora do escopo do artigo — não há limiar numérico de dose/duração definido por esta fonte.",
    fonteReferenciaNumero: 3,
    fontePagina: "7-8",
  },
  {
    id: "medicacoes_hipofisarias",
    nomeGenerico: "Medicações hipofisárias (pituitária)",
    nomesComerciais: [
      "Hormônio do crescimento (somatotropina)",
      "Desmopressina",
      "Cabergolina",
      "Bromocriptina",
      "Pegvisomanto",
      "Tesamorelina",
      "Octreotide",
      "Lanreotide",
      "Pasireotide",
      "Mecasermina",
      "Corticotropina de depósito",
    ],
    classe: "endocrino",
    subclasse: "Medicações hipofisárias (pituitária)",
    regra: { tipo: "continuar" },
    racional:
      "Sem estudos específicos, mas razoável manter dado o risco de descompensação da condição de base se interrompido.",
    fonteReferenciaNumero: 3,
    fontePagina: "8-9",
  },
  {
    id: "hormonios_androgenicos",
    nomeGenerico: "Hormônios androgênicos",
    nomesComerciais: ["Testosterona", "Metiltestosterona"],
    classe: "endocrino",
    subclasse: "Hormônios androgênicos",
    regra: { tipo: "continuar" },
    racional:
      "Preocupação teórica com tromboembolismo (TEV), mas dados disponíveis não confirmam associação entre uso perioperatório de andrógenos e eventos tromboembólicos.",
    situacoesEspeciais:
      "Uso inclui hipogonadismo masculino, câncer de mama avançado em mulheres, terapia hormonal para pessoas trans. Considerar potencial de risco de TEV pós-operatório, ainda que a literatura não tenha demonstrado associação clara.",
    fonteReferenciaNumero: 3,
    fontePagina: "9",
  },
  {
    id: "estrogenios",
    nomeGenerico: "Estrogênios (inclui terapia de reposição hormonal e contraceptivos combinados)",
    nomesComerciais: ["Estradiol", "Estrogênios conjugados", "Estropipato", "Etinilestradiol"],
    classe: "endocrino",
    subclasse: "Estrogênios",
    regra: { tipo: "continuar" },
    racional:
      "Risco de TEV aumenta com dose de estrogênio e idade. Bula de fabricante recomenda suspender 4 semanas antes de cirurgia de grande porte, mas essa recomendação é baseada em evidência de risco de TEV na população geral, não em dados perioperatórios robustos. Um estudo em reposição hormonal pós-menopausa (doses mais baixas) não mostrou aumento de risco de TEV após cirurgia ortopédica de grande porte.",
    situacoesEspeciais:
      "Os autores explicitamente não seguem a recomendação clássica de bula de suspender 4 semanas antes — preferem continuar, ponderando risco de TEV contra risco de gravidez indesejada quando usado para contracepção. Divergência relevante de práticas mais antigas/comuns.",
    fonteReferenciaNumero: 3,
    fontePagina: "9-10",
  },
  {
    id: "progestagenos",
    nomeGenerico: "Progestágenos",
    nomesComerciais: [
      "Megestrol",
      "Levonorgestrel",
      "Progesterona",
      "Hidroxiprogesterona",
      "Noretindrona",
      "Medroxiprogesterona",
      "Etonogestrel",
      "Drospirenona",
    ],
    classe: "endocrino",
    subclasse: "Progestágenos",
    regra: { tipo: "continuar" },
    racional:
      "Não há literatura sobre manejo perioperatório específico; evidência de população geral mostra risco mínimo de TEV associado a contraceptivos só-de-progestágeno.",
    fonteReferenciaNumero: 3,
    fontePagina: "9",
  },
  {
    id: "serm_tamoxifeno",
    nomeGenerico: "SERMs — moduladores seletivos do receptor de estrogênio (inclui tamoxifeno)",
    nomesComerciais: ["Toremifeno", "Tamoxifeno", "Raloxifeno", "Ospemifeno"],
    classe: "endocrino",
    subclasse: "SERMs (moduladores seletivos do receptor de estrogênio)",
    indicacoes: [
      {
        id: "serm_cancer_mama",
        descricao: "Prevenção ou tratamento de câncer de mama",
        regra: { tipo: "continuar" },
      },
      {
        id: "serm_outra_indicacao",
        descricao:
          "Outra indicação (ex.: raloxifeno para osteoporose, ospemifeno para atrofia vaginal) — aplicável somente se houver fatores de risco adicionais do paciente/cirurgia para TEV presentes",
        regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
      },
    ],
    racional:
      "Todos os SERMs associados a risco trombótico aumentado, embora um estudo em pacientes de cirurgia de câncer de mama não tenha encontrado associação entre uso de tamoxifeno e TEV. Estudos identificaram risco aumentado de complicação de reconstrução de mama em pacientes usando tamoxifeno. O risco de suspensão de curto prazo da terapia antiestrogênica em pacientes com câncer de mama é desconhecido/incerto.",
    situacoesEspeciais:
      "Esta é a única subclasse do artigo com um número exato de dias de suspensão (7 dias), mas condicional: só se aplica quando NÃO é para prevenção/tratamento de câncer de mama E há fatores de risco adicionais de TEV — o artigo não enumera explicitamente quais são esses fatores.",
    fonteReferenciaNumero: 3,
    fontePagina: "9-10",
  },
  {
    id: "inibidores_aromatase",
    nomeGenerico: "Inibidores de aromatase",
    nomesComerciais: ["Anastrozol", "Exemestano", "Letrozol"],
    classe: "endocrino",
    subclasse: "Inibidores de aromatase",
    regra: { tipo: "continuar" },
    racional:
      "Interferem na produção periférica de estradiol; usados no tratamento de câncer de mama. Um estudo de coorte retrospectivo encontrou associação entre uso perioperatório de inibidor de aromatase e complicação de ferida; risco de recorrência do câncer com suspensão temporária é desconhecido.",
    situacoesEspeciais:
      "Considerar potencial de aumento de complicações de ferida operatória se continuado. Nenhum corte numérico de dias.",
    fonteReferenciaNumero: 3,
    fontePagina: "9-10",
  },
  {
    id: "medicacoes_osso_calcio",
    nomeGenerico: "Medicações de osso/cálcio (PTH análogos, calcimiméticos, calcitonina, denosumabe)",
    nomesComerciais: ["Teriparatida", "Abaloparatida", "Cinacalcete", "Etelcalcetida", "Calcitonina", "Denosumabe"],
    classe: "endocrino",
    subclasse: "Medicações de osso/cálcio",
    regra: { tipo: "continuar" },
    racional:
      "Sem racional de suspensão para PTH análogos, calcimiméticos, calcitonina e denosumabe; continuar antes e no dia da cirurgia.",
    fonteReferenciaNumero: 3,
    fontePagina: "9-11",
  },
  {
    id: "bifosfonados",
    nomeGenerico: "Bifosfonados",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Medicações de osso/cálcio",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Risco de esofagite ao deitar logo após ingestão, somado à possível redução da pressão do esfíncter esofágico inferior por anestésicos.",
    situacoesEspeciais: "Continuar antes da cirurgia; não tomar apenas na manhã da cirurgia.",
    fonteReferenciaNumero: 3,
    fontePagina: "9-11",
  },

  // ---------------------------------------------------------------------
  // Medicações urológicas (Tabela 4)
  // ---------------------------------------------------------------------
  {
    id: "alfa1_bloqueadores",
    nomeGenerico: "Alfa-1 bloqueadores adrenérgicos (uso urológico — HPB)",
    nomesComerciais: ["Alfuzosina", "Doxazosina", "Prazosina", "Silodosina", "Tansulosina", "Terazosina"],
    classe: "endocrino",
    subclasse: "Alfa-1 bloqueadores adrenérgicos (uso urológico)",
    regra: { tipo: "continuar" },
    racional:
      "Tratamento de hiperplasia prostática benigna (HPB); há literatura mostrando possível redução da incidência de retenção urinária pós-operatória quando continuados.",
    situacoesEspeciais:
      "Síndrome da íris flácida intraoperatória (floppy iris syndrome) em cirurgia de catarata — risco maior com tansulosina; notificar o oftalmologista antes da cirurgia de catarata, pois suspender a medicação antes da cirurgia não elimina necessariamente o risco.",
    fonteReferenciaNumero: 3,
    fontePagina: "11-12",
  },
  {
    id: "inibidores_5_alfa_redutase",
    nomeGenerico: "Inibidores da 5-alfa redutase",
    nomesComerciais: ["Dutasterida", "Finasterida"],
    classe: "endocrino",
    subclasse: "Inibidores da 5-alfa redutase",
    regra: { tipo: "continuar" },
    racional:
      "Sem interação relatada com anestesia; alguns estudos mostram redução de perda sanguínea estimada em RTU de próstata (TURP) com uso de finasterida.",
    fonteReferenciaNumero: 3,
    fontePagina: "12",
  },
  {
    id: "anticolinergicos_bexiga",
    nomeGenerico: "Anticolinérgicos para disfunção vesical (bexiga hiperativa)",
    nomesComerciais: ["Darifenacina", "Fesoterodina", "Flavoxato", "Oxibutinina", "Solifenacina", "Tolterodina", "Trospio"],
    classe: "endocrino",
    subclasse: "Anticolinérgicos para disfunção vesical",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Podem reduzir desconforto vesical relacionado a cateter, mas têm efeitos adversos anticolinérgicos significativos e podem contribuir para delirium — considerados de uso cauteloso em idosos.",
    situacoesEspeciais: "Cautela especial em pacientes idosos.",
    fonteReferenciaNumero: 3,
    fontePagina: "11-12",
  },
  {
    id: "antineoplasicos_urologicos",
    nomeGenerico: "Medicações antineoplásicas urológicas",
    nomesComerciais: [
      "Acetato de abiraterona",
      "Apalutamida",
      "Bicalutamida",
      "Degarelix",
      "Enzalutamida",
      "Acetato de goserrelina",
      "Acetato de leuprolida",
      "Nilutamida",
    ],
    classe: "endocrino",
    subclasse: "Medicações antineoplásicas urológicas",
    regra: { tipo: "continuar" },
    racional:
      "Usadas no tratamento de câncer de próstata (e outras indicações: câncer de mama/uterino, hiperplasia, SOP, alopecia, terapia de afirmação de gênero). Efeitos adversos conhecidos (risco cardiovascular, anemia, disfunção hepática, prolongamento de QT, doença pulmonar intersticial, redução de densidade óssea) são crônicos e não mitigados por interrupção perioperatória de curto prazo.",
    situacoesEspeciais: "Nenhuma condicional perioperatória específica — sem estudos perioperatórios disponíveis para esta classe.",
    fonteReferenciaNumero: 3,
    fontePagina: "12-13",
  },
  {
    id: "pde5_inibidores",
    nomeGenerico: "Inibidores da PDE-5",
    nomesComerciais: ["Sildenafila", "Tadalafila", "Avanafila", "Vardenafila"],
    classe: "endocrino",
    subclasse: "Inibidores da PDE-5",
    indicacoes: [
      {
        id: "pde5_hipertensao_pulmonar",
        descricao: "Hipertensão pulmonar",
        regra: { tipo: "continuar" },
      },
      {
        id: "pde5_disfuncao_eretil_hpb",
        descricao: "Disfunção erétil / hiperplasia prostática benigna (HPB)",
        regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
      },
    ],
    racional:
      "Risco de hipotensão intraoperatória; nenhum estudo determinou o momento seguro de anestesia após uso, e os estudos de segurança existentes só se aplicam a pacientes com hipertensão pulmonar (população diferente da indicação urológica).",
    situacoesEspeciais:
      "A decisão depende inteiramente da indicação de uso. Quando usado para hipertensão pulmonar, o manejo é coberto por outra declaração de consenso da SPAQI sobre medicações pulmonares — a regra aqui é 'continuar', coerente com aquele artigo, mesmo este relatório sendo focado na indicação urológica.",
    fonteReferenciaNumero: 3,
    fontePagina: "12-13",
  },
  {
    id: "outras_medicacoes_urologicas",
    nomeGenerico: "Outras medicações urológicas",
    nomesComerciais: ["Cloreto de betanecol (Bethanechol chloride)", "Mirabegrom"],
    classe: "endocrino",
    subclasse: "Outras medicações urológicas",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Betanecol estimula liberação de acetilcolina (receptor muscarínico) — tem benefício modesto documentado na prevenção de retenção urinária pós-operatória, mas potencial de interação com agentes anestésicos. Mirabegrom (agonista beta-3 adrenérgico) pode causar hipertensão; não há dados perioperatórios específicos identificados.",
    situacoesEspeciais: "Nenhuma condicional numérica.",
    fonteReferenciaNumero: 3,
    fontePagina: "13",
  },
];
