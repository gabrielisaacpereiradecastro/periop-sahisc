import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Oprea AD, Keshock MC, Cummings KC III, et al.
 * Preoperative Management of Medications for Psychiatric Diseases: SPAQI
 * Consensus Statement. Mayo Clin Proc. 2022;97(2):397-416.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/psiquiatrico.md
 *
 * Princípio geral do artigo: a maioria das medicações psiquiátricas deve ser
 * CONTINUADA perioperatoriamente, incluindo no dia da cirurgia (DOS), para
 * evitar recaída da condição psiquiátrica de base ou síndrome de
 * descontinuação/abstinência. Exceções pontuais: IMAO, lítio em cirurgia de
 * grande porte, estimulantes para TDAH.
 *
 * Casos que exigiram tratamento especial (decisões já tomadas, ver relatório):
 * - IMAO: o consenso formal lista DUAS opções equivalentes — continuar com
 *   plano anestésico seguro, OU descontinuar 2 semanas antes sob orientação
 *   do psiquiatra. Modelado como `indicacoes` com as duas opções. O texto
 *   narrativo cita também 2-3 semanas (bula do fabricante) e 10-14 dias
 *   (abordagem europeia com moclobemida) para o mesmo cenário — três números
 *   diferentes no mesmo artigo; optou-se por usar os "2 semanas" da
 *   Consensus Recommendation formal (Tabela 3 / texto pág. 19/415) como o
 *   valor estruturado, mas o app deve deixar claro que a decisão exige
 *   orientação do psiquiatra, não um número automatizado rígido.
 * - Estimulantes de TDAH: a Tabela 6 formal diz "Hold on DOS" — usado como
 *   regra oficial — mas o próprio artigo chama essa recomendação de "uma
 *   abordagem cautelosa" e evidência mais recente favorece
 *   individualizar/continuar; essa nuance está registrada em
 *   `situacoesEspeciais`.
 * - Lítio: modelado como `condicaoClinica` (porte da cirurgia).
 * - Topiramato: citado apenas na lista geral de estabilizadores de humor, sem
 *   linha própria de tabela nem recomendação individual explícita — tratado
 *   com a recomendação geral da classe (continuar), com nota em
 *   `situacoesEspeciais` de que é extrapolada.
 */
export const FARMACOS_PSIQUIATRICO: Farmaco[] = [
  // ---------------------------------------------------------------------
  // Benzodiazepínicos (Tabela 2)
  // ---------------------------------------------------------------------
  {
    id: "alprazolam",
    nomeGenerico: "Alprazolam",
    nomesComerciais: ["Xanax"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; formas IV disponíveis (lorazepam, diazepam, midazolam) para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "clordiazepoxido",
    nomeGenerico: "Clordiazepóxido",
    nomesComerciais: ["Librium"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; formas IV disponíveis (lorazepam, diazepam, midazolam) para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "clonazepam",
    nomeGenerico: "Clonazepam",
    nomesComerciais: ["Klonopin"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; formas IV disponíveis (lorazepam, diazepam, midazolam) para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "clorazepato",
    nomeGenerico: "Clorazepato",
    nomesComerciais: ["Tranxene"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; formas IV disponíveis (lorazepam, diazepam, midazolam) para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "diazepam",
    nomeGenerico: "Diazepam",
    nomesComerciais: ["Valium", "Diastat", "Valtoco"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; forma IV disponível para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "halazepam",
    nomeGenerico: "Halazepam",
    nomesComerciais: ["Paxipam"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "lorazepam",
    nomeGenerico: "Lorazepam",
    nomesComerciais: ["Ativan"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos; forma IV disponível para pacientes que não podem tomar via oral.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "oxazepam",
    nomeGenerico: "Oxazepam",
    nomesComerciais: ["Serax"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "triazolam",
    nomeGenerico: "Triazolam",
    nomesComerciais: ["Halcion"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Aditivo com opioides e outros depressores de SNC (risco de depressão do SNC); monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  // Nota de rodapé do artigo: os cinco a seguir não são aprovados pelo FDA
  // para ansiedade, mas seguem a mesma recomendação dos demais benzodiazepínicos.
  {
    id: "quazepam",
    nomeGenerico: "Quazepam",
    nomesComerciais: ["Doral"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Não aprovado pelo FDA para ansiedade (aprovado para insônia), mas o artigo o inclui na mesma recomendação dos demais benzodiazepínicos (nota de rodapé da Tabela 2). Aditivo com opioides e outros depressores de SNC; monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "temazepam",
    nomeGenerico: "Temazepam",
    nomesComerciais: ["Restoril"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Não aprovado pelo FDA para ansiedade (aprovado para insônia), mas o artigo o inclui na mesma recomendação dos demais benzodiazepínicos (nota de rodapé da Tabela 2). Aditivo com opioides e outros depressores de SNC; monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "clobazam",
    nomeGenerico: "Clobazam",
    nomesComerciais: ["Onfi", "Sympazan"],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Não aprovado pelo FDA para ansiedade (aprovado como adjuvante em epilepsia/síndrome de Lennox-Gastaut), mas o artigo o inclui na mesma recomendação dos demais benzodiazepínicos (nota de rodapé da Tabela 2). Aditivo com opioides e outros depressores de SNC; monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "estazolam",
    nomeGenerico: "Estazolam",
    nomesComerciais: [],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Não aprovado pelo FDA para ansiedade (aprovado para insônia), mas o artigo o inclui na mesma recomendação dos demais benzodiazepínicos (nota de rodapé da Tabela 2). Aditivo com opioides e outros depressores de SNC; monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },
  {
    id: "flurazepam",
    nomeGenerico: "Flurazepam",
    nomesComerciais: [],
    classe: "psiquiatrico",
    subclasse: "Benzodiazepínico",
    regra: { tipo: "continuar" },
    racional:
      "Ação em receptores GABA-A; risco de abstinência (ansiedade, tontura, tremor) se suspenso abruptamente; uso concomitante com anestésicos pode alterar a necessidade de agentes voláteis (pacientes benzo-naive precisam de menos; uso crônico requer mais).",
    situacoesEspeciais:
      "Não aprovado pelo FDA para ansiedade (aprovado para insônia), mas o artigo o inclui na mesma recomendação dos demais benzodiazepínicos (nota de rodapé da Tabela 2). Aditivo com opioides e outros depressores de SNC; monitorar delirium em idosos.",
    fonteReferenciaNumero: 6,
    fontePagina: "3-4/399-400",
  },

  // ---------------------------------------------------------------------
  // Azaspirodecanedionas (Tabela 2)
  // ---------------------------------------------------------------------
  {
    id: "buspirona",
    nomeGenerico: "Buspirona",
    nomesComerciais: ["Buspar", "Vanspar"],
    classe: "psiquiatrico",
    subclasse: "Azaspirodecanediona (ansiolítico não-benzodiazepínico)",
    regra: { tipo: "continuar" },
    racional: "Sem síndrome de abstinência significativa relatada.",
    situacoesEspeciais:
      "Risco de síndrome serotoninérgica com medicações serotoninérgicas (dolasetrona, ondansetrona, palonosetrona); aditivo com opioides/depressores de SNC.",
    fonteReferenciaNumero: 6,
    fontePagina: "3/399",
  },

  // ---------------------------------------------------------------------
  // Anti-histamínico ansiolítico (Tabela 2)
  // ---------------------------------------------------------------------
  {
    id: "hidroxizina",
    nomeGenerico: "Hidroxizina",
    nomesComerciais: ["Vistaril", "Atarax", "Hyzine", "Restall", "Vistacot"],
    classe: "psiquiatrico",
    subclasse: "Anti-histamínico (uso ansiolítico)",
    regra: { tipo: "continuar" },
    racional: "Sem síndrome de abstinência significativa.",
    situacoesEspeciais:
      "Medicamentos que prolongam QT (prometazina, proclorperazina, ondansetrona, granisetrona, sevoflurano) podem somar risco de torsades de pointes; risco de delirium em idosos; aditivo com depressores de SNC.",
    fonteReferenciaNumero: 6,
    fontePagina: "3/399",
  },

  // ---------------------------------------------------------------------
  // Carbamatos (Tabela 2)
  // ---------------------------------------------------------------------
  {
    id: "meprobamato",
    nomeGenerico: "Meprobamato",
    nomesComerciais: ["MB-Tab", "Miltown", "Trancot"],
    classe: "psiquiatrico",
    subclasse: "Carbamato",
    regra: { tipo: "continuar" },
    racional:
      "Sintomas de abstinência (ansiedade, tremor muscular, vômito, insônia, raramente convulsões) se descontinuado abruptamente — reduzir gradualmente se a suspensão for necessária.",
    situacoesEspeciais:
      "Risco de disritmias, anemia aplásica e agranulocitose (raro), convulsões; aditivo com opioides/depressores de SNC.",
    fonteReferenciaNumero: 6,
    fontePagina: "3/399",
  },

  // ---------------------------------------------------------------------
  // ISRS (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "citalopram",
    nomeGenerico: "Citalopram",
    nomesComerciais: ["Celexa"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade); risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "escitalopram",
    nomeGenerico: "Escitalopram",
    nomesComerciais: ["Lexapro"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade); risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "fluoxetina",
    nomeGenerico: "Fluoxetina",
    nomesComerciais: ["Prozac", "Sarafem", "Rapiflux", "Selfemra"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade); risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil. Meia-vida longa (fluoxetina + metabólito ativo norfluoxetina) faz com que efeitos residuais de CYP2D6/CYP3A4 persistam por semanas mesmo se suspensa.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "fluvoxamina",
    nomeGenerico: "Fluvoxamina",
    nomesComerciais: ["Luvox"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade); risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "paroxetina",
    nomeGenerico: "Paroxetina",
    nomesComerciais: ["Paxil", "Pexeva", "Brisdelle"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade) — a paroxetina tem meia-vida curta, tornando esse risco particularmente relevante; risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil; paroxetina é inibidora potente de CYP2D6.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "sertralina",
    nomeGenerico: "Sertralina",
    nomesComerciais: ["Zoloft"],
    classe: "psiquiatrico",
    subclasse: "ISRS",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de descontinuação se suspenso abruptamente (piora de sintomas depressivos, dor abdominal, náusea, diarreia, cefaleia, insônia, irritabilidade); risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, metadona) e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório (ISRS reduzem agregação plaquetária), especialmente combinado com AINEs, em neurocirurgia/cirurgia ortopédica e cirurgia de mama (maior taxa de reoperação por hematoma); hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos); evitar opioides que dependem de ativação via CYP2D6 (oxicodona, codeína, hidrocodona) — preferir morfina, hidromorfona ou fentanil.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "vilazodona",
    nomeGenerico: "Vilazodona",
    nomesComerciais: ["Viibryd"],
    classe: "psiquiatrico",
    subclasse: "Modulador de serotonina (mesma tabela/recomendação dos ISRS)",
    regra: { tipo: "continuar" },
    racional:
      "Mesma lógica dos ISRS: risco de síndrome de descontinuação se suspenso abruptamente; risco de síndrome serotoninérgica com opioides e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório, especialmente combinado com AINEs; hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos).",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },
  {
    id: "vortioxetina",
    nomeGenerico: "Vortioxetina",
    nomesComerciais: ["Trintellix"],
    classe: "psiquiatrico",
    subclasse: "Modulador de serotonina (mesma tabela/recomendação dos ISRS)",
    regra: { tipo: "continuar" },
    racional:
      "Mesma lógica dos ISRS: risco de síndrome de descontinuação se suspenso abruptamente; risco de síndrome serotoninérgica com opioides e antieméticos serotoninérgicos.",
    situacoesEspeciais:
      "Risco aumentado de sangramento perioperatório, especialmente combinado com AINEs; hiponatremia por SIADH (especialmente idosos, depleção de volume, uso de diuréticos).",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 4-9/400-405",
  },

  // ---------------------------------------------------------------------
  // ISRSN (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "duloxetina",
    nomeGenerico: "Duloxetina",
    nomesComerciais: ["Cymbalta", "Irenka", "Drizalma"],
    classe: "psiquiatrico",
    subclasse: "ISRSN",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de abstinência com retirada abrupta (duração de redução varia por fármaco); síndrome serotoninérgica; risco de sangramento com medicações que alteram coagulação.",
    situacoesEspeciais:
      "Inibidora de CYP2D6 (aumenta toxicidade de prometazina, proclorperazina, tramadol, tapentadol); hiponatremia por SIADH; ajuste de dose se insuficiência renal.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 9/405",
  },
  {
    id: "venlafaxina",
    nomeGenerico: "Venlafaxina",
    nomesComerciais: ["Effexor"],
    classe: "psiquiatrico",
    subclasse: "ISRSN",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de abstinência com retirada abrupta (duração de redução varia por fármaco); síndrome serotoninérgica; risco de sangramento com medicações que alteram coagulação.",
    situacoesEspeciais:
      "Interage com medicações que prolongam QT (risco de arritmia); hiponatremia por SIADH; pode piorar hipertensão/taquicardia; ajuste de dose se insuficiência renal.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 9/405",
  },
  {
    id: "desvenlafaxina",
    nomeGenerico: "Desvenlafaxina",
    nomesComerciais: ["Pristiq", "Khedezla"],
    classe: "psiquiatrico",
    subclasse: "ISRSN",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de abstinência com retirada abrupta (duração de redução varia por fármaco); síndrome serotoninérgica; risco de sangramento com medicações que alteram coagulação.",
    situacoesEspeciais:
      "Tem menos interações medicamentosas que a venlafaxina; hiponatremia por SIADH; ajuste de dose se insuficiência renal.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 9/405",
  },
  {
    id: "levomilnaciprano",
    nomeGenerico: "Levomilnaciprano",
    nomesComerciais: ["Fetzima"],
    classe: "psiquiatrico",
    subclasse: "ISRSN",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de abstinência com retirada abrupta (duração de redução varia por fármaco); síndrome serotoninérgica; risco de sangramento com medicações que alteram coagulação.",
    situacoesEspeciais:
      "Tem menos interações medicamentosas que a venlafaxina; hiponatremia por SIADH; ajuste de dose se insuficiência renal.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 9/405",
  },
  {
    id: "milnaciprano",
    nomeGenerico: "Milnaciprano",
    nomesComerciais: ["Savella"],
    classe: "psiquiatrico",
    subclasse: "ISRSN",
    regra: { tipo: "continuar" },
    racional:
      "Risco de síndrome de abstinência com retirada abrupta (duração de redução varia por fármaco); síndrome serotoninérgica; risco de sangramento com medicações que alteram coagulação.",
    situacoesEspeciais: "Hiponatremia por SIADH; ajuste de dose se insuficiência renal.",
    fonteReferenciaNumero: 6,
    fontePagina: "5/401; 9/405",
  },

  // ---------------------------------------------------------------------
  // Antidepressivos tricíclicos (TCA) (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "amitriptilina",
    nomeGenerico: "Amitriptilina",
    nomesComerciais: ["Elavil", "Vanatrip"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos (epinefrina, norepinefrina, dobutamina) e indiretos (efedrina) podem causar hipertensão/arritmia imprevisível — norepinefrina é o vasopressor de escolha para hipotensão relacionada a TCA; cautela com anticolinérgicos de ação central (atropina) — risco de delirium pós-operatório; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "amoxapina",
    nomeGenerico: "Amoxapina",
    nomesComerciais: ["Asendin"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; há evidência de que descontinuar amoxapina 24h antes pode melhorar a responsividade de receptores alfa, mas na prática a maioria dos clínicos mantém.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "clomipramina",
    nomeGenerico: "Clomipramina",
    nomesComerciais: ["Anafranil"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "desipramina",
    nomeGenerico: "Desipramina",
    nomesComerciais: ["Norpramin"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "doxepina",
    nomeGenerico: "Doxepina",
    nomesComerciais: ["Sinequan", "Prudoxin", "Zonalon", "Silenor"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "imipramina",
    nomeGenerico: "Imipramina",
    nomesComerciais: ["Tofranil"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "nortriptilina",
    nomeGenerico: "Nortriptilina",
    nomesComerciais: ["Aventyl", "Pamelor"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "protriptilina",
    nomeGenerico: "Protriptilina",
    nomesComerciais: ["Vivactil"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },
  {
    id: "trimipramina",
    nomeGenerico: "Trimipramina",
    nomesComerciais: ["Surmontil"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo tricíclico (TCA)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio competitivo da recaptação de norepinefrina e serotonina; apesar de interações sérias, a descontinuação perioperatória pode precipitar sintomas de abstinência, por isso geralmente mantido. Em pacientes propensos a arritmia, a opção mais segura é reduzir gradualmente (tapering) para evitar abstinência.",
    situacoesEspeciais:
      "Simpaticomiméticos diretos e indiretos podem causar hipertensão/arritmia imprevisível; cautela com anticolinérgicos de ação central; potencializa depressores de SNC; anestésicos voláteis (particularmente halotano) podem causar arritmia ventricular; toxicidade cardíaca e efeitos anticolinérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "5-6/401-402; 9-10/405-406",
  },

  // ---------------------------------------------------------------------
  // Tetracíclicos (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "maprotilina",
    nomeGenerico: "Maprotilina",
    nomesComerciais: ["Ludiomil"],
    classe: "psiquiatrico",
    subclasse: "Tetracíclico",
    regra: { tipo: "continuar" },
    racional: "Sem interações anestésicas relatadas.",
    situacoesEspeciais: "Sem situações especiais adicionais descritas pelo artigo.",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402",
  },
  {
    id: "mirtazapina",
    nomeGenerico: "Mirtazapina",
    nomesComerciais: ["Remeron"],
    classe: "psiquiatrico",
    subclasse: "Tetracíclico",
    regra: { tipo: "continuar" },
    racional:
      "Aumenta serotonina/norepinefrina bloqueando recaptação pré-sináptica; antagonista seletivo de norepinefrina e serotonina; sem efeitos hemodinâmicos significativos.",
    situacoesEspeciais:
      "Risco de síndrome serotoninérgica com opioides/antieméticos serotoninérgicos; risco de arritmia com medicações que prolongam QT; hiponatremia, efeitos anticolinérgicos, convulsão, sonolência; risco aumentado de sangramento com varfarina; evitar descontinuação abrupta (tapering gradual).",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402; 11/407",
  },

  // ---------------------------------------------------------------------
  // IMAO (Tabela 3) — atenção especial: duas opções formais do consenso
  // ---------------------------------------------------------------------
  {
    id: "fenelzina",
    nomeGenerico: "Fenelzina",
    nomesComerciais: ["Nardil"],
    classe: "psiquiatrico",
    subclasse: "Inibidor da monoamina oxidase (IMAO)",
    indicacoes: [
      {
        id: "continuar_anestesico_seguro",
        descricao:
          "Continuar o IMAO e usar plano anestésico seguro para IMAO (evitar meperidina, simpaticomiméticos indiretos, cetamina — ver situações especiais)",
        regra: { tipo: "continuar" },
      },
      {
        id: "descontinuar_2_semanas",
        descricao: "Descontinuar sob orientação do psiquiatra antes da cirurgia",
        regra: { tipo: "suspender_periodo_fixo", valor: 14, unidade: "dias" },
      },
    ],
    racional:
      "Não há consenso único na literatura sobre o manejo perioperatório dos IMAO. Mais comumente, na prática, os IMAO são mantidos perioperatoriamente com plano anestésico seguro. Se optar por suspender, deve ser gradual e com acompanhamento psiquiátrico, reiniciando assim que possível no pós-operatório. Fenelzina prolonga a ação da succinilcolina (inibição da pseudocolinesterase). Reação tipo II (depressiva) pode causar sedação excessiva por inibição de enzimas hepáticas que metabolizam opioides; opioides com baixa atividade serotoninérgica (morfina, fentanil, alfentanil, remifentanil) podem ser administrados com segurança. Anestésicos neuraxiais não são contraindicados, mas certos vasopressores devem ser evitados; anestésicos locais com epinefrina podem causar reação hipertensiva exagerada. Demais anestésicos IV e voláteis (exceto cetamina) são seguros.",
    situacoesEspeciais:
      "CONTRAINDICAÇÕES ABSOLUTAS (aplicam-se a ambas as opções, continuar ou descontinuar, enquanto o IMAO estiver ativo no organismo): meperidina (reação tipo I excitatória, simula síndrome serotoninérgica); simpaticomiméticos indiretos como efedrina e metaraminol (risco de crise hipertensiva); opioides serotoninérgicos — meperidina, metadona, tramadol (risco de síndrome serotoninérgica); cetamina (simpaticomimética, risco de crise hipertensiva). Dieta livre de tiramina obrigatória no pré-operatório; evitar estimulação simpática e desidratação; se hipotensão, usar simpaticomiméticos DIRETOS (ex. fenilefrina em pequenos incrementos), não indiretos; pancurônio pode causar reação simpática; anestesiologista responsável deve ser explicitamente alertado sobre o uso de IMAO. O artigo cita também outros dois números para o período de descontinuação, sem consenso único: 2-3 semanas (recomendação do fabricante) e 10-14 dias (abordagem europeia, substituindo por moclobemida — IMAO-A reversível disponível na Europa/Canadá — suspensa 24h antes do procedimento). Decisão de suspender deve sempre envolver o psiquiatra assistente.",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402; 9-11/406-407",
  },
  {
    id: "tranilcipromina",
    nomeGenerico: "Tranilcipromina",
    nomesComerciais: ["Parnate"],
    classe: "psiquiatrico",
    subclasse: "Inibidor da monoamina oxidase (IMAO)",
    indicacoes: [
      {
        id: "continuar_anestesico_seguro",
        descricao:
          "Continuar o IMAO e usar plano anestésico seguro para IMAO (evitar meperidina, simpaticomiméticos indiretos, cetamina — ver situações especiais)",
        regra: { tipo: "continuar" },
      },
      {
        id: "descontinuar_2_semanas",
        descricao: "Descontinuar sob orientação do psiquiatra antes da cirurgia",
        regra: { tipo: "suspender_periodo_fixo", valor: 14, unidade: "dias" },
      },
    ],
    racional:
      "Não há consenso único na literatura sobre o manejo perioperatório dos IMAO. Mais comumente, na prática, os IMAO são mantidos perioperatoriamente com plano anestésico seguro. Se optar por suspender, deve ser gradual e com acompanhamento psiquiátrico, reiniciando assim que possível no pós-operatório. Reação tipo II (depressiva) pode causar sedação excessiva por inibição de enzimas hepáticas que metabolizam opioides; opioides com baixa atividade serotoninérgica (morfina, fentanil, alfentanil, remifentanil) podem ser administrados com segurança. Anestésicos neuraxiais não são contraindicados, mas certos vasopressores devem ser evitados; anestésicos locais com epinefrina podem causar reação hipertensiva exagerada. Demais anestésicos IV e voláteis (exceto cetamina) são seguros.",
    situacoesEspeciais:
      "CONTRAINDICAÇÕES ABSOLUTAS (aplicam-se a ambas as opções, continuar ou descontinuar, enquanto o IMAO estiver ativo no organismo): meperidina (reação tipo I excitatória, simula síndrome serotoninérgica); simpaticomiméticos indiretos como efedrina e metaraminol (risco de crise hipertensiva); opioides serotoninérgicos — meperidina, metadona, tramadol (risco de síndrome serotoninérgica); cetamina (simpaticomimética, risco de crise hipertensiva). Dieta livre de tiramina obrigatória no pré-operatório; evitar estimulação simpática e desidratação; se hipotensão, usar simpaticomiméticos DIRETOS (ex. fenilefrina em pequenos incrementos), não indiretos; pancurônio pode causar reação simpática; anestesiologista responsável deve ser explicitamente alertado sobre o uso de IMAO. O artigo cita também outros dois números para o período de descontinuação, sem consenso único: 2-3 semanas (recomendação do fabricante) e 10-14 dias (abordagem europeia, substituindo por moclobemida — IMAO-A reversível disponível na Europa/Canadá — suspensa 24h antes do procedimento). Decisão de suspender deve sempre envolver o psiquiatra assistente.",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402; 9-11/406-407",
  },
  {
    id: "isocarboxazida",
    nomeGenerico: "Isocarboxazida",
    nomesComerciais: ["Marplan"],
    classe: "psiquiatrico",
    subclasse: "Inibidor da monoamina oxidase (IMAO)",
    indicacoes: [
      {
        id: "continuar_anestesico_seguro",
        descricao:
          "Continuar o IMAO e usar plano anestésico seguro para IMAO (evitar meperidina, simpaticomiméticos indiretos, cetamina — ver situações especiais)",
        regra: { tipo: "continuar" },
      },
      {
        id: "descontinuar_2_semanas",
        descricao: "Descontinuar sob orientação do psiquiatra antes da cirurgia",
        regra: { tipo: "suspender_periodo_fixo", valor: 14, unidade: "dias" },
      },
    ],
    racional:
      "Não há consenso único na literatura sobre o manejo perioperatório dos IMAO. Mais comumente, na prática, os IMAO são mantidos perioperatoriamente com plano anestésico seguro. Se optar por suspender, deve ser gradual e com acompanhamento psiquiátrico, reiniciando assim que possível no pós-operatório. Reação tipo II (depressiva) pode causar sedação excessiva por inibição de enzimas hepáticas que metabolizam opioides; opioides com baixa atividade serotoninérgica (morfina, fentanil, alfentanil, remifentanil) podem ser administrados com segurança. Anestésicos neuraxiais não são contraindicados, mas certos vasopressores devem ser evitados; anestésicos locais com epinefrina podem causar reação hipertensiva exagerada. Demais anestésicos IV e voláteis (exceto cetamina) são seguros.",
    situacoesEspeciais:
      "CONTRAINDICAÇÕES ABSOLUTAS (aplicam-se a ambas as opções, continuar ou descontinuar, enquanto o IMAO estiver ativo no organismo): meperidina (reação tipo I excitatória, simula síndrome serotoninérgica); simpaticomiméticos indiretos como efedrina e metaraminol (risco de crise hipertensiva); opioides serotoninérgicos — meperidina, metadona, tramadol (risco de síndrome serotoninérgica); cetamina (simpaticomimética, risco de crise hipertensiva). Dieta livre de tiramina obrigatória no pré-operatório; evitar estimulação simpática e desidratação; se hipotensão, usar simpaticomiméticos DIRETOS (ex. fenilefrina em pequenos incrementos), não indiretos; pancurônio pode causar reação simpática; anestesiologista responsável deve ser explicitamente alertado sobre o uso de IMAO. O artigo cita também outros dois números para o período de descontinuação, sem consenso único: 2-3 semanas (recomendação do fabricante) e 10-14 dias (abordagem europeia, substituindo por moclobemida — IMAO-A reversível disponível na Europa/Canadá — suspensa 24h antes do procedimento). Decisão de suspender deve sempre envolver o psiquiatra assistente.",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402; 9-11/406-407",
  },
  {
    id: "selegilina_patch",
    nomeGenerico: "Selegilina (adesivo transdérmico)",
    nomesComerciais: ["EMSAM"],
    classe: "psiquiatrico",
    subclasse: "Inibidor da monoamina oxidase (IMAO)",
    indicacoes: [
      {
        id: "continuar_anestesico_seguro",
        descricao:
          "Continuar o IMAO e usar plano anestésico seguro para IMAO (evitar meperidina, simpaticomiméticos indiretos, cetamina — ver situações especiais)",
        regra: { tipo: "continuar" },
      },
      {
        id: "descontinuar_2_semanas",
        descricao: "Descontinuar sob orientação do psiquiatra antes da cirurgia",
        regra: { tipo: "suspender_periodo_fixo", valor: 14, unidade: "dias" },
      },
    ],
    racional:
      "Não há consenso único na literatura sobre o manejo perioperatório dos IMAO. Mais comumente, na prática, os IMAO são mantidos perioperatoriamente com plano anestésico seguro. Se optar por suspender, deve ser gradual e com acompanhamento psiquiátrico, reiniciando assim que possível no pós-operatório. Reação tipo II (depressiva) pode causar sedação excessiva por inibição de enzimas hepáticas que metabolizam opioides; opioides com baixa atividade serotoninérgica (morfina, fentanil, alfentanil, remifentanil) podem ser administrados com segurança. Anestésicos neuraxiais não são contraindicados, mas certos vasopressores devem ser evitados; anestésicos locais com epinefrina podem causar reação hipertensiva exagerada. Demais anestésicos IV e voláteis (exceto cetamina) são seguros. Em doses baixas (6 mg/24h), a seletividade para MAO-B é preservada e o risco de interação/dieta livre de tiramina é menor que nos IMAO orais não-seletivos, mas em doses mais altas perde seletividade — o artigo não diferencia formalmente por dose, então a recomendação segue a mesma dos demais IMAO.",
    situacoesEspeciais:
      "CONTRAINDICAÇÕES ABSOLUTAS (aplicam-se a ambas as opções, continuar ou descontinuar, enquanto o IMAO estiver ativo no organismo): meperidina (reação tipo I excitatória, simula síndrome serotoninérgica); simpaticomiméticos indiretos como efedrina e metaraminol (risco de crise hipertensiva); opioides serotoninérgicos — meperidina, metadona, tramadol (risco de síndrome serotoninérgica); cetamina (simpaticomimética, risco de crise hipertensiva). Dieta livre de tiramina obrigatória no pré-operatório; evitar estimulação simpática e desidratação; se hipotensão, usar simpaticomiméticos DIRETOS (ex. fenilefrina em pequenos incrementos), não indiretos; anestesiologista responsável deve ser explicitamente alertado sobre o uso de IMAO. O artigo cita também outros dois números para o período de descontinuação, sem consenso único: 2-3 semanas (recomendação do fabricante) e 10-14 dias (abordagem europeia, substituindo por moclobemida). Decisão de suspender deve sempre envolver o psiquiatra assistente.",
    fonteReferenciaNumero: 6,
    fontePagina: "6/402; 9-11/406-407",
  },

  // ---------------------------------------------------------------------
  // Triazolopiridinas (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "trazodona",
    nomeGenerico: "Trazodona",
    nomesComerciais: ["Desyrel", "Oleptro"],
    classe: "psiquiatrico",
    subclasse: "Triazolopiridina",
    regra: { tipo: "continuar" },
    racional: "Risco de sintomas de descontinuação severos se suspenso abruptamente.",
    situacoesEspeciais:
      "Síndrome serotoninérgica com opioides/antieméticos serotoninérgicos; arritmia com medicações que prolongam QT (anestésicos voláteis, metadona, droperidol, sevoflurano); aditivo com depressores de SNC; sedação excessiva, hipotensão postural; risco de arritmia cardíaca se hipocalemia/hipomagnesemia; hiponatremia com depleção de volume.",
    fonteReferenciaNumero: 6,
    fontePagina: "7/403",
  },

  // ---------------------------------------------------------------------
  // Aminocetonas (Tabela 3)
  // ---------------------------------------------------------------------
  {
    id: "bupropiona",
    nomeGenerico: "Bupropiona",
    nomesComerciais: ["Wellbutrin", "Zyban", "Budeprion", "Buproban", "Forfivo"],
    classe: "psiquiatrico",
    subclasse: "Aminocetona",
    regra: { tipo: "continuar" },
    racional:
      "Aumenta níveis de norepinefrina/dopamina por inibição seletiva de recaptação; sem interações anestésicas significativas relatadas de forma direta, mas é inibidora de CYP2D6, aumentando níveis de oxicodona, propranolol, codeína, ondansetrona, carvedilol, tramadol e vários antiarrítmicos/metoclopramida.",
    situacoesEspeciais:
      "Diminui limiar convulsivo (cautela com esteroides sistêmicos, lidocaína, antibióticos betalactâmicos que também reduzem limiar); cetamina pode reduzir ainda mais o limiar convulsivo em quem usa bupropiona; ajuste de dose com disfunção renal/hepática.",
    fonteReferenciaNumero: 6,
    fontePagina: "7/403",
  },

  // ---------------------------------------------------------------------
  // Antidepressivos atípicos — esketamina (texto narrativo, sem tabela própria)
  // (mirtazapina e bupropiona já cobertas acima nas suas respectivas classes)
  // ---------------------------------------------------------------------
  {
    id: "esketamina",
    nomeGenerico: "Esketamina",
    nomesComerciais: ["Spravato"],
    classe: "psiquiatrico",
    subclasse: "Antidepressivo atípico (antagonista NMDA)",
    regra: { tipo: "continuar" },
    racional:
      "Antagonismo de receptor NMDA (mecanismo similar à cetamina); recomendação de continuar perioperatoriamente, incluindo no DOS.",
    situacoesEspeciais: "Sedação aumentada quando combinada com outros depressores de SNC.",
    fonteReferenciaNumero: 6,
    fontePagina: "11/407",
  },

  // ---------------------------------------------------------------------
  // Anticonvulsivantes usados como estabilizadores de humor (Tabela 4)
  // ---------------------------------------------------------------------
  {
    id: "carbamazepina",
    nomeGenerico: "Carbamazepina",
    nomesComerciais: ["Tegretol", "Carbatrol", "Epitol", "Equetro", "Carnexiv"],
    classe: "psiquiatrico",
    subclasse: "Anticonvulsivante usado como estabilizador de humor",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo quando não usada para prevenção de convulsão, a descontinuação abrupta pode reduzir o limiar convulsivo; é geralmente aceito continuá-la perioperatoriamente.",
    situacoesEspeciais:
      "Indutor potente de CYP3A4/3A5, reduz níveis plasmáticos de vários anestésicos incluindo benzodiazepínicos; confere resistência a bloqueadores neuromusculares não-despolarizantes (rocurônio, vecurônio); pode causar hiponatremia, leucopenia com agranulocitose, anemia aplásica ou elevação de enzimas hepáticas; ataxia, tontura, sonolência; reposição IV disponível (70% da dose oral diária dividida em 4 doses, infusão de 30 min a cada 6h).",
    fonteReferenciaNumero: 6,
    fontePagina: "14-15/410-411; 11/407",
  },
  {
    id: "lamotrigina",
    nomeGenerico: "Lamotrigina",
    nomesComerciais: ["Lamictal"],
    classe: "psiquiatrico",
    subclasse: "Anticonvulsivante usado como estabilizador de humor",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo quando não usada para prevenção de convulsão, a descontinuação abrupta pode reduzir o limiar convulsivo; é geralmente aceito continuá-la perioperatoriamente.",
    situacoesEspeciais:
      "Sem interações anestésicas relatadas; evitar descontinuação abrupta (risco de convulsão).",
    fonteReferenciaNumero: 6,
    fontePagina: "14-15/410-411; 11/407",
  },
  {
    id: "oxcarbazepina",
    nomeGenerico: "Oxcarbazepina",
    nomesComerciais: ["Trileptal"],
    classe: "psiquiatrico",
    subclasse: "Anticonvulsivante usado como estabilizador de humor",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo quando não usada para prevenção de convulsão, a descontinuação abrupta pode reduzir o limiar convulsivo; é geralmente aceito continuá-la perioperatoriamente.",
    situacoesEspeciais:
      "Indutora de CYP3A4/3A5, interfere no metabolismo de fentanil e derivados, oxicodona, metadona, hidrocodona, tramadol, meperidina, codeína, buprenorfina (efeito diminuído); pode causar anticoagulação subterapêutica com rivaroxabana; sem forma IV disponível.",
    fonteReferenciaNumero: 6,
    fontePagina: "14-15/410-411; 11/407",
  },
  {
    id: "topiramato",
    nomeGenerico: "Topiramato",
    nomesComerciais: ["Topamax", "Trokendi XR", "Qudexy XR"],
    classe: "psiquiatrico",
    subclasse: "Anticonvulsivante usado como estabilizador de humor",
    regra: { tipo: "continuar" },
    racional:
      "O artigo cita o topiramato apenas na lista geral de anticonvulsivantes usados como estabilizadores de humor ('carbamazepina, lamotrigina, ácido valproico e topiramato'), sem linha própria na Tabela 4 nem recomendação individual explícita no corpo do texto. A recomendação aqui é EXTRAPOLADA da lógica geral da classe: mesmo quando não usado para prevenção de convulsão, a descontinuação abrupta de um anticonvulsivante pode reduzir o limiar convulsivo, por isso geralmente é aceito continuá-lo perioperatoriamente.",
    situacoesEspeciais:
      "ATENÇÃO: o artigo-fonte NÃO tem uma linha de tabela dedicada ao topiramato — esta recomendação é extrapolada da classe geral de anticonvulsivantes/estabilizadores de humor, não uma recomendação testada e validada especificamente para o topiramato pelo painel Delphi. Evitar suspensão abrupta pelo risco de convulsão.",
    fonteReferenciaNumero: 6,
    fontePagina: "11/407 (menção textual apenas, sem tabela dedicada)",
  },

  // ---------------------------------------------------------------------
  // Ácido valproico (Tabela 4)
  // ---------------------------------------------------------------------
  {
    id: "acido_valproico",
    nomeGenerico: "Ácido valproico / Valproato de sódio",
    nomesComerciais: ["Depakote", "Depakene", "Stavzor"],
    classe: "psiquiatrico",
    subclasse: "Anticonvulsivante usado como estabilizador de humor",
    regra: { tipo: "continuar" },
    racional:
      "Como outros anticonvulsivantes usados como estabilizadores de humor, a suspensão abrupta pode reduzir o limiar convulsivo.",
    situacoesEspeciais:
      "Aumenta concentração de barbitúricos e benzodiazepínicos; aumenta exposição ao propofol, causando sedação/depressão cardiorrespiratória aumentada; pode causar LFTs anormais, trombocitopenia, hiperamonemia; é metabolizado por enzimas CYP — níveis podem variar com inibidores/indutores concomitantes; junto com carbamazepina, confere resistência a bloqueadores neuromusculares não-despolarizantes.",
    fonteReferenciaNumero: 6,
    fontePagina: "15/411",
  },

  // ---------------------------------------------------------------------
  // Lítio (Tabela 4) — atenção especial: condição clínica (porte da cirurgia)
  // ---------------------------------------------------------------------
  {
    id: "litio",
    nomeGenerico: "Lítio",
    nomesComerciais: ["Eskalith", "Lithobid"],
    classe: "psiquiatrico",
    subclasse: "Estabilizador de humor",
    condicaoClinica: {
      pergunta:
        "Procedimento de grande porte (grandes deslocamentos de fluido, perda sanguínea significativa, instabilidade hemodinâmica, alto risco de lesão renal aguda perioperatória)?",
      regraSeSim: { tipo: "suspender_periodo_fixo", valor: 72, unidade: "horas" },
      regraSeNao: { tipo: "continuar" },
    },
    racional:
      "Farmacocinética/farmacodinâmica complexas, dependente de função renal para clearance, janela terapêutica estreita, meia-vida longa e variável (12-60h). Mudanças perioperatórias na função renal, status de fluidos e volume plasmático circulante efetivo podem elevar rapidamente os níveis de lítio no pós-operatório, levando a toxicidade 'crônica' (diferente de intoxicação aguda por overdose). Múltiplos relatos de caso de toxicidade por lítio pós-operatória, particularmente em cirurgia bariátrica (referências 44-49 do artigo).",
    situacoesEspeciais:
      "Checar ECG, função renal, eletrólitos e função tireoidiana antes da cirurgia; monitorar função renal e eletrólitos de perto no pós-operatório; janela terapêutica estreita — alto risco de toxicidade com depleção de volume e função renal diminuída; associado a diabetes insipidus nefrogênico (formas subclínicas/compensadas podem se tornar manifestas no pós-operatório quando o paciente em jejum/sedado/delirante perde a capacidade de manter polidipsia compensatória); reduz limiar convulsivo; descontinuação associada a risco de suicídio, mas sem outros sintomas de abstinência; reiniciar quando tolerando via oral e status de fluidos estável, retomando dose habitual e monitorando níveis em 5-7 dias; interage com medicações serotoninérgicas (risco de síndrome serotoninérgica), potencializa relaxantes musculares não-despolarizantes/succinilcolina; diuréticos/IECA/BRA/diltiazem/verapamil/metronidazol/lactulose aumentam risco de toxicidade por lítio; antagonistas de dopamina-2 (proclorperazina, haloperidol, prometazina, droperidol, antipsicóticos) podem causar sintomas extrapiramidais. IMPORTANTE: o artigo NÃO define um corte objetivo (tempo cirúrgico, perda sanguínea em mL, ASA) para 'procedimento de grande porte' — dá apenas exemplos (ex. procedimento de Whipple) e critérios qualitativos; a resposta a esta pergunta exige julgamento clínico do cirurgião/anestesiologista, não é uma regra binária automática.",
    fonteReferenciaNumero: 6,
    fontePagina: "14/410; 11-12/407-408",
  },

  // ---------------------------------------------------------------------
  // Antipsicóticos típicos / primeira geração (Tabela 5)
  // ---------------------------------------------------------------------
  {
    id: "clorpromazina",
    nomeGenerico: "Clorpromazina",
    nomesComerciais: ["Thorazine"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM) — reação idiossincrática rara, mas potencialmente fatal (mortalidade até 20%), mais comum com antipsicóticos de 1ª geração — hiperpirexia aguda, rigidez muscular, instabilidade autonômica, creatinina quinase elevada, leucocitose; efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico (hipotensão ortostática, taquicardia reflexa), bloqueio de histamina (sedação); prolongamento de QT/PR, achatamento de onda T, depressão do segmento ST, raramente complexos ventriculares prematuros e torsades de pointes — evitar uso concomitante de outras medicações que prolongam QT; risco de disfunção termorregulatória (hipotermia/hipertermia) por bloqueio dopaminérgico hipotalâmico; pacientes em uso de antipsicóticos parecem ter menor sensibilidade à dor pós-operatória.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "flufenazina",
    nomeGenerico: "Flufenazina",
    nomesComerciais: ["Prolixin", "Permitil"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM) — reação idiossincrática rara, mas potencialmente fatal (mortalidade até 20%), mais comum com antipsicóticos de 1ª geração; efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "haloperidol",
    nomeGenerico: "Haloperidol",
    nomesComerciais: ["Haldol"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM) — reação idiossincrática rara, mas potencialmente fatal (mortalidade até 20%), mais comum com antipsicóticos de 1ª geração; efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR — evitar uso concomitante de outras medicações que prolongam QT; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "loxapina",
    nomeGenerico: "Loxapina",
    nomesComerciais: ["Loxitane"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM); efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "perfenazina",
    nomeGenerico: "Perfenazina",
    nomesComerciais: ["Trilafon"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM); efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "tiotixeno",
    nomeGenerico: "Tiotixeno",
    nomesComerciais: ["Navane"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM); efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "tioridazina",
    nomeGenerico: "Tioridazina",
    nomesComerciais: ["Mellaril"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM); prolongamento de QT/PR particularmente proeminente nesta molécula — evitar uso concomitante de outras medicações que prolongam QT; efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },
  {
    id: "trifluoperazina",
    nomeGenerico: "Trifluoperazina",
    nomesComerciais: ["Stelazine"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico típico (primeira geração)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueio de receptores dopaminérgicos; descontinuação abrupta pode causar recorrência de sintomas psicóticos e maior incidência de confusão/agitação pós-operatória se suspenso há menos de 72h antes da cirurgia.",
    situacoesEspeciais:
      "Risco de síndrome neuroléptica maligna (SNM); efeitos anticolinérgicos, bloqueio alfa-1-adrenérgico, bloqueio de histamina (sedação); prolongamento de QT/PR; risco de disfunção termorregulatória por bloqueio dopaminérgico hipotalâmico.",
    fonteReferenciaNumero: 6,
    fontePagina: "16/412; 12-13/408-409",
  },

  // ---------------------------------------------------------------------
  // Antipsicóticos atípicos / segunda geração (Tabela 5)
  // ---------------------------------------------------------------------
  {
    id: "aripiprazol",
    nomeGenerico: "Aripiprazol",
    nomesComerciais: ["Abilify"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Risco de desregulação da temperatura corporal e hiperglicemia grave (com coma hiperosmolar/cetoacidose) — especialmente aripiprazol; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "asenapina",
    nomeGenerico: "Asenapina",
    nomesComerciais: ["Saphris", "Secuado"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Risco de desregulação da temperatura corporal e hiperglicemia grave (com coma hiperosmolar/cetoacidose) — especialmente asenapina; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "iloperidona",
    nomeGenerico: "Iloperidona",
    nomesComerciais: ["Fanapt"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "QT prolongado significativo com iloperidona — evitar uso concomitante de outras medicações que prolongam QT; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "paliperidona",
    nomeGenerico: "Paliperidona",
    nomesComerciais: ["Invega"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Ajuste de dose com função renal diminuída; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "risperidona",
    nomeGenerico: "Risperidona",
    nomesComerciais: ["Risperdal", "Perseris"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "QT prolongado significativo com risperidona — evitar uso concomitante de outras medicações que prolongam QT; ajuste de dose com função renal diminuída; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "brexpiprazol",
    nomeGenerico: "Brexpiprazol",
    nomesComerciais: ["Rexulti"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais: "Risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "cariprazina",
    nomeGenerico: "Cariprazina",
    nomesComerciais: ["Vraylar"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais: "Risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "clozapina",
    nomeGenerico: "Clozapina",
    nomesComerciais: ["Clozaril", "FazaClo", "Versacloz"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Risco de miocardite — atenção a sinais cardíacos perioperatórios; monitorar neutropenia durante o tratamento (protocolo REMS de monitoramento hematológico); evitar inibidores de CYP3A4/CYP2D6; risco de rebote colinérgico proeminente ao parar abruptamente (a clozapina tem efeito anticolinérgico marcante).",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "lurasidona",
    nomeGenerico: "Lurasidona",
    nomesComerciais: ["Latuda"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Deve ser administrada com alimento (>350 kcal) para absorção adequada — relevante para o planejamento do jejum perioperatório; contraindicada com fortes inibidores/indutores de CYP3A4; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "olanzapina",
    nomeGenerico: "Olanzapina",
    nomesComerciais: ["Zyprexa"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Risco de hiperglicemia/síndrome metabólica; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "quetiapina",
    nomeGenerico: "Quetiapina",
    nomesComerciais: ["Seroquel"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Sedação e hipotensão ortostática relevantes por bloqueio alfa-1/histamínico; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },
  {
    id: "ziprasidona",
    nomeGenerico: "Ziprasidona",
    nomesComerciais: ["Geodon"],
    classe: "psiquiatrico",
    subclasse: "Antipsicótico atípico (segunda geração)",
    regra: { tipo: "continuar" },
    racional:
      "Mesmo princípio dos antipsicóticos típicos — bloqueio dopaminérgico menos intenso (menos efeitos extrapiramidais), mas efeitos serotoninérgicos, histamínicos, colinérgicos e alfa-adrenérgicos significativos; risco de SNM (menos comum que com típicos, mas presente).",
    situacoesEspeciais:
      "Uso concomitante com agentes serotoninérgicos (TCAs, ISRS, ISRSN, múltiplos opiáceos) aumenta risco de síndrome serotoninérgica; QT prolongado — evitar uso concomitante de outras medicações que prolongam QT; risco de rebote colinérgico ao parar abruptamente.",
    fonteReferenciaNumero: 6,
    fontePagina: "16-17/412-413",
  },

  // ---------------------------------------------------------------------
  // Estimulantes para TDAH (Tabela 6) — atenção especial: "Hold on DOS"
  // formal, mas o próprio artigo chama isso de "abordagem cautelosa"
  // ---------------------------------------------------------------------
  {
    id: "anfetamina",
    nomeGenerico: "Anfetamina",
    nomesComerciais: ["Evekeo", "Dyanavel", "Adzenys"],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Efeitos cardiovasculares simpaticomiméticos; downregulation de receptores de catecolamina com uso crônico leva a resposta hemodinâmica/simpática atenuada à hipotensão intraoperatória (usar vasopressores de ação direta como epinefrina/fenilefrina; efedrina pode ter efeito pressor diminuído/ausente); potencial arritmogênico, risco de morte súbita e convulsões.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) diz que evidência atual sugere que anfetaminas NÃO precisam ser interrompidas antes de cirurgia com anestesia geral, que monitoramento de rotina é suficiente, e que se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações — a decisão deve ser individualizada com o anestesiologista responsável. Risco neurológico (AVC), reduz limiar convulsivo; uso concomitante ou dentro de 14 dias de IMAO (incluindo linezolida) pode causar crise hipertensiva/síndrome serotoninérgica; risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, fentanil, tramadol, metadona, tapentadol) e antieméticos serotoninérgicos (ondansetrona).",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },
  {
    id: "dextroanfetamina",
    nomeGenerico: "Dextroanfetamina",
    nomesComerciais: ["Dexedrine", "Dextrostat", "Liquadd", "ProCentra", "Zenzedi"],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Efeitos cardiovasculares simpaticomiméticos; downregulation de receptores de catecolamina com uso crônico leva a resposta hemodinâmica/simpática atenuada à hipotensão intraoperatória (usar vasopressores de ação direta como epinefrina/fenilefrina; efedrina pode ter efeito pressor diminuído/ausente); potencial arritmogênico, risco de morte súbita e convulsões.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) diz que evidência atual sugere que anfetaminas NÃO precisam ser interrompidas antes de cirurgia com anestesia geral, que monitoramento de rotina é suficiente, e que se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações — a decisão deve ser individualizada com o anestesiologista responsável. Risco neurológico (AVC), reduz limiar convulsivo; uso concomitante ou dentro de 14 dias de IMAO (incluindo linezolida) pode causar crise hipertensiva/síndrome serotoninérgica; risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, fentanil, tramadol, metadona, tapentadol) e antieméticos serotoninérgicos (ondansetrona).",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },
  {
    id: "dextroanfetamina_anfetamina",
    nomeGenerico: "Dextroanfetamina/anfetamina (sais mistos)",
    nomesComerciais: ["Adderall", "Mydayis"],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Efeitos cardiovasculares simpaticomiméticos; downregulation de receptores de catecolamina com uso crônico leva a resposta hemodinâmica/simpática atenuada à hipotensão intraoperatória (usar vasopressores de ação direta como epinefrina/fenilefrina; efedrina pode ter efeito pressor diminuído/ausente); potencial arritmogênico, risco de morte súbita e convulsões.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) diz que evidência atual sugere que anfetaminas NÃO precisam ser interrompidas antes de cirurgia com anestesia geral, que monitoramento de rotina é suficiente, e que se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações — a decisão deve ser individualizada com o anestesiologista responsável. Risco neurológico (AVC), reduz limiar convulsivo; uso concomitante ou dentro de 14 dias de IMAO (incluindo linezolida) pode causar crise hipertensiva/síndrome serotoninérgica; risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, fentanil, tramadol, metadona, tapentadol) e antieméticos serotoninérgicos (ondansetrona).",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },
  {
    id: "lisdexanfetamina",
    nomeGenerico: "Lisdexanfetamina",
    nomesComerciais: ["Vyvanse"],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Efeitos cardiovasculares simpaticomiméticos; downregulation de receptores de catecolamina com uso crônico leva a resposta hemodinâmica/simpática atenuada à hipotensão intraoperatória (usar vasopressores de ação direta como epinefrina/fenilefrina; efedrina pode ter efeito pressor diminuído/ausente); potencial arritmogênico, risco de morte súbita e convulsões.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) diz que evidência atual sugere que anfetaminas NÃO precisam ser interrompidas antes de cirurgia com anestesia geral, que monitoramento de rotina é suficiente, e que se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações — a decisão deve ser individualizada com o anestesiologista responsável. Risco neurológico (AVC), reduz limiar convulsivo; uso concomitante ou dentro de 14 dias de IMAO (incluindo linezolida) pode causar crise hipertensiva/síndrome serotoninérgica; risco de síndrome serotoninérgica com opioides serotoninérgicos (meperidina, fentanil, tramadol, metadona, tapentadol) e antieméticos serotoninérgicos (ondansetrona).",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },
  {
    id: "metilfenidato",
    nomeGenerico: "Metilfenidato",
    nomesComerciais: [
      "Adhansia",
      "Aptensio",
      "Concerta",
      "Jornay",
      "Metadate",
      "Methylin",
      "Quillivant",
      "Ritalin",
    ],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Anestésicos halogenados aumentam risco de aumento súbito de pressão arterial/frequência cardíaca; reduz limiar convulsivo; efeitos simpaticomiméticos análogos aos das anfetaminas.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) afirma que continuar metilfenidato pré-operatoriamente pode inclusive facilitar a emergência de anestesia com propofol, mas que a bula do metilfenidato ainda recomenda descontinuação no dia da cirurgia — daí a recomendação formal manter 'Hold on DOS'. Se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações; decisão deve ser individualizada com o anestesiologista responsável. Risco de síndrome serotoninérgica com opioides serotoninérgicos e antieméticos serotoninérgicos (ondansetrona).",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },
  {
    id: "dexmetilfenidato",
    nomeGenerico: "Dexmetilfenidato",
    nomesComerciais: ["Focalin"],
    classe: "psiquiatrico",
    subclasse: "Estimulante para TDAH (anfetamina e derivados)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Anestésicos halogenados aumentam risco de aumento súbito de pressão arterial/frequência cardíaca; reduz limiar convulsivo; efeitos simpaticomiméticos análogos aos das anfetaminas.",
    situacoesEspeciais:
      "IMPORTANTE — o artigo chama sua própria recomendação de 'Hold on DOS' de 'uma abordagem cautelosa' (a cautious one). O texto narrativo (pág. 18-19/414-415) afirma que continuar o metilfenidato/dexmetilfenidato pré-operatoriamente pode inclusive facilitar a emergência de anestesia com propofol, mas que a bula ainda recomenda descontinuação no dia da cirurgia. Se o paciente tomar o estimulante no DOS isso não requer cancelamento do caso na maioria das situações; decisão deve ser individualizada com o anestesiologista responsável. Risco de síndrome serotoninérgica com opioides serotoninérgicos e antieméticos serotoninérgicos.",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414; 13-14/409-410; 18-19/414-415",
  },

  // ---------------------------------------------------------------------
  // Não-estimulantes para TDAH (Tabela 6)
  // ---------------------------------------------------------------------
  {
    id: "atomoxetina",
    nomeGenerico: "Atomoxetina",
    nomesComerciais: ["Strattera"],
    classe: "psiquiatrico",
    subclasse: "Não-estimulante para TDAH",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional: "Efeitos cardiovasculares simpaticomiméticos.",
    situacoesEspeciais:
      "Cautela com uso concomitante de inibidores de CYP2D6 (bupropiona, TCAs, paroxetina, fluoxetina, desvenlafaxina) — aumenta risco de toxicidade da atomoxetina; uso concomitante com IMAO dentro de 2 semanas pode causar síndrome serotoninérgica.",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414",
  },
  {
    id: "guanfacina",
    nomeGenerico: "Guanfacina",
    nomesComerciais: ["Tenex", "Intuniv"],
    classe: "psiquiatrico",
    subclasse: "Não-estimulante para TDAH",
    regra: { tipo: "continuar" },
    racional:
      "Sem interações anestésicas conhecidas; agonista alfa-1 central usado também para tratamento de hipertensão.",
    situacoesEspeciais:
      "Nota: não aprovada pelo FDA para TDAH em adultos (apenas em crianças); aprovada pelo FDA para hipertensão em adultos. Efeitos colaterais incluem sedação, hipotensão, tontura, boca seca; sedação aditiva com depressores de SNC; inibidores de CYP3A4 (eritromicina, diltiazem, verapamil, claritromicina) diminuem clearance da guanfacina.",
    fonteReferenciaNumero: 6,
    fontePagina: "18/414",
  },
];
