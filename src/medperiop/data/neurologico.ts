import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Oprea AD, Keshock MC, Cummings KC III, et al.
 * Preoperative Management of Medications for Neurologic Diseases: SPAQI
 * Consensus Statement. Mayo Clin Proc. 2022;97(2):375-396.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/neurologico.md
 *
 * Nota geral do artigo (metodologia Delphi modificada, sem sistema formal de
 * grau de evidência): a esmagadora maioria das medicações neurológicas deve
 * ser CONTINUADA no perioperatório, incluindo a tomada na manhã do dia da
 * cirurgia (DOS) — risco de crise/recidiva/piora da doença de base supera o
 * risco de continuar. Nenhuma classe deste artigo tem uma recomendação
 * numérica padrão de "suspender N dias antes"; quando há incerteza, o
 * próprio artigo é explícito em dizer que a decisão é individualizada
 * (agonistas dopaminérgicos, timing de anticorpos monoclonais, MAO-B
 * inibidores) — isso é proposital, não uma lacuna da extração.
 *
 * Atenção (não confundir): os inibidores da MAO-B usados na Doença de
 * Parkinson (selegilina, rasagilina, safinamida) são farmacologicamente
 * distintos dos IMAOs clássicos usados em psiquiatria (mais seletivos para
 * MAO-B) e têm recomendação de manejo perioperatório diferente (continuar,
 * sem washout) — ver arquivo psiquiatrico.ts para os IMAOs psiquiátricos.
 */
export const FARMACOS_NEUROLOGICO: Farmaco[] = [
  // ---------------------------------------------------------------------
  // Esclerose Múltipla (EM) / Miastenia Gravis (MG) — Tabela 1
  // ---------------------------------------------------------------------

  // -- Corticosteroides (EM/MG) --
  {
    id: "prednisona",
    nomeGenerico: "Prednisona",
    nomesComerciais: [],
    classe: "neurologico",
    subclasse: "Corticosteroides (EM/MG)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem a ativação de células T e reduzem citocinas inflamatórias; em miastenia gravis (MG) reduzem os anticorpos anti-receptor de acetilcolina.",
    situacoesEspeciais:
      "Bloqueadores neuromusculares não despolarizantes — resistência e duração reduzida do bloqueio. Considerar dose de estresse intraoperatória se dose >7,5 mg/dia de prednisona (ou equivalente) por mais de 4 semanas (supressão do eixo HPA, risco de hipotensão refratária). Risco de má cicatrização, mascaramento de sinais de infecção, trauma de partes moles no posicionamento.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 379-380",
  },
  {
    id: "prednisolona",
    nomeGenerico: "Prednisolona",
    nomesComerciais: [],
    classe: "neurologico",
    subclasse: "Corticosteroides (EM/MG)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem a ativação de células T e reduzem citocinas inflamatórias; em miastenia gravis (MG) reduzem os anticorpos anti-receptor de acetilcolina.",
    situacoesEspeciais:
      "Bloqueadores neuromusculares não despolarizantes — resistência e duração reduzida do bloqueio. Considerar dose de estresse intraoperatória se dose >7,5 mg/dia de prednisona (ou equivalente) por mais de 4 semanas (supressão do eixo HPA, risco de hipotensão refratária). Risco de má cicatrização, mascaramento de sinais de infecção, trauma de partes moles no posicionamento.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 379-380",
  },
  {
    id: "metilprednisolona",
    nomeGenerico: "Metilprednisolona",
    nomesComerciais: [],
    classe: "neurologico",
    subclasse: "Corticosteroides (EM/MG)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem a ativação de células T e reduzem citocinas inflamatórias; em miastenia gravis (MG) reduzem os anticorpos anti-receptor de acetilcolina.",
    situacoesEspeciais:
      "Bloqueadores neuromusculares não despolarizantes — resistência e duração reduzida do bloqueio. Considerar dose de estresse intraoperatória se dose >7,5 mg/dia de prednisona (ou equivalente) por mais de 4 semanas (supressão do eixo HPA, risco de hipotensão refratária). Risco de má cicatrização, mascaramento de sinais de infecção, trauma de partes moles no posicionamento.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 379-380",
  },

  // -- Interferons (EM) --
  {
    id: "interferon_beta_1a",
    nomeGenerico: "Interferon beta-1a",
    nomesComerciais: ["Avonex", "Rebif"],
    classe: "neurologico",
    subclasse: "Interferons (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem citocinas pró-inflamatórias e a proliferação de células T; sem interação anestésica conhecida.",
    situacoesEspeciais:
      "Estudo com 43 pacientes mostrou que 20% pioraram/tiveram novo déficit neurológico por ≥48h nos primeiros 30 dias após a descontinuação do interferon — reforça a recomendação de continuar.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380",
  },
  {
    id: "peginterferon_beta_1a",
    nomeGenerico: "Peginterferon beta-1a",
    nomesComerciais: ["Plegridy"],
    classe: "neurologico",
    subclasse: "Interferons (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem citocinas pró-inflamatórias e a proliferação de células T; sem interação anestésica conhecida.",
    situacoesEspeciais:
      "Estudo com 43 pacientes mostrou que 20% pioraram/tiveram novo déficit neurológico por ≥48h nos primeiros 30 dias após a descontinuação do interferon — reforça a recomendação de continuar.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380",
  },
  {
    id: "interferon_beta_1b",
    nomeGenerico: "Interferon beta-1b",
    nomesComerciais: ["Betaseron", "Extavia"],
    classe: "neurologico",
    subclasse: "Interferons (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Inibem citocinas pró-inflamatórias e a proliferação de células T; sem interação anestésica conhecida.",
    situacoesEspeciais:
      "Estudo com 43 pacientes mostrou que 20% pioraram/tiveram novo déficit neurológico por ≥48h nos primeiros 30 dias após a descontinuação do interferon — reforça a recomendação de continuar.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380",
  },

  // -- Glatirâmer acetato (EM) --
  {
    id: "glatiramer_acetato",
    nomeGenerico: "Glatirâmer acetato",
    nomesComerciais: ["Copaxone", "Glatopa"],
    classe: "neurologico",
    subclasse: "Glatirâmer acetato (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Age como 'isca' de proteína básica de mielina; sem dado específico de manejo perioperatório, mas o perfil de segurança favorável sustenta a continuação.",
    situacoesEspeciais:
      "Sem interações anestésicas conhecidas, sem aumento de risco de infecção.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376; texto p. 380",
  },

  // -- Anticorpos monoclonais (EM/MG) --
  {
    id: "natalizumabe",
    nomeGenerico: "Natalizumabe",
    nomesComerciais: ["Tysabri"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. Alguns especialistas em EM sugerem agendar a cirurgia entre 7 dias após uma infusão e 7 dias antes da próxima (sugestão citada pelo artigo especificamente para natalizumabe, não uma regra SPAQI formal para toda a classe). A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos (infusões a cada 4 semanas a 6 meses, conforme o agente); risco de reativação/recidiva de doença se o ciclo for interrompido. Risco de recidiva de EM em até 6 meses após descontinuação (um estudo) e probabilidade de atividade rebote de 39% entre 3-9 meses após parar (outro estudo).",
    situacoesEspeciais:
      "Risco de infecção, incluindo leucoencefalopatia multifocal progressiva (LEMP) em pacientes JC vírus-positivo.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },
  {
    id: "alentuzumabe",
    nomeGenerico: "Alentuzumabe",
    nomesComerciais: ["Lemtrada"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos; risco de reativação/recidiva de doença se o ciclo for interrompido.",
    situacoesEspeciais:
      "Risco de reação autoimune secundária — checar hemograma, creatinina, função tireoidiana, enzimas hepáticas e EQU se o paciente recebeu a droga nos últimos 48 meses.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },
  {
    id: "ocrelizumabe",
    nomeGenerico: "Ocrelizumabe",
    nomesComerciais: ["Ocrevus"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos; risco de reativação/recidiva de doença se o ciclo for interrompido.",
    situacoesEspeciais:
      "Risco de infecção associado a terapias depletoras de células B.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },
  {
    id: "rituximabe",
    nomeGenerico: "Rituximabe",
    nomesComerciais: ["Rituxan"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos; risco de reativação/recidiva de doença se o ciclo for interrompido. Também usado off-label em miastenia gravis.",
    situacoesEspeciais:
      "Risco de infecção associado a terapias depletoras de células B.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },
  {
    id: "ofatumumabe",
    nomeGenerico: "Ofatumumabe",
    nomesComerciais: ["Kesimpta"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos; risco de reativação/recidiva de doença se o ciclo for interrompido.",
    situacoesEspeciais:
      "Risco de infecção associado a terapias depletoras de células B.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },
  {
    id: "eculizumabe",
    nomeGenerico: "Eculizumabe",
    nomesComerciais: ["Soliris"],
    classe: "neurologico",
    subclasse: "Anticorpos monoclonais (EM/MG)",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Timing da cirurgia eletiva dentro do ciclo de infusão não é padronizado; decisão deve envolver o neurologista prescritor. A recomendação de base é NÃO interromper o esquema de doses — não atrasar/pular o ciclo, e sim ajustar o timing da cirurgia dentro dele.",
    },
    racional:
      "Imunossupressor administrado em ciclos; único agente desta lista aprovado especificamente para miastenia gravis generalizada anti-AChR positiva; risco de reativação/recidiva de doença se o ciclo for interrompido.",
    situacoesEspeciais:
      "Risco de infecção, particularmente por Neisseria meningitidis, associado ao bloqueio do complemento.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 376-377; texto p. 380-381",
  },

  // -- Fumaratos (EM) --
  {
    id: "dimetilfumarato",
    nomeGenerico: "Dimetilfumarato",
    nomesComerciais: ["Tecfidera"],
    classe: "neurologico",
    subclasse: "Fumaratos (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Ativam a via Nrf2, com proteção neuronal/mielina; sem interação anestésica relatada.",
    situacoesEspeciais: "Monitorar lesão hepática rara e linfopenia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },
  {
    id: "monometilfumarato",
    nomeGenerico: "Monometilfumarato",
    nomesComerciais: ["Bafiertam"],
    classe: "neurologico",
    subclasse: "Fumaratos (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Ativam a via Nrf2, com proteção neuronal/mielina; sem interação anestésica relatada.",
    situacoesEspeciais: "Monitorar lesão hepática rara e linfopenia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },
  {
    id: "diroximelfumarato",
    nomeGenerico: "Diroximelfumarato",
    nomesComerciais: ["Vumerity"],
    classe: "neurologico",
    subclasse: "Fumaratos (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Ativam a via Nrf2, com proteção neuronal/mielina; sem interação anestésica relatada.",
    situacoesEspeciais: "Monitorar lesão hepática rara e linfopenia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },

  // -- Dalfampridina (EM) --
  {
    id: "dalfampridina",
    nomeGenerico: "Dalfampridina",
    nomesComerciais: ["Ampyra"],
    classe: "neurologico",
    subclasse: "Dalfampridina (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueia canais de potássio voltagem-dependentes, prolongando o potencial de ação.",
    situacoesEspeciais:
      "Ajuste de dose se ClCr ≤50 mL/min; risco aumentado de convulsão nesses pacientes.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },

  // -- Teriflunomida (EM) --
  {
    id: "teriflunomida",
    nomeGenerico: "Teriflunomida",
    nomesComerciais: ["Aubagio"],
    classe: "neurologico",
    subclasse: "Teriflunomida (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Inibe a biossíntese de pirimidina; a interrupção pode causar rebote de doença em EM recidivante-remitente, mas o washout é longo (até 2 anos), então poucas doses perdidas não afetam a atividade da doença.",
    situacoesEspeciais: "Nenhuma interação anestésica relatada.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },

  // -- Moduladores do receptor S1P (EM) --
  {
    id: "fingolimode",
    nomeGenerico: "Fingolimode",
    nomesComerciais: ["Gilenya"],
    classe: "neurologico",
    subclasse: "Moduladores do receptor S1P (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a migração de linfócitos para o sistema nervoso central; mecanismo exato incerto.",
    situacoesEspeciais:
      "Efeitos cardíacos relevantes — bradicardia, bloqueio AV, prolongamento de QT; usar beta-bloqueadores e bloqueadores de canal de cálcio com cautela; evitar/ter cautela com fármacos que prolongam QT (anestésicos halogenados, metadona, ondansetron). Há evidência de risco aumentado de recidiva de EM ao descontinuar a droga. Avaliação de infecção e testes pré-operatórios direcionados são razoáveis dado o perfil de efeitos colaterais. Se o tratamento for interrompido, o reinício requer titulação cuidadosa — envolver especialista em EM.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },
  {
    id: "siponimode",
    nomeGenerico: "Siponimode",
    nomesComerciais: ["Mayzent"],
    classe: "neurologico",
    subclasse: "Moduladores do receptor S1P (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a migração de linfócitos para o sistema nervoso central; mecanismo exato incerto.",
    situacoesEspeciais:
      "Efeitos cardíacos relevantes — bradicardia, bloqueio AV, prolongamento de QT; usar beta-bloqueadores e bloqueadores de canal de cálcio com cautela; evitar/ter cautela com fármacos que prolongam QT (anestésicos halogenados, metadona, ondansetron). Avaliação de infecção e testes pré-operatórios direcionados são razoáveis dado o perfil de efeitos colaterais. Se o tratamento for interrompido, o reinício requer titulação cuidadosa — envolver especialista em EM.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },
  {
    id: "ozanimode",
    nomeGenerico: "Ozanimode",
    nomesComerciais: ["Zeposia"],
    classe: "neurologico",
    subclasse: "Moduladores do receptor S1P (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a migração de linfócitos para o sistema nervoso central; mecanismo exato incerto.",
    situacoesEspeciais:
      "Efeitos cardíacos relevantes — bradicardia, bloqueio AV, prolongamento de QT; usar beta-bloqueadores e bloqueadores de canal de cálcio com cautela; evitar/ter cautela com fármacos que prolongam QT (anestésicos halogenados, metadona, ondansetron). Avaliação de infecção e testes pré-operatórios direcionados são razoáveis dado o perfil de efeitos colaterais. Se o tratamento for interrompido, o reinício requer titulação cuidadosa — envolver especialista em EM.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },
  {
    id: "ponesimode",
    nomeGenerico: "Ponesimode",
    nomesComerciais: ["Ponvory"],
    classe: "neurologico",
    subclasse: "Moduladores do receptor S1P (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a migração de linfócitos para o sistema nervoso central; mecanismo exato incerto.",
    situacoesEspeciais:
      "Efeitos cardíacos relevantes — bradicardia, bloqueio AV, prolongamento de QT; usar beta-bloqueadores e bloqueadores de canal de cálcio com cautela; evitar/ter cautela com fármacos que prolongam QT (anestésicos halogenados, metadona, ondansetron). Avaliação de infecção e testes pré-operatórios direcionados são razoáveis dado o perfil de efeitos colaterais. Se o tratamento for interrompido, o reinício requer titulação cuidadosa — envolver especialista em EM.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381",
  },

  // -- Cladribina (EM) --
  {
    id: "cladribina",
    nomeGenerico: "Cladribina",
    nomesComerciais: ["Mavenclad"],
    classe: "neurologico",
    subclasse: "Cladribina (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Antimetabólito purínico, com depleção linfocitária; dosing oral em intervalos longos (o objetivo é prevenir recidiva de EM ao longo do ano, não uma dose diária).",
    situacoesEspeciais:
      "Risco de sangramento aumentado com uso concomitante de cetorolaco e celecoxibe; risco de linfopenia, infecções oportunistas, elevação de enzimas hepáticas, doença enxerto-versus-hospedeiro após transfusão sanguínea.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 381-382",
  },

  // -- Mitoxantrona (EM) --
  {
    id: "mitoxantrona",
    nomeGenerico: "Mitoxantrona",
    nomesComerciais: ["Novantrone", "OTN Mitoxantrone"],
    classe: "neurologico",
    subclasse: "Mitoxantrona (EM)",
    regra: { tipo: "continuar" },
    racional:
      "Intercala DNA e inibe topoisomerase II; administrada por via IV a cada 3 meses até dose cumulativa máxima.",
    situacoesEspeciais:
      "Toxicidade cardíaca cumulativa (insuficiência cardíaca congestiva) — pacientes em uso ou que usaram nos últimos 3-6 meses devem ter avaliação recente de função ventricular esquerda (ecocardiograma, perfusão miocárdica ou cateterismo) e exames laboratoriais. Sem interação anestésica conhecida.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 377; texto p. 382",
  },

  // -- Inibidores da acetilcolinesterase (MG) --
  {
    id: "piridostigmina",
    nomeGenerico: "Piridostigmina",
    nomesComerciais: ["Mestinon"],
    classe: "neurologico",
    subclasse: "Inibidores da acetilcolinesterase (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam acetilcolina na junção neuromuscular, controlando a fraqueza muscular da miastenia gravis; suspender pode piorar a fraqueza muscular respiratória pós-operatória (crise miastênica).",
    situacoesEspeciais:
      "Interação com succinilcolina — inibem a pseudocolinesterase que degrada a succinilcolina, prolongando seu efeito (risco de bloqueio prolongado/atraso na extubação); a reversão de bloqueadores não despolarizantes pode ser inadequada/imprevisível pela inibição colinesterásica basal já maximizada. Beta-bloqueadores podem potencializar bradicardia. Efeitos muscarínicos (secreções brônquicas aumentadas podem piorar broncoespasmo).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378; texto p. 382-383",
  },
  {
    id: "neostigmina",
    nomeGenerico: "Neostigmina",
    nomesComerciais: ["Prostigmin Bromide"],
    classe: "neurologico",
    subclasse: "Inibidores da acetilcolinesterase (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam acetilcolina na junção neuromuscular, controlando a fraqueza muscular da miastenia gravis; suspender pode piorar a fraqueza muscular respiratória pós-operatória (crise miastênica).",
    situacoesEspeciais:
      "Interação com succinilcolina — inibem a pseudocolinesterase que degrada a succinilcolina, prolongando seu efeito (risco de bloqueio prolongado/atraso na extubação); a reversão de bloqueadores não despolarizantes pode ser inadequada/imprevisível pela inibição colinesterásica basal já maximizada. Beta-bloqueadores podem potencializar bradicardia. Efeitos muscarínicos (secreções brônquicas aumentadas podem piorar broncoespasmo).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378; texto p. 382-383",
  },

  // -- Azatioprina (MG) --
  {
    id: "azatioprina",
    nomeGenerico: "Azatioprina",
    nomesComerciais: ["Imuran", "Azasan"],
    classe: "neurologico",
    subclasse: "Azatioprina (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Imunossupressor de início de efeito muito lento (6-12 meses); a descontinuação pode reativar doença clínica e fatores autoimunes (relatado em estudo pequeno).",
    situacoesEspeciais:
      "Sem interação anestésica específica; risco de citopenias, elevação de enzimas hepáticas.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378; texto p. 383",
  },

  // -- Micofenolato de mofetila (MG) --
  {
    id: "micofenolato_mofetila",
    nomeGenerico: "Micofenolato de mofetila",
    nomesComerciais: ["Cellcept"],
    classe: "neurologico",
    subclasse: "Micofenolato de mofetila (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Inibe a síntese de purina em linfócitos; a interrupção pode causar exacerbação de MG mesmo em pacientes em remissão (estudo observacional).",
    situacoesEspeciais:
      "Sem interação anestésica específica; risco de discrasias sanguíneas/infecção.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378; texto p. 383",
  },

  // -- Ciclosporina (MG) --
  {
    id: "ciclosporina",
    nomeGenerico: "Ciclosporina",
    nomesComerciais: ["Sandimmune", "Neoral", "Gengraf"],
    classe: "neurologico",
    subclasse: "Ciclosporina (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Inibe linfócitos T e IL-2; embora não haja dado que sustente diretamente o manejo perioperatório, é geralmente aceito continuar.",
    situacoesEspeciais:
      "Muitas interações medicamentosas (~300 relatadas): inibidor de CYP3A4 — prolonga o bloqueio neuromuscular não despolarizante; aumenta a toxicidade de lidocaína sistêmica e de opioides (fentanil, oxicodona, hidrocodona, morfina, buprenorfina, tramadol, metadona, meperidina — risco de depressão respiratória); potencializa a sedação de benzodiazepínicos; AINEs aumentam o risco de nefrotoxicidade.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378; texto p. 383-384",
  },

  // -- Tacrolimo (MG) --
  {
    id: "tacrolimo",
    nomeGenerico: "Tacrolimo",
    nomesComerciais: ["Astagraf XL", "Hecoria", "Prograf", "Envarsus XR"],
    classe: "neurologico",
    subclasse: "Tacrolimo (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Usado off-label em MG refratária após piridostigmina em dose máxima; sem dado direto de manejo perioperatório, mas o perfil de segurança em pacientes transplantados sustenta a continuação.",
    situacoesEspeciais:
      "Janela terapêutica muito estreita — nefrotoxicidade, hepatotoxicidade, hipomagnesemia, hipercalemia, prolongamento de QT, insuficiência cardíaca congestiva, hipertensão em níveis altos. Interações com drogas que prolongam QT (ondansetron, sevoflurano) aumentam o risco de arritmia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 378-379; texto p. 384",
  },

  // -- Metotrexato (MG) --
  {
    id: "metotrexato",
    nomeGenerico: "Metotrexato",
    nomesComerciais: ["Otrexup", "Xatmep", "Trexall", "Rasuvo", "RediTrex"],
    classe: "neurologico",
    subclasse: "Metotrexato (MG)",
    regra: { tipo: "continuar" },
    racional:
      "Usado off-label como poupador de esteroide em MG; sem dado direto em MG, mas estudos em artrite reumatoide sustentam continuação sem aumento de risco infeccioso ou prejuízo de cicatrização.",
    situacoesEspeciais:
      "Risco de toxicidade por metotrexato com comprometimento da função renal; AINEs, alguns antibióticos e omeprazol aumentam esse risco.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 1, p. 379; texto p. 384",
  },

  // ---------------------------------------------------------------------
  // Anticonvulsivantes — Tabela 2
  //
  // Todos os ~29 fármacos abaixo têm a MESMA recomendação categórica no
  // artigo (continuar, incluindo DOS), o mesmo racional e a mesma nota de
  // exceção (cirurgia de epilepsia com mapeamento eletroencefalográfico
  // intraoperatório). Não é erro de extração — o artigo trata a classe
  // inteira como um bloco único na Tabela 2.
  // ---------------------------------------------------------------------
  {
    id: "perampanel",
    nomeGenerico: "Perampanel",
    nomesComerciais: ["Fycompa"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos (bloqueio de canais de Na+/Ca2+, redução da neurotransmissão excitatória glutamato/aspartato, aumento da atividade GABAérgica). Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período — as concentrações terapêuticas dependem de dosagem programada regular. Alguns agentes desta classe (benzodiazepínicos, fenobarbital) têm risco de síndrome de abstinência com risco de vida se descontinuados abruptamente.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado (nota de rodapé da Tabela 2, aplicada de forma ampla à classe). Se o paciente for incapaz de tomar por via oral, pode ser necessária forma IV caso mais de uma dose seja perdida. Necessidade de bloqueador neuromuscular pode estar aumentada com carboxamidas, levetiracetam, perampanel e fenitoína. Anestésicos podem ser pró-convulsivantes (reduzem o limiar de crise), embora o risco absoluto de crise por anestesia seja considerado baixo.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "levetiracetam",
    nomeGenerico: "Levetiracetam",
    nomesComerciais: ["Keppra", "Elpsia"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos (bloqueio de canais de Na+/Ca2+, redução da neurotransmissão excitatória glutamato/aspartato, aumento da atividade GABAérgica). Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período — as concentrações terapêuticas dependem de dosagem programada regular.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Se o paciente for incapaz de tomar por via oral, pode ser necessária forma IV caso mais de uma dose seja perdida. Necessidade de bloqueador neuromuscular pode estar aumentada com levetiracetam.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "acetazolamida",
    nomeGenerico: "Acetazolamida",
    nomesComerciais: ["Diamox"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Inibidor de anidrase carbônica — risco de acidose metabólica hiperclorêmica sem ânion gap.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "carbamazepina",
    nomeGenerico: "Carbamazepina",
    nomesComerciais: ["Tegretol", "Carbatrol", "Epitol", "Equetro", "Carnexiv"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Potente indutor enzimático hepático — altera o metabolismo de outros fármacos (ex.: reduz eficácia de dabigatrana/apixabana/varfarina; interage com corticosteroides e midazolam). Risco de SIADH e hiponatremia. Necessidade de bloqueador neuromuscular pode estar aumentada (carboxamida).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "eslicarbazepina",
    nomeGenerico: "Eslicarbazepina",
    nomesComerciais: ["Aptiom"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Necessidade de bloqueador neuromuscular pode estar aumentada (carboxamida).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "oxcarbazepina",
    nomeGenerico: "Oxcarbazepina",
    nomesComerciais: ["Trileptal"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Risco de SIADH e hiponatremia. Necessidade de bloqueador neuromuscular pode estar aumentada (carboxamida).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "rufinamida",
    nomeGenerico: "Rufinamida",
    nomesComerciais: ["Banzel"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "gabapentina",
    nomeGenerico: "Gabapentina",
    nomesComerciais: ["Neurontin", "Gabarone", "Gralise", "FusePaq Fanatrex"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "pregabalina",
    nomeGenerico: "Pregabalina",
    nomesComerciais: ["Lyrica"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "vigabatrina",
    nomeGenerico: "Vigabatrina",
    nomesComerciais: ["Sabril", "Vigadrone"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "tiagabina",
    nomeGenerico: "Tiagabina",
    nomesComerciais: ["Gabitril"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "felbamato",
    nomeGenerico: "Felbamato",
    nomesComerciais: ["Felbatol"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "topiramato",
    nomeGenerico: "Topiramato",
    nomesComerciais: ["Topamax", "Topiragen", "Trokendi XR", "Qudexy XR"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Inibidor de anidrase carbônica — risco de acidose metabólica hiperclorêmica sem ânion gap.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "lacosamida",
    nomeGenerico: "Lacosamida",
    nomesComerciais: ["Vimpat"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "lamotrigina",
    nomeGenerico: "Lamotrigina",
    nomesComerciais: ["Lamictal"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "fenitoina",
    nomeGenerico: "Fenitoína",
    nomesComerciais: ["Dilantin"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Potente indutor enzimático hepático — altera o metabolismo de outros fármacos (ex.: reduz eficácia de dabigatrana/apixabana/varfarina; interage com corticosteroides e midazolam). Necessidade de bloqueador neuromuscular pode estar aumentada. Conversão IV específica descrita (dose equivalente de fenitoína sódica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "fosfenitoina",
    nomeGenerico: "Fosfenitoína",
    nomesComerciais: ["Cerebyx", "Sesquient"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Conversão IV específica descrita no artigo.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "etossuximida",
    nomeGenerico: "Etossuximida",
    nomesComerciais: ["Zarontin"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "metsuximida",
    nomeGenerico: "Metsuximida",
    nomesComerciais: ["Celontin"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "zonisamida",
    nomeGenerico: "Zonisamida",
    nomesComerciais: ["Zonegran"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "divalproato_sodio",
    nomeGenerico: "Divalproato de sódio",
    nomesComerciais: ["Depakote"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Conversão IV específica descrita (dose diária total dividida em infusões a cada 6h).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "acido_valproico",
    nomeGenerico: "Ácido valproico",
    nomesComerciais: ["Depakene", "Stavzor"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Conversão IV específica descrita (dose diária total dividida em infusões a cada 6h).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "valproato_sodio",
    nomeGenerico: "Valproato de sódio",
    nomesComerciais: ["Depacon"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Conversão IV específica descrita (dose diária total dividida em infusões a cada 6h).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "primidona",
    nomeGenerico: "Primidona",
    nomesComerciais: ["Mysoline"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado. Potente indutor enzimático hepático — altera o metabolismo de outros fármacos (ex.: reduz eficácia de dabigatrana/apixabana/varfarina; interage com corticosteroides e midazolam).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "clonazepam",
    nomeGenerico: "Clonazepam",
    nomesComerciais: ["Klonopin"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos, aumentando a atividade GABAérgica. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período; benzodiazepínico — risco de síndrome de abstinência com risco de vida se descontinuado abruptamente.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "lorazepam",
    nomeGenerico: "Lorazepam",
    nomesComerciais: ["Ativan"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos, aumentando a atividade GABAérgica. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período; benzodiazepínico — risco de síndrome de abstinência com risco de vida se descontinuado abruptamente.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "clobazam",
    nomeGenerico: "Clobazam",
    nomesComerciais: ["Onfi", "Sympazan"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos, aumentando a atividade GABAérgica. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período; benzodiazepínico — risco de síndrome de abstinência com risco de vida se descontinuado abruptamente.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "diazepam",
    nomeGenerico: "Diazepam",
    nomesComerciais: ["Valium", "Diastat", "Valtoco"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos, aumentando a atividade GABAérgica. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período; benzodiazepínico — risco de síndrome de abstinência com risco de vida se descontinuado abruptamente.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },
  {
    id: "estiripentol",
    nomeGenerico: "Estiripentol",
    nomesComerciais: ["Diacomit"],
    classe: "neurologico",
    subclasse: "Anticonvulsivantes",
    regra: { tipo: "continuar" },
    racional:
      "Reduzem a excitabilidade elétrica excessiva do sistema nervoso central por múltiplos mecanismos. Risco de crise convulsiva de rebote/breakthrough se suspensos, mesmo por curto período.",
    situacoesEspeciais:
      "Exceção da regra geral: considerar suspender no dia da cirurgia (DOS) se houver cirurgia de epilepsia com mapeamento eletroencefalográfico intraoperatório planejado.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 2, p. 384-387; texto p. 383-384 e 388",
  },

  // ---------------------------------------------------------------------
  // Doença de Parkinson (DP) — Tabela 3
  //
  // Nota válida para TODAS as medicações de DP abaixo (levodopa/carbidopa,
  // agonistas dopaminérgicos, MAO-B, COMT, anticolinérgicos, amantadina):
  // podem precisar ser seguradas no dia da cirurgia (DOS) em pacientes
  // submetidos a implante de eletrodo de estimulação cerebral profunda
  // (DBS) sob anestesia monitorada (técnica "acordada") — confirmar com a
  // equipe cirúrgica.
  // ---------------------------------------------------------------------
  {
    id: "levodopa_carbidopa",
    nomeGenerico: "Levodopa/Carbidopa",
    nomesComerciais: ["Sinemet", "Parcopa", "Rytary", "Duopa"],
    classe: "neurologico",
    subclasse: "Levodopa/Carbidopa (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Doses perdidas ou descontinuação abrupta devem ser evitadas para prevenir a Síndrome de Hiperpirexia Parkinsoniana (PHS) — condição grave, semelhante à síndrome neuroléptica maligna, com mortalidade de 4% se tratada e 20% se não tratada. Doses mais altas podem causar alucinações. Continuar no pré-operatório, incluindo a dose na manhã da cirurgia (antes do início da cirurgia), e retomar assim que possível no pós-operatório.",
    situacoesEspeciais:
      "Se NPO prolongado ou cirurgia longa, neurologistas podem considerar reduzir gradualmente (weaning) as doses ANTES da cirurgia para minimizar o risco de PHS — isso é individualizado, não um protocolo fixo numérico. Apenas via enteral disponível oficialmente, mas há alternativas para não interromper a dosagem: forma de desintegração oral (tomada sem água), forma de liberação imediata mastigável, forma triturável/dissolvível para sonda nasogástrica, suspensão enteral. A formulação de liberação controlada tem aumento de 30% na biodisponibilidade quando triturada — outros autores desaconselham triturar/mastigar essa formulação especificamente (divergência na literatura citada pelo próprio artigo). Antieméticos antidopaminérgicos (metoclopramida, haloperidol, clorpromazina, prometazina, proclorperazina) reduzem a eficácia de levodopa/carbidopa — evitar; preferir domperidona (se disponível) ou ondansetrona. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 388-389",
  },
  {
    id: "pramipexol",
    nomeGenerico: "Pramipexol",
    nomesComerciais: ["Mirapex"],
    classe: "neurologico",
    subclasse: "Agonistas dopaminérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Suspensão abrupta pode precipitar Síndrome de Hiperpirexia Parkinsoniana (PHS), assim como levodopa. O risco de delirium é maior com agonistas dopaminérgicos do que com levodopa, o que gera controvérsia de manejo.",
    situacoesEspeciais:
      "Atenção: o próprio artigo relata divergência na literatura sobre se a dose deve ser dada no DOS/pós-operatório imediato na sala de recuperação, versus segurada na noite anterior e manhã da cirurgia pelo risco de delirium — a 'Consensus Recommendation' impressa final é continuar incluindo DOS, mas essa controvérsia consta explicitamente no texto narrativo do artigo. Ajuste de dose se ClCr <30 mL/min. Risco de delirium, hipotensão postural, discinesia. Antidopaminérgicos (haloperidol, metoclopramida) exacerbam sintomas de DP. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 389",
  },
  {
    id: "ropinirol",
    nomeGenerico: "Ropinirol",
    nomesComerciais: ["Requip"],
    classe: "neurologico",
    subclasse: "Agonistas dopaminérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Suspensão abrupta pode precipitar Síndrome de Hiperpirexia Parkinsoniana (PHS), assim como levodopa. O risco de delirium é maior com agonistas dopaminérgicos do que com levodopa, o que gera controvérsia de manejo.",
    situacoesEspeciais:
      "Atenção: o próprio artigo relata divergência na literatura sobre se a dose deve ser dada no DOS/pós-operatório imediato na sala de recuperação, versus segurada na noite anterior e manhã da cirurgia pelo risco de delirium — a 'Consensus Recommendation' impressa final é continuar incluindo DOS, mas essa controvérsia consta explicitamente no texto narrativo do artigo. Ajuste de dose se ClCr <30 mL/min. Risco de delirium, hipotensão postural, discinesia. Antidopaminérgicos (haloperidol, metoclopramida) exacerbam sintomas de DP. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 389",
  },
  {
    id: "rotigotina",
    nomeGenerico: "Rotigotina",
    nomesComerciais: ["Neupro"],
    classe: "neurologico",
    subclasse: "Agonistas dopaminérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Suspensão abrupta pode precipitar Síndrome de Hiperpirexia Parkinsoniana (PHS), assim como levodopa. O risco de delirium é maior com agonistas dopaminérgicos do que com levodopa, o que gera controvérsia de manejo.",
    situacoesEspeciais:
      "Atenção: o próprio artigo relata divergência na literatura sobre se a dose deve ser dada no DOS/pós-operatório imediato na sala de recuperação, versus segurada na noite anterior e manhã da cirurgia pelo risco de delirium — a 'Consensus Recommendation' impressa final é continuar incluindo DOS, mas essa controvérsia consta explicitamente no texto narrativo do artigo. Via transdérmica facilita manutenção quando a ingesta oral está prejudicada. Risco de delirium, hipotensão postural, discinesia, bloqueio AV de 1º grau. Antidopaminérgicos (haloperidol, metoclopramida) exacerbam sintomas de DP. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 389",
  },
  {
    id: "apomorfina",
    nomeGenerico: "Apomorfina",
    nomesComerciais: ["Apokyn", "Kynmobi"],
    classe: "neurologico",
    subclasse: "Agonistas dopaminérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Suspensão abrupta pode precipitar Síndrome de Hiperpirexia Parkinsoniana (PHS), assim como levodopa. O risco de delirium é maior com agonistas dopaminérgicos do que com levodopa, o que gera controvérsia de manejo.",
    situacoesEspeciais:
      "Atenção: o próprio artigo relata divergência na literatura sobre se a dose deve ser dada no DOS/pós-operatório imediato na sala de recuperação, versus segurada na noite anterior e manhã da cirurgia pelo risco de delirium — a 'Consensus Recommendation' impressa final é continuar incluindo DOS, mas essa controvérsia consta explicitamente no texto narrativo do artigo. Via subcutânea/sublingual facilita manutenção quando a ingesta oral está prejudicada. Causa náusea grave e deve ser sempre coadministrada com antiemético (domperidona preferencialmente). Antidopaminérgicos (haloperidol, metoclopramida) exacerbam sintomas de DP. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 389",
  },
  {
    id: "bromocriptina",
    nomeGenerico: "Bromocriptina",
    nomesComerciais: ["Parlodel", "Cycloset"],
    classe: "neurologico",
    subclasse: "Agonistas dopaminérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Suspensão abrupta pode precipitar Síndrome de Hiperpirexia Parkinsoniana (PHS), assim como levodopa. Agente de 1ª geração, raramente usado hoje (agentes de 2ª geração como pramipexol e ropinirol são preferidos).",
    situacoesEspeciais:
      "Atenção: o próprio artigo relata divergência na literatura sobre se a dose deve ser dada no DOS/pós-operatório imediato na sala de recuperação, versus segurada na noite anterior e manhã da cirurgia pelo risco de delirium — a 'Consensus Recommendation' impressa final é continuar incluindo DOS, mas essa controvérsia consta explicitamente no texto narrativo do artigo. Risco de delirium, hipotensão postural, discinesia. Antidopaminérgicos (haloperidol, metoclopramida) exacerbam sintomas de DP. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390; texto p. 389",
  },
  {
    id: "selegilina",
    nomeGenerico: "Selegilina",
    nomesComerciais: ["Eldepryl", "Zelapar", "Atapryl", "Carbex"],
    classe: "neurologico",
    subclasse: "Inibidores da MAO-B (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Inibidores da MAO-B não carregam o mesmo risco de retirada/PHS observado com os agentes dopaminérgicos. Dado o risco de recidiva de DP durante um período de descontinuação pré-operatória e a segurança dos anestésicos modernos, o consenso é continuar.",
    situacoesEspeciais:
      "IMPORTANTE — não confundir com os IMAOs psiquiátricos: os inibidores da MAO-B usados em Parkinson são farmacologicamente distintos (mais seletivos para MAO-B) e recebem recomendação diferente. Historicamente/tradicionalmente, um período de descontinuação de 1 a 2 semanas era considerado necessário para clearance completo (washout) desses agentes antes de procedimentos — mas o artigo explicitamente recomenda NÃO fazer isso e continuar a medicação; 'não há consenso na literatura' quanto ao manejo tradicional (washout), e a recomendação do painel supera essa prática. Contraindicações/interações graves: agentes adrenérgicos indiretos (ex.: efedrina) — risco de crise hipertensiva grave; opioides serotoninérgicos (meperidina, metadona, tramadol) — risco de síndrome serotoninérgica e toxicidade opioide. Outras drogas de risco: tapentadol, dextrometorfano, ciclobenzaprina, propoxifeno, antidepressivos tricíclicos/tetracíclicos/triazolopiridínicos, ISRS, IRSN, fluoxetina, anfetamina, metanfetamina. Alertar o anestesiologista e a equipe perioperatória sobre as múltiplas interações medicamentosas. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390-391; texto p. 392",
  },
  {
    id: "rasagilina",
    nomeGenerico: "Rasagilina",
    nomesComerciais: ["Azilect"],
    classe: "neurologico",
    subclasse: "Inibidores da MAO-B (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Inibidores da MAO-B não carregam o mesmo risco de retirada/PHS observado com os agentes dopaminérgicos. Dado o risco de recidiva de DP durante um período de descontinuação pré-operatória e a segurança dos anestésicos modernos, o consenso é continuar.",
    situacoesEspeciais:
      "IMPORTANTE — não confundir com os IMAOs psiquiátricos: os inibidores da MAO-B usados em Parkinson são farmacologicamente distintos (mais seletivos para MAO-B) e recebem recomendação diferente. Historicamente/tradicionalmente, um período de descontinuação de 1 a 2 semanas era considerado necessário para clearance completo (washout) — mas o artigo explicitamente recomenda NÃO fazer isso e continuar a medicação. Contraindicada com risco de síndrome serotoninérgica e toxicidade opioide (ex.: meperidina, metadona, tramadol). Alertar o anestesiologista e a equipe perioperatória sobre as múltiplas interações medicamentosas. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390-391; texto p. 392",
  },
  {
    id: "safinamida",
    nomeGenerico: "Safinamida",
    nomesComerciais: ["Xadago"],
    classe: "neurologico",
    subclasse: "Inibidores da MAO-B (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Inibidores da MAO-B não carregam o mesmo risco de retirada/PHS observado com os agentes dopaminérgicos. Dado o risco de recidiva de DP durante um período de descontinuação pré-operatória e a segurança dos anestésicos modernos, o consenso é continuar.",
    situacoesEspeciais:
      "IMPORTANTE — não confundir com os IMAOs psiquiátricos: os inibidores da MAO-B usados em Parkinson são farmacologicamente distintos (mais seletivos para MAO-B) e recebem recomendação diferente. Historicamente/tradicionalmente, um período de descontinuação de 1 a 2 semanas era considerado necessário para clearance completo (washout) — mas o artigo explicitamente recomenda NÃO fazer isso e continuar a medicação. Qualquer narcótico pode causar depressão de SNC/respiratória; antieméticos serotoninérgicos (ondansetron, dolasetron, palonosetron, granisetron) — risco de síndrome serotoninérgica; atropina/isoproterenol podem causar crise hipertensiva. Alertar o anestesiologista e a equipe perioperatória sobre as múltiplas interações medicamentosas. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 390-391; texto p. 392",
  },
  {
    id: "entacapona",
    nomeGenerico: "Entacapona",
    nomesComerciais: ["Comtan"],
    classe: "neurologico",
    subclasse: "Inibidores da COMT (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a meia-vida plasmática da levodopa ao inibir seu metabolismo; a literatura limitada apoia a continuação, já que a descontinuação abrupta ou redução de dose pode resultar em Síndrome de Hiperpirexia Parkinsoniana (PHS).",
    situacoesEspeciais:
      "Interações medicamentosas importantes com fármacos vasoativos perioperatórios — norepinefrina, dopamina, dobutamina, epinefrina, isoproterenol — podem causar hipertensão, taquicardia e arritmias cardíacas significativas. Risco de lesão hepática (ajuste de dose em doença hepática). Uso concomitante com varfarina pode aumentar o INR em 13%. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 392",
  },
  {
    id: "tolcapona",
    nomeGenerico: "Tolcapona",
    nomesComerciais: ["Tasmar"],
    classe: "neurologico",
    subclasse: "Inibidores da COMT (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a meia-vida plasmática da levodopa ao inibir seu metabolismo; a literatura limitada apoia a continuação, já que a descontinuação abrupta ou redução de dose pode resultar em Síndrome de Hiperpirexia Parkinsoniana (PHS).",
    situacoesEspeciais:
      "Interações medicamentosas importantes com fármacos vasoativos perioperatórios — norepinefrina, dopamina, dobutamina, epinefrina, isoproterenol — podem causar hipertensão, taquicardia e arritmias cardíacas significativas. Risco de lesão hepática. Uso concomitante com varfarina pode aumentar o INR em 13%. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 392",
  },
  {
    id: "opicapona",
    nomeGenerico: "Opicapona",
    nomesComerciais: ["Ongentys"],
    classe: "neurologico",
    subclasse: "Inibidores da COMT (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a meia-vida plasmática da levodopa ao inibir seu metabolismo; a literatura limitada apoia a continuação, já que a descontinuação abrupta ou redução de dose pode resultar em Síndrome de Hiperpirexia Parkinsoniana (PHS).",
    situacoesEspeciais:
      "Interações medicamentosas importantes com fármacos vasoativos perioperatórios — norepinefrina, dopamina, dobutamina, epinefrina, isoproterenol — podem causar hipertensão, taquicardia e arritmias cardíacas significativas. Risco de lesão hepática (ajuste de dose em doença hepática). Uso concomitante com varfarina pode aumentar o INR em 13%. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 392",
  },
  {
    id: "benztropina",
    nomeGenerico: "Benztropina",
    nomesComerciais: ["Cogentin"],
    classe: "neurologico",
    subclasse: "Agentes anticolinérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Usados em Parkinson para reduzir tremor. Múltiplas vias de administração oferecem flexibilidade de dosagem perioperatória.",
    situacoesEspeciais:
      "Descontinuação abrupta pode precipitar sinais/sintomas de Síndrome de Hiperpirexia Parkinsoniana (PHS) — evitar. Sintomas de retirada mais leves (ansiedade, depressão, insônia, náusea, cefaleia) podem ser controlados com propranolol e diazepam. Não recomendados de forma geral em idosos por efeitos anticolinérgicos. Potenciação de efeitos anticolinérgicos com outros anticolinérgicos perioperatórios (prometazina, fenotiazínicos, proclorperazina, glicopirrolato, escopolamina). Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 392-393",
  },
  {
    id: "triexifenidil",
    nomeGenerico: "Triexifenidil",
    nomesComerciais: ["Artane", "Trihexane", "Tritane"],
    classe: "neurologico",
    subclasse: "Agentes anticolinérgicos (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Usados em Parkinson para reduzir tremor. Múltiplas vias de administração oferecem flexibilidade de dosagem perioperatória.",
    situacoesEspeciais:
      "Descontinuação abrupta pode precipitar sinais/sintomas de Síndrome de Hiperpirexia Parkinsoniana (PHS) — evitar. Sintomas de retirada mais leves (ansiedade, depressão, insônia, náusea, cefaleia) podem ser controlados com propranolol e diazepam. Não recomendados de forma geral em idosos por efeitos anticolinérgicos. Potenciação de efeitos anticolinérgicos com outros anticolinérgicos perioperatórios (prometazina, fenotiazínicos, proclorperazina, glicopirrolato, escopolamina). Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 392-393",
  },
  {
    id: "amantadina",
    nomeGenerico: "Amantadina",
    nomesComerciais: ["Symmetrel", "Gocovri", "Osmolex"],
    classe: "neurologico",
    subclasse: "Amantadina (DP)",
    regra: { tipo: "continuar" },
    racional:
      "Antiviral com ação dopaminérgica direta/indireta e propriedades anticolinérgicas. Descontinuação abrupta deve ser evitada — risco de deterioração clínica marcada dos sintomas de DP e sintomas neuropsiquiátricos (delirium, delusões, alucinações, fala arrastada).",
    situacoesEspeciais:
      "Orientação limitada na literatura ('limited guidance'), mas sustenta administrar no pré-operatório e ao despertar na sala de recuperação pós-anestésica. Para colocação de DBS sob anestesia 'acordada', pode ser necessário segurar a medicação no DOS (confirmar com a equipe cirúrgica).",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 3, p. 391; texto p. 393",
  },

  // ---------------------------------------------------------------------
  // Doença de Alzheimer — Tabela 4
  // ---------------------------------------------------------------------
  {
    id: "rivastigmina",
    nomeGenerico: "Rivastigmina",
    nomesComerciais: ["Exelon"],
    classe: "neurologico",
    subclasse: "Inibidores da acetilcolinesterase (Doença de Alzheimer)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a concentração de acetilcolina por inibição reversível da acetilcolinesterase. A descontinuação prolongada (necessária para donepezila, dado seu washout de 2-3 semanas) pode levar a declínio cognitivo progressivo, possivelmente não reversível ao reiniciar a medicação.",
    situacoesEspeciais:
      "Interação com succinilcolina: exagera e prolonga seu efeito (duração de bloqueio aumenta de ~10-12 min para ~25-30 min). Reversão imprevisível/insuficiente de bloqueadores neuromusculares não despolarizantes; sugamadex deve ser usado para reversão de rocurônio/vecurônio nesses pacientes; neostigmina pode ser menos eficaz como reversor. Alguns protocolos institucionais sugerem suspender no dia anterior à cirurgia para facilitar o uso de bloqueador neuromuscular — abordagem 'razoável' para rivastigmina/galantamina (meia-vida curta, 3-4h e 7-8h respectivamente) mas não para donepezila (meia-vida 70h). Apesar disso, a recomendação de consenso final do painel é continuar — evitar succinilcolina e usar bloqueadores não despolarizantes de ação curta (cisatracúrio, atracúrio). Efeitos colaterais colinérgicos periféricos: náusea, vômito, diarreia, síncope, convulsões, hiperatividade do detrusor, exacerbação de asma/DPOC, dor muscular, bradicardia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 4, p. 393; texto p. 392-393",
  },
  {
    id: "donepezila",
    nomeGenerico: "Donepezila",
    nomesComerciais: ["Aricept"],
    classe: "neurologico",
    subclasse: "Inibidores da acetilcolinesterase (Doença de Alzheimer)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a concentração de acetilcolina por inibição reversível da acetilcolinesterase. A descontinuação prolongada (necessária para donepezila, dado seu washout de 2-3 semanas) pode levar a declínio cognitivo progressivo, possivelmente não reversível ao reiniciar a medicação.",
    situacoesEspeciais:
      "Interação com succinilcolina: exagera e prolonga seu efeito (duração de bloqueio aumenta de ~10-12 min para ~25-30 min). Reversão imprevisível/insuficiente de bloqueadores neuromusculares não despolarizantes; sugamadex deve ser usado para reversão de rocurônio/vecurônio nesses pacientes; neostigmina pode ser menos eficaz como reversor. Alguns protocolos institucionais sugerem suspender no dia anterior à cirurgia para facilitar o uso de bloqueador neuromuscular, mas essa abordagem NÃO é considerada razoável para donepezila especificamente (meia-vida 70h, exigiria 2-3 semanas de washout com risco de declínio cognitivo). A recomendação de consenso final do painel é continuar — evitar succinilcolina e usar bloqueadores não despolarizantes de ação curta (cisatracúrio, atracúrio). Cautela com fármacos que prolongam QT — risco de bradicardia e torsades de pointes. Efeitos colaterais colinérgicos periféricos: náusea, vômito, diarreia, síncope, convulsões, hiperatividade do detrusor, exacerbação de asma/DPOC, dor muscular, bradicardia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 4, p. 393; texto p. 392-393",
  },
  {
    id: "galantamina",
    nomeGenerico: "Galantamina",
    nomesComerciais: ["Razadyne"],
    classe: "neurologico",
    subclasse: "Inibidores da acetilcolinesterase (Doença de Alzheimer)",
    regra: { tipo: "continuar" },
    racional:
      "Aumentam a concentração de acetilcolina por inibição reversível da acetilcolinesterase. A descontinuação prolongada pode levar a declínio cognitivo progressivo, possivelmente não reversível ao reiniciar a medicação.",
    situacoesEspeciais:
      "Interação com succinilcolina: exagera e prolonga seu efeito (duração de bloqueio aumenta de ~10-12 min para ~25-30 min). Reversão imprevisível/insuficiente de bloqueadores neuromusculares não despolarizantes; sugamadex deve ser usado para reversão de rocurônio/vecurônio nesses pacientes; neostigmina pode ser menos eficaz como reversor. Alguns protocolos institucionais sugerem suspender no dia anterior à cirurgia para facilitar o uso de bloqueador neuromuscular — abordagem 'razoável' para galantamina (meia-vida curta, 7-8h). Apesar disso, a recomendação de consenso final do painel é continuar — evitar succinilcolina e usar bloqueadores não despolarizantes de ação curta (cisatracúrio, atracúrio). Cautela com fármacos que prolongam QT — risco de bradicardia e torsades de pointes. Efeitos colaterais colinérgicos periféricos: náusea, vômito, diarreia, síncope, convulsões, hiperatividade do detrusor, exacerbação de asma/DPOC, dor muscular, bradicardia.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 4, p. 393; texto p. 392-393",
  },
  {
    id: "memantina",
    nomeGenerico: "Memantina",
    nomesComerciais: ["Namenda"],
    classe: "neurologico",
    subclasse: "Memantina (Doença de Alzheimer)",
    regra: { tipo: "continuar" },
    racional:
      "Primeiro fármaco não-anticolinesterásico aprovado para demência de Alzheimer; antagonista do receptor NMDA (glutamato); interações medicamentosas mínimas.",
    situacoesEspeciais:
      "Cautela com uso concomitante de outros antagonistas NMDA, principalmente cetamina. Efeitos colaterais: tontura, convulsões, insuficiência renal aguda.",
    fonteReferenciaNumero: 5,
    fontePagina: "Tabela 4, p. 393; texto p. 393",
  },
];
