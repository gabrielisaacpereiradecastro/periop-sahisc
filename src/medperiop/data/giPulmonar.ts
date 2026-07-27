import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Pfeifer KJ, Selzer A, Whinney CM, et al. Preoperative
 * Management of Gastrointestinal and Pulmonary Medications: SPAQI Consensus
 * Statement. Mayo Clin Proc. 2021;96(12):3158-3177.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/gi-pulmonar.md
 *
 * Notas de modelagem:
 * - `nomesComerciais` foi deixado como array vazio em todos os itens: o
 *   relatório-fonte não lista nomes comerciais (apenas nomes genéricos), e
 *   preencher marcas por conta própria violaria a regra de não inventar dado
 *   clínico/nominal não presente na extração verificada.
 * - Quando uma subclasse tem múltiplos fármacos nominais, cada fármaco vira
 *   um objeto `Farmaco` individual (mesma subclasse, mesma regra/racional),
 *   em vez de agrupar todos sob um único objeto.
 * - GLP-1 agonistas (liraglutida e afins) foram excluídos por decisão de
 *   escopo do app (coberto por app dedicado), apesar de o artigo-fonte os
 *   mencionar de forma resumida.
 */
export const FARMACOS_GI_PULMONAR: Farmaco[] = [
  // =========================================================================
  // PULMONAR (Tabela 1)
  // =========================================================================

  // --- Anticolinérgicos inalatórios ---
  ...(
    [
      ["ipratropio", "Ipratrópio"],
      ["tiotropio", "Tiotrópio"],
      ["aclidinio", "Aclidínio"],
      ["umeclidinio", "Umeclidínio"],
      ["revefenacina", "Revefenacina"],
      ["glicopirrolato_inalatorio", "Glicopirrolato inalatório"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Anticolinérgicos inalatórios",
    regra: { tipo: "continuar" as const },
    racional:
      "Bloqueiam receptores muscarínicos brônquicos, reduzindo broncoconstrição e secreção. Dois estudos mostraram menor taxa de complicações pulmonares pós-operatórias com uso pré-operatório de tiotrópio (isolado ou combinado com formoterol/budesonida).",
    situacoesEspeciais: "Mesmas instruções se fizer parte de um inalador combinado.",
    fonteReferenciaNumero: 4,
    fontePagina: "3159-3161",
  })),

  // --- Beta-2 agonistas inalatórios, curta ação ---
  ...(
    [
      ["albuterol", "Albuterol"],
      ["metaproterenol", "Metaproterenol"],
      ["levalbuterol", "Levalbuterol"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Beta-2 agonistas inalatórios, curta ação",
    regra: { tipo: "continuar" as const },
    racional:
      "Ativam AMPc, relaxando a musculatura lisa brônquica; sem evidência de eventos adversos perioperatórios específicos. Um ensaio randomizado em esofagectomia mostrou que salmeterol iniciado imediatamente antes da cirurgia associou-se a menor incidência de pneumonia.",
    situacoesEspeciais: "Mesmas instruções se fizer parte de um inalador combinado.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3162",
  })),

  // --- Beta-2 agonistas inalatórios, longa ação ---
  ...(
    [
      ["salmeterol", "Salmeterol"],
      ["formoterol", "Formoterol"],
      ["arformoterol", "Arformoterol"],
      ["indacaterol", "Indacaterol"],
      ["olodaterol", "Olodaterol"],
      ["vilanterol", "Vilanterol"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Beta-2 agonistas inalatórios, longa ação",
    regra: { tipo: "continuar" as const },
    racional:
      "Ativam AMPc, relaxando a musculatura lisa brônquica; sem evidência de eventos adversos perioperatórios específicos. Um ensaio randomizado em esofagectomia mostrou que salmeterol iniciado imediatamente antes da cirurgia associou-se a menor incidência de pneumonia.",
    situacoesEspeciais: "Mesmas instruções se fizer parte de um inalador combinado.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3162",
  })),

  // --- Corticosteroide inalatório ---
  ...(
    [
      ["fluticasona", "Fluticasona"],
      ["budesonida", "Budesonida"],
      ["mometasona", "Mometasona"],
      ["beclometasona", "Beclometasona"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Corticosteroide inalatório",
    regra: { tipo: "continuar" as const },
    racional:
      "Reduzem inflamação/hiper-reatividade das vias aéreas. Ao contrário do corticoide oral crônico, o impacto sistêmico do inalatório é baixo (exceto em doses muito altas); sem evidência de dano perioperatório e alguma evidência de benefício com uso pré-operatório.",
    situacoesEspeciais:
      "Mesmas instruções se fizer parte de um inalador combinado. Combinações (corticoide + beta-2 longa ação + anticolinérgico) seguem a mesma recomendação de continuar até o dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3163",
  })),

  // --- Teofilina ---
  {
    id: "teofilina",
    nomeGenerico: "Teofilina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Metilxantina oral",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Inibe fosfodiesterase (broncodilatação, possível efeito anti-inflamatório); janela terapêutica estreita, efeitos cardíacos adversos e múltiplas interações medicamentosas motivam a suspensão no dia da cirurgia. Não há literatura perioperatória específica — a recomendação é baseada no perfil de risco do fármaco, não em dado direto de desfecho cirúrgico.",
    situacoesEspeciais:
      "Considerar discutir com o prescritor se a terapia crônica ainda é necessária, dado o perfil de risco. Uso concomitante de ciprofloxacino, eritromicina, claritromicina, cimetidina, ranitidina, fluconazol, imipeném ou levofloxacino pode causar toxicidade por teofilina (náusea, vômito, palpitações, convulsões). Teofilina pode reduzir a efetividade de benzodiazepínicos e pancurônio.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3162",
  },

  // --- Roflumilaste ---
  {
    id: "roflumilaste",
    nomeGenerico: "Roflumilaste",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Inibidor de PDE-4",
    regra: { tipo: "continuar" },
    racional:
      "Inibe PDE-4, reduzindo mediadores inflamatórios; melhora função pulmonar e reduz exacerbações de DPOC. Sem literatura perioperatória específica, mas também sem eventos adversos graves que justifiquem suspensão.",
    situacoesEspeciais:
      "Uso concomitante com eritromicina, claritromicina, fluconazol ou cimetidina pode aumentar exposição/risco de toxicidade do roflumilaste.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3162",
  },

  // --- Modificadores de leucotrieno ---
  ...(
    [
      ["montelucaste", "Montelucaste"],
      ["zafirlucaste", "Zafirlucaste"],
      ["zileutona", "Zileutona"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Modificadores de leucotrieno",
    regra: { tipo: "continuar" as const },
    racional:
      "Bloqueiam inflamação mediada por leucotrienos; sem literatura perioperatória específica, mas o perfil de efeitos adversos não contraindica uso antes da cirurgia.",
    situacoesEspeciais:
      "Uso concomitante de zileutona com betabloqueadores pode aumentar significativamente o bloqueio beta-adrenérgico; uso concomitante de zileutona com amiodarona, claritromicina e fluconazol aumenta risco de toxicidade da zileutona.",
    fonteReferenciaNumero: 4,
    fontePagina: "3163",
  })),

  // --- N-acetilcisteína ---
  {
    id: "n_acetilcisteina",
    nomeGenerico: "N-acetilcisteína",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Mucolítico (uso em DPOC)",
    regra: { tipo: "continuar" },
    racional:
      "Baixa incidência de efeitos adversos graves e ausência de literatura perioperatória preocupante.",
    situacoesEspeciais:
      "Uso concomitante com nitroglicerina pode resultar em hipotensão acentuada e cefaleia aumentada.",
    fonteReferenciaNumero: 4,
    fontePagina: "3163",
  },

  // --- Anti-histamínicos H1, 1ª geração ---
  ...(
    [
      ["hidroxizina", "Hidroxizina"],
      ["dimenidrinato", "Dimenidrinato"],
      ["difenidramina", "Difenidramina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Anti-histamínicos H1, 1ª geração",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Atravessam a barreira hematoencefálica (sonolência) e têm efeito anticolinérgico — risco de contribuir para disfunção neurocognitiva pós-operatória/delirium.",
    situacoesEspeciais:
      "Apoiado em referências sobre risco anticolinérgico/delirium em idosos (Beers Criteria, escala de risco anticolinérgico). Os anti-histamínicos de 2ª geração (exceto cetirizina) podem ser mantidos no dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164",
  })),

  // --- Cetirizina (exceção dentro da 2ª geração) ---
  {
    id: "cetirizina",
    nomeGenerico: "Cetirizina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Anti-histamínicos H1, 2ª geração (exceção — penetração relevante no SNC)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Cetirizina é a única anti-histamínica de 2ª geração com penetração relevante no SNC, sendo tratada como exceção dentro do grupo de 2ª geração — mesma preocupação com disfunção neurocognitiva/delirium dos agentes de 1ª geração.",
    situacoesEspeciais:
      "As demais de 2ª geração (loratadina, levocetirizina, fexofenadina, desloratadina) podem ser mantidas no dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164",
  },

  // --- Anti-histamínicos H1, 2ª geração (demais) ---
  ...(
    [
      ["loratadina", "Loratadina"],
      ["levocetirizina", "Levocetirizina"],
      ["fexofenadina", "Fexofenadina"],
      ["desloratadina", "Desloratadina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Anti-histamínicos H1, 2ª geração",
    regra: { tipo: "continuar" as const },
    racional:
      "Não atravessam relevantemente a barreira hematoencefálica (diferente da 1ª geração e da cetirizina), sem o mesmo risco anticolinérgico/de delirium.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164",
  })),

  // --- Descongestionantes arilalquilamina ---
  ...(
    [
      ["fenilefrina", "Fenilefrina"],
      ["pseudoefedrina", "Pseudoefedrina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Descongestionante arilalquilamina",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Efeito simpatomimético pode elevar a pressão arterial; uso não crítico (sintomático) somado a potencial risco cardiovascular motiva suspensão no dia da cirurgia. Sem estudos perioperatórios específicos.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164",
  })),

  // --- Antifibróticos (fibrose pulmonar idiopática) ---
  ...(
    [
      ["nintedanibe", "Nintedanibe"],
      ["pirfenidona", "Pirfenidona"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antifibrótico (fibrose pulmonar idiopática)",
    regra: { tipo: "continuar" as const },
    racional:
      "Pirfenidona reduz proliferação de fibroblastos/formação de colágeno (risco de hepatotoxicidade, metabolização por CYP1A2); nintedanibe é inibidor de tirosina-quinase (risco de tromboembolismo arterial, hepatotoxicidade, sangramento). Preocupação teórica com cicatrização de ferida — um relato de caso de deiscência com nintedanibe pós-cirurgia cardíaca, mas outros estudos (inclusive em transplante pulmonar) não mostraram aumento de complicações de ferida; um estudo fase 2 de pirfenidona perioperatória em câncer de pulmão não mostrou aumento de sangramento/complicação de ferida, com redução de exacerbações de FPI.",
    situacoesEspeciais:
      "A decisão de continuar sem interrupção vale a pena discutir com o cirurgião, dado o potencial benefício antifibrótico versus a preocupação teórica (não confirmada) com cicatrização de ferida.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164-3165",
  })),

  // --- Hipertensão pulmonar: análogos de prostaciclina ---
  ...(
    [
      ["epoprostenol", "Epoprostenol (IV)"],
      ["iloprosta", "Iloprosta (IV ou inalatória)"],
      ["treprostinil", "Treprostinil (oral, IV, inalatório ou subcutâneo)"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Análogo de prostaciclina (hipertensão pulmonar)",
    regra: { tipo: "continuar" as const },
    racional:
      "Vasodilatação pulmonar via estimulação de adenilato ciclase. A interrupção é perigosa — pode levar a insuficiência cardíaca direita e morte por rebote de hipertensão pulmonar. Risco de sangramento aumentado por efeito antiplaquetário, especialmente com anticoagulantes/antiplaquetários concomitantes.",
    situacoesEspeciais:
      "Envolver o serviço de anestesiologia com bastante antecedência, especialmente se o paciente estiver em infusão contínua (necessidade de equipamento/treinamento específico). A otimização pré-operatória de hipertensão pulmonar exige colaboração com o especialista em HP e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3162-3163",
  })),

  // --- Selexipague ---
  {
    id: "selexipague",
    nomeGenerico: "Selexipague",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Agonista do receptor de prostaciclina, oral (hipertensão pulmonar)",
    regra: { tipo: "continuar" },
    racional:
      "Menor risco de descompensação cardiovascular abrupta na retirada (por ser oral, meia-vida ~6-11h) comparado aos análogos de prostaciclina IV/inalados, mas sua importância no controle da hipertensão pulmonar ainda justifica continuação perioperatória.",
    situacoesEspeciais:
      "A otimização pré-operatória de hipertensão pulmonar exige colaboração com o especialista em HP e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3163",
  },

  // --- Antagonistas do receptor de endotelina ---
  {
    id: "bosentana",
    nomeGenerico: "Bosentana",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antagonista do receptor de endotelina (hipertensão pulmonar)",
    regra: { tipo: "continuar" },
    racional:
      "Risco de hipertensão pulmonar rebote com descontinuação; podem causar retenção de líquido, edema, anemia.",
    situacoesEspeciais:
      "Indutor de CYP3A4 (reduz eficácia de opioides, podendo exigir doses maiores para controle da dor); interação com eritromicina, claritromicina, amiodarona, diltiazém, verapamil, itraconazol, fluconazol (aumentam níveis plasmáticos do antagonista de endotelina). Solicitar hemograma e provas de função hepática. A otimização pré-operatória exige colaboração com o especialista em HP e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3164",
  },
  {
    id: "macitentana",
    nomeGenerico: "Macitentana",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antagonista do receptor de endotelina (hipertensão pulmonar)",
    regra: { tipo: "continuar" },
    racional:
      "Risco de hipertensão pulmonar rebote com descontinuação; podem causar retenção de líquido, edema, anemia.",
    situacoesEspeciais:
      "Interação com eritromicina, claritromicina, amiodarona, diltiazém, verapamil, itraconazol, fluconazol (aumentam níveis plasmáticos do antagonista de endotelina). Solicitar hemograma e provas de função hepática. A otimização pré-operatória exige colaboração com o especialista em HP e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3164",
  },
  {
    id: "ambrisentana",
    nomeGenerico: "Ambrisentana",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antagonista do receptor de endotelina (hipertensão pulmonar)",
    regra: { tipo: "continuar" },
    racional:
      "Antagonista seletivo do receptor de endotelina A. Risco de hipertensão pulmonar rebote com descontinuação; podem causar retenção de líquido, edema, anemia.",
    situacoesEspeciais:
      "Solicitar hemograma. A otimização pré-operatória exige colaboração com o especialista em HP e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3160-3164",
  },

  // --- Inibidores de PDE-5 (dupla indicação: HP vs. urológica) ---
  ...(
    [
      ["sildenafila", "Sildenafila"],
      ["tadalafila", "Tadalafila"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Inibidor de PDE-5 (hipertensão pulmonar)",
    indicacoes: [
      {
        id: `${id}_hipertensao_pulmonar`,
        descricao: "Hipertensão pulmonar",
        regra: { tipo: "continuar" as const },
      },
      {
        id: `${id}_disfuncao_eretil_urologica`,
        descricao:
          "Indicação urológica (disfunção erétil) — manejo detalhado no artigo SPAQI de medicações endócrinas/urológicas",
        regra: { tipo: "suspender_periodo_fixo" as const, valor: 3, unidade: "dias" as const },
      },
    ],
    racional:
      "Menor risco de crise hipertensiva pulmonar com interrupção comparado a análogos de prostaciclina, mas a importância de manter a hipertensão pulmonar tratada motiva continuação quando essa é a indicação. Quando usado para disfunção erétil, o mesmo fármaco tem recomendação distinta (suspender 3 dias antes), detalhada em outro artigo SPAQI.",
    situacoesEspeciais:
      "Metabolizado por CYP3A4; uso concomitante com eritromicina, azitromicina, ciprofloxacino ou antifúngicos azólicos aumenta risco de hipotensão, cefaleia e alterações visuais. A decisão depende inteiramente da indicação de uso — o app deve perguntar a indicação, não assumir pelo nome do fármaco.",
    fonteReferenciaNumero: 4,
    fontePagina: "3163-3164",
  })),

  // --- Riociguate ---
  {
    id: "riociguate",
    nomeGenerico: "Riociguate",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Estimulador da guanilato ciclase solúvel (hipertensão pulmonar grupo 4)",
    regra: { tipo: "continuar" },
    racional:
      "Único fármaco aprovado para hipertensão pulmonar do grupo 4 (tromboembólica crônica). Em doses supraterapêuticas inibe função plaquetária, e sangramentos foram descritos; como não tem síndrome de retirada grave associada, a interrupção pode ser considerada em casos selecionados de risco hemorrágico cirúrgico particularmente alto — discutir com o cirurgião/proceduralista.",
    situacoesEspeciais:
      "Contraindicado com nitratos (risco de hipotensão grave); uso concomitante com claritromicina ou itraconazol aumenta níveis de riociguate e risco de hipotensão. Ausência de literatura perioperatória específica.",
    fonteReferenciaNumero: 4,
    fontePagina: "3164",
  },

  // =========================================================================
  // GASTROINTESTINAL (Tabela 2)
  // =========================================================================

  // --- Inibidores da bomba de prótons (IBP) ---
  ...(
    [
      ["pantoprazol", "Pantoprazol"],
      ["omeprazol", "Omeprazol"],
      ["lansoprazol", "Lansoprazol"],
      ["esomeprazol", "Esomeprazol"],
      ["dexlansoprazol", "Dexlansoprazol"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Inibidor da bomba de prótons (IBP)",
    regra: { tipo: "continuar" as const },
    racional:
      "Apesar de dados limitados sustentando a supressão ácida para prevenir aspiração relacionada à anestesia (a American Society of Anesthesiologists não recomenda bloqueio farmacológico rotineiro de ácido gástrico para esse fim), a continuação evita complicações da doença de base (úlcera péptica, DRGE).",
    situacoesEspeciais:
      "Metabolização extensa por CYP450 gera interações com varfarina, benzodiazepínicos e outros; IBP reduz eficácia antiplaquetária do clopidogrel. Apesar disso, não há dados sugerindo risco perioperatório específico que justifique suspensão. Complicações não estudadas especificamente no contexto cirúrgico incluem hipomagnesemia (risco arritmogênico) e má absorção de ferro/B12.",
    fonteReferenciaNumero: 4,
    fontePagina: "3165-3167",
  })),

  // --- Antagonistas H2 ---
  {
    id: "ranitidina",
    nomeGenerico: "Ranitidina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antagonista H2",
    regra: { tipo: "continuar" },
    racional:
      "Classe considerada geralmente segura no perioperatório; literatura antiga em cirurgia cardíaca sugeriu ausência de benefício em elevar pH gástrico e possível colonização gástrica associada a tendência de maior pneumonia nosocomial. Alguns autores postulam risco de efeitos centrais/delirium pós-operatório (dados limitados).",
    situacoesEspeciais:
      "Ranitidina foi retirada do mercado pelo FDA em abril de 2020 por contaminação com N-nitrosodimetilamina (NDMA) — nota histórica relevante, já refletida no artigo (2021). Ajuste renal necessário (redução de dose/intervalo se depuração de creatinina <50 mL/min); infusão rápida IV pode causar bradicardia, bloqueio cardíaco e prolongamento de QT (raro).",
    fonteReferenciaNumero: 4,
    fontePagina: "3165-3168",
  },
  {
    id: "famotidina",
    nomeGenerico: "Famotidina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antagonista H2",
    regra: { tipo: "continuar" },
    racional:
      "Classe considerada geralmente segura no perioperatório; literatura antiga em cirurgia cardíaca sugeriu ausência de benefício em elevar pH gástrico e possível colonização gástrica associada a tendência de maior pneumonia nosocomial. Alguns autores postulam risco de efeitos centrais/delirium pós-operatório (dados limitados).",
    situacoesEspeciais:
      "Famotidina prolonga o intervalo QT (risco de arritmia se combinada com outros prolongadores de QT). Ajuste renal necessário se depuração de creatinina <50 mL/min.",
    fonteReferenciaNumero: 4,
    fontePagina: "3165-3168",
  },

  // --- Antiácidos ---
  ...(
    [
      ["citrato_sodio", "Citrato de sódio"],
      ["trisilicato_magnesio", "Trisilicato de magnésio"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiácido não particulado",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Neutraliza ácido gástrico diretamente. A American Society of Anesthesiologists recomenda contra o uso rotineiro de antiácidos antes de cirurgia.",
    situacoesEspeciais:
      "Exceção: por ser não particulado, pode ser aceitável na manhã da cirurgia em pacientes com risco aumentado de aspiração pulmonar (esses agentes podem reduzir complicações relacionadas à aspiração nesse grupo). Definição de 'risco aumentado de aspiração' não é quantificada no artigo — remete à diretriz ASA de jejum pré-operatório (2017). Julgamento clínico do médico assistente.",
    fonteReferenciaNumero: 4,
    fontePagina: "3166-3168",
  })),
  ...(
    [
      ["hidroxido_aluminio", "Hidróxido de alumínio"],
      ["carbonato_calcio", "Carbonato de cálcio"],
      ["sucralfato", "Sucralfato"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiácido particulado",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Neutraliza ácido gástrico diretamente. A American Society of Anesthesiologists recomenda contra o uso rotineiro de antiácidos particulados antes de cirurgia — estão associados a maior risco/gravidade de eventos de aspiração caso ocorram.",
    situacoesEspeciais:
      "Diferente dos não particulados, não há exceção descrita para manutenção na manhã da cirurgia mesmo em pacientes de risco aumentado de aspiração.",
    fonteReferenciaNumero: 4,
    fontePagina: "3166-3168",
  })),

  // --- Antieméticos: antagonistas do receptor 5-HT3 ---
  ...(
    [
      ["ondansetrona", "Ondansetrona"],
      ["granisetrona", "Granisetrona"],
      ["dolasetrona", "Dolasetrona"],
      ["palonosetrona", "Palonosetrona"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiemético — antagonista do receptor 5-HT3",
    regra: { tipo: "continuar" as const },
    racional:
      "Bem tolerados, poucos efeitos adversos; bloqueiam receptores 5-HT3 na zona de gatilho quimiorreceptora central.",
    situacoesEspeciais:
      "Cautela com uso concomitante de medicações que prolongam QT (risco de torsades de pointes) ou com propriedades serotoninérgicas (risco de síndrome serotoninérgica).",
    fonteReferenciaNumero: 4,
    fontePagina: "3168-3169",
  })),

  // --- Antieméticos: antagonistas de dopamina ---
  ...(
    [
      ["prometazina", "Prometazina"],
      ["proclorperazina", "Proclorperazina"],
      ["droperidol", "Droperidol"],
      ["metoclopramida", "Metoclopramida"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiemético — antagonista de dopamina",
    regra: { tipo: "continuar" as const },
    racional:
      "Dados disponíveis sugerem segurança perioperatória; efeito antidopaminérgico pode causar sintomas extrapiramidais, síndrome neuroléptica maligna e discinesia tardia (uso prolongado); podem prolongar o intervalo QT.",
    situacoesEspeciais:
      "Recomendação de continuar é condicionada a NÃO haver preocupação com prolongamento significativo de QT — o artigo não define um corte numérico de QTc para essa exceção; é julgamento clínico do médico assistente. Metoclopramida também é usada como pró-cinético gástrico/intestinal.",
    fonteReferenciaNumero: 4,
    fontePagina: "3169",
  })),

  // --- Aprepitanto ---
  {
    id: "aprepitanto",
    nomeGenerico: "Aprepitanto",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Antiemético — antagonista de neurocinina-1",
    regra: { tipo: "continuar" },
    racional:
      "Antiemético oral efetivo, considerado seguro e eficaz no contexto perioperatório.",
    situacoesEspeciais:
      "Uso concomitante com opioides, midazolam, alprazolam ou triazolam pode aumentar risco de depressão respiratória/toxicidade por opioide (menos preocupante se dose única). É substrato, inibidor e indutor de CYP3A4, e indutor de CYP2C9 (interações relevantes se uso contínuo). Reduz eficácia de contraceptivos orais por até 28 dias — orientar método alternativo por 1 mês após a última dose.",
    fonteReferenciaNumero: 4,
    fontePagina: "3169",
  },

  // --- Laxantes ---
  ...(
    [
      ["sene", "Sene (sennosídeos)"],
      ["polietilenoglicol_3350", "Polietilenoglicol (PEG 3350)"],
      ["bisacodil", "Bisacodil"],
      ["citrato_hidroxido_magnesio_laxante", "Citrato/hidróxido de magnésio (laxante)"],
      ["lactulose", "Lactulose"],
      ["docusato_sodio", "Docusato de sódio"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Laxante",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Sem contraindicação pré-operatória específica; a suspensão no dia da cirurgia visa evitar risco de defecação na sala de operação e disrupção da motilidade intestinal, especialmente antes de cirurgia intestinal/abdominal.",
    situacoesEspeciais: "Atenção redobrada antes de cirurgia de intestino (bowel surgery).",
    fonteReferenciaNumero: 4,
    fontePagina: "3172",
  })),

  // --- Antidiarreicos ---
  ...(
    [
      ["loperamida", "Loperamida"],
      ["difenoxilato_atropina", "Difenoxilato/atropina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antidiarreico",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Agonismo de receptor opioide (loperamida) ou atividade anticolinérgica (atropina/difenoxilato) controlam a diarreia; geralmente seguros, mas loperamida em doses excessivas pode causar arritmia/cardiotoxicidade/depressão do SNC ou respiratória, e atropina tem efeitos anticolinérgicos.",
    situacoesEspeciais:
      "Suspensão no dia da cirurgia motivada por risco de agonismo opioide e efeitos anticolinérgicos residuais; meia-vida curta permite retomada rápida no pós-operatório. Revisão sistemática (Eastern Association for the Surgery of Trauma) recomenda uso condicional em pacientes críticos.",
    fonteReferenciaNumero: 4,
    fontePagina: "3171",
  })),

  // --- Anticolinérgicos/antiespasmódicos gastrointestinais ---
  ...(
    [
      ["diciclomina", "Diciclomina"],
      ["hiosciamina", "Hiosciamina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Anticolinérgico/antiespasmódico gastrointestinal",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Retardam o trânsito intestinal e reduzem secreções gástrica/de via aérea; efeitos adversos relevantes (taquiarritmias, hipotensão, retenção urinária, alteração de mentação) e uso desencorajado em idosos. Fortemente implicados em disfunção neurocognitiva perioperatória; a American Society of Anesthesiologists' Brain Health Initiative recomenda evitá-los no contexto cirúrgico.",
    situacoesEspeciais:
      "Reavaliar a necessidade de longo prazo (especialmente em idosos). Se absolutamente necessário para controle de secreção de via aérea que possa afetar o manejo da via aérea, a continuação é razoável — julgamento do médico assistente.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3171",
  })),

  // --- Doença inflamatória intestinal: 5-ASA ---
  ...(
    [
      ["mesalamina", "Mesalamina"],
      ["balsalazida", "Balsalazida"],
      ["olsalazina", "Olsalazina"],
      ["sulfassalazina", "Sulfassalazina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "5-ácido aminossalicílico (5-ASA) — doença inflamatória intestinal",
    condicaoClinica: {
      pergunta: "Taxa de filtração glomerular (TFG) menor que 50 mL/min?",
      regraSeSim: { tipo: "suspender_dia_cirurgia" as const },
      regraSeNao: { tipo: "continuar" as const },
    },
    racional:
      "Ação predominantemente luminal (efeitos sistêmicos mínimos). Apesar da preocupação de muitos clínicos com risco de sangramento por inibição plaquetária, esses agentes são considerados seguros no perioperatório. Uma revisão narrativa de 2011 recomendou suspender 1 dia antes e retomar 3 dias depois em caso de função renal comprometida; com função renal normal, isso não é necessário.",
    situacoesEspeciais:
      "Efeitos adversos raros incluem reações de hipersensibilidade, supressão de medula óssea, pneumonite, pancreatite, anemia hemolítica.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170",
  })),

  // =========================================================================
  // DOENÇA INFLAMATÓRIA INTESTINAL — IMUNOMODULADORES (Tabela 3)
  // =========================================================================

  // --- Análogos de purina ---
  ...(
    [
      ["mercaptopurina", "6-mercaptopurina"],
      ["azatioprina", "Azatioprina"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Análogo de purina — imunomodulador (DII)",
    regra: { tipo: "continuar" as const },
    racional:
      "Estudos não mostraram aumento significativo de complicações pós-operatórias; diretriz ACR/AAHKS (artroplastia) recomenda continuar azatioprina sem interrupção em pacientes com lúpus sistêmico grave.",
    situacoesEspeciais: "Consultar cirurgião e prescritor antes da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3173",
  })),

  // --- Metotrexato ---
  {
    id: "metotrexato_dii",
    nomeGenerico: "Metotrexato",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Imunomodulador — doença inflamatória intestinal",
    regra: { tipo: "continuar" },
    racional:
      "Estudos até o momento não identificaram associação entre uso pré-operatório de metotrexato e aumento de complicações perioperatórias (dado extrapolado também de artrite reumatoide).",
    situacoesEspeciais: "Consultar cirurgião e prescritor antes da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3173",
  },

  // --- Inibidores de TNF ---
  ...(
    [
      ["infliximabe", "Infliximabe (e biosimilares)"],
      ["adalimumabe", "Adalimumabe (e biosimilares)"],
      ["golimumabe", "Golimumabe"],
      ["certolizumabe", "Certolizumabe"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Inibidor de TNF — imunomodulador biológico (DII)",
    regra: { tipo: "suspender_intervalo_dose" as const, numeroIntervalos: 1 },
    racional:
      "Aumentam risco de infecção e de certas neoplasias malignas; a interrupção pode causar perda de eficácia por desenvolvimento de anticorpos. A maioria dos dados publicados (heterogêneos, conflitantes) não sugere aumento de complicações pós-operatórias, exceto em combinação com outro imunomodulador. Resultados preliminares do estudo PUCCINI sugerem que continuar não aumenta risco de infecção, mas o artigo considera prematuro recomendar continuação rotineira até publicação definitiva. Diretriz ACR/AAHKS (artrite inflamatória/artroplastia) recomenda não operar durante um ciclo completo de dose após a última administração.",
    situacoesEspeciais:
      "Consultar cirurgião e prescritor — dados conflitantes. Exemplo do artigo: se tomado a cada 4 semanas, agendar a cirurgia 5 semanas após a última dose (o app precisa da frequência de dose do paciente para calcular a data). Se usado para profilaxia de rejeição de transplante de órgão sólido (não DII), a recomendação do artigo é continuar incluindo o dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3173-3174",
  })),

  // --- Ustekinumabe ---
  {
    id: "ustekinumabe",
    nomeGenerico: "Ustekinumabe",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Imunomodulador biológico — anti-IL-12/23 (DII)",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "Dados perioperatórios específicos limitados; diretriz ACR/AAHKS recomenda suspender ustekinumabe por 1 ciclo de dose antes da cirurgia.",
    situacoesEspeciais:
      "Consultar cirurgião e prescritor. Exemplo do artigo: dose a cada 4 semanas → cirurgia 5 semanas após a última dose (depende da posologia do paciente). Se usado para profilaxia de rejeição de transplante de órgão sólido, a recomendação do artigo é continuar incluindo o dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3174",
  },

  // --- Natalizumabe ---
  {
    id: "natalizumabe",
    nomeGenerico: "Natalizumabe",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Imunomodulador biológico — anti-integrina alfa-4 (DII)",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional: "Dados perioperatórios específicos limitados.",
    situacoesEspeciais:
      "Consultar cirurgião e prescritor. Exemplo do artigo: dose a cada 4 semanas → cirurgia 5 semanas após a última dose (depende da posologia do paciente). Se usado para profilaxia de rejeição de transplante de órgão sólido, a recomendação do artigo é continuar incluindo o dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3174",
  },

  // --- Vedolizumabe ---
  {
    id: "vedolizumabe",
    nomeGenerico: "Vedolizumabe",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Imunomodulador biológico — anti-integrina alfa-4-beta-7, gut-specific (DII)",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional:
      "É 'gut specific' (ação seletiva no trato gastrointestinal). Um estudo retrospectivo unicêntrico com análise multivariada encontrou aumento de infecção pós-operatória associado a terapia biológica apenas quando combinada com outra imunossupressão. Outros estudos não encontraram associação entre vedolizumabe isolado e complicações pós-operatórias aumentadas.",
    situacoesEspeciais:
      "Continuação perioperatória pode ser razoável para cirurgia NÃO abdominal, dado o mecanismo seletivo ao trato GI. Consultar cirurgião e prescritor. Exemplo do artigo: dose a cada 4 semanas → cirurgia 5 semanas após a última dose (depende da posologia do paciente). Se usado para profilaxia de rejeição de transplante de órgão sólido, a recomendação do artigo é continuar incluindo o dia da cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3174",
  },

  // --- Ozanimode ---
  {
    id: "ozanimode",
    nomeGenerico: "Ozanimode",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Modulador do receptor de esfingosina-1-fosfato — imunomodulador (DII)",
    regra: { tipo: "suspender_periodo_fixo", valor: 60, unidade: "dias" },
    racional:
      "Associado a linfopenia, maior risco de infecções, bradiarritmias e atrasos de condução atrioventricular; contraindicado com inibidores da MAO. Meia-vida dos metabólitos ativos ~11 dias — a recomendação de 60 dias corresponde a aproximadamente 5 meias-vidas para garantir depuração adequada antes da cirurgia, caso a interrupção seja escolhida. Não há dados de segurança perioperatória disponíveis; recomendação baseada em efeito imunossupressor e farmacocinética, não em desfecho cirúrgico direto.",
    situacoesEspeciais: "Consultar cirurgião e prescritor.",
    fonteReferenciaNumero: 4,
    fontePagina: "3174-3175",
  },

  // --- Tofacitinibe ---
  {
    id: "tofacitinibe",
    nomeGenerico: "Tofacitinibe",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Inibidor de Janus quinase (JAK) — imunomodulador (DII)",
    regra: { tipo: "suspender_periodo_fixo", valor: 7, unidade: "dias" },
    racional:
      "Inibidor de Janus quinase oral, meia-vida curta, dosagem 2x/dia; sem literatura específica de segurança cirúrgica, mas tem alerta de caixa preta do FDA para risco aumentado de trombose, relevante no contexto pós-operatório. Diretriz ACR/AAHKS recomenda suspender por 7 dias antes da cirurgia.",
    situacoesEspeciais: "Consultar cirurgião e prescritor.",
    fonteReferenciaNumero: 4,
    fontePagina: "3174",
  },

  // =========================================================================
  // ANTIVIRAIS PARA HEPATITE B E C (Tabela 2)
  // =========================================================================

  // --- Inibidores da transcriptase reversa anti-HBV ---
  ...(
    [
      ["entecavir", "Entecavir"],
      ["tenofovir", "Tenofovir"],
      ["lamivudina", "Lamivudina"],
      ["adefovir", "Adefovir"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Inibidor da transcriptase reversa — antiviral anti-HBV",
    regra: { tipo: "continuar" as const },
    racional:
      "Suprimem a replicação viral mas não eliminam completamente o vírus (uso geralmente indefinido); recorrência de HBV por suspensão temporária é improvável. Alguma evidência sugere benefício do uso pré-operatório de entecavir em pacientes submetidos a ressecção de carcinoma hepatocelular associado a HBV.",
    situacoesEspeciais:
      "Consultar o prescritor; avaliar função renal e hepática antes da cirurgia (nefrotoxicidade/hepatotoxicidade). O clínico perioperatório deve discutir o manejo com o hepatologista/gastroenterologista do paciente, incluindo se a doença hepática está suficientemente otimizada para tolerar a cirurgia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3169",
  })),

  // --- Interferons peguilados ---
  ...(
    [
      ["interferon_alfa2a_peguilado", "Interferon alfa-2a peguilado"],
      ["interferon_alfa2b_peguilado", "Interferon alfa-2b peguilado"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Interferon peguilado — antiviral para hepatite viral",
    regra: { tipo: "suspender_periodo_fixo" as const, valor: 7, unidade: "dias" as const },
    racional:
      "Mecanismo imunorregulatório complexo; efeitos adversos bem documentados e comuns (imunológicos, hematológicos, metabólicos, neuropsiquiátricos, pulmonares); interações no metabolismo de opioides e lidocaína levantam preocupação para uso perioperatório. Uso é hoje raro (a maioria dos pacientes usa antivirais orais mais modernos).",
    situacoesEspeciais:
      "O artigo cita uma faixa de '1-2 semanas' (7-14 dias) antes da cirurgia — usamos o limite inferior (7 dias) como valor padrão conservador; considerar até 14 dias conforme julgamento clínico. Consultar o prescritor e o hepatologista/gastroenterologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3169-3170",
  })),

  // --- Ribavirina ---
  {
    id: "ribavirina",
    nomeGenerico: "Ribavirina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Análogo nucleosídeo — antiviral anti-HCV",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Análogo nucleosídeo oral; precisa ser tomada com alimento, o que geralmente não é possível em jejum pré-operatório — daí a suspensão apenas na manhã da cirurgia. Efeitos adversos potencialmente graves incluem anemia e doença cardiovascular (hipertensão, infarto do miocárdio). Sem diretrizes/literatura baseada em evidência para manejo perioperatório — recomendação baseada em raciocínio farmacológico.",
    situacoesEspeciais:
      "Se hemoglobina não tiver sido verificada recentemente, checar antes da cirurgia (risco de anemia). Discutir manejo com o hepatologista/gastroenterologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170",
  },

  // --- Outros antivirais orais anti-HCV ---
  ...(
    [
      ["sofosbuvir", "Sofosbuvir"],
      ["ledipasvir_sofosbuvir", "Ledipasvir/sofosbuvir"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiviral oral anti-HCV (ação direta)",
    regra: { tipo: "continuar" as const },
    racional:
      "Melhor tolerados que interferons, mas com interações medicamentosas relevantes via citocromo P450 — sofosbuvir interage com amiodarona, IBP, antivirais de HIV, anticonvulsivantes, antimicobacterianos.",
    situacoesEspeciais:
      "Discutir com gastroenterologista se é ideal adiar a cirurgia até conclusão da terapia. Coadministração com amiodarona pode causar bradicardia significativa.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3171",
  })),
  ...(
    [
      ["sofosbuvir_velpatasvir", "Sofosbuvir/velpatasvir"],
      ["glecaprevir_pibrentasvir", "Glecaprevir/pibrentasvir"],
      [
        "dasabuvir_ombitasvir_paritaprevir_ritonavir",
        "Dasabuvir/ombitasvir/paritaprevir/ritonavir",
      ],
      ["elbasvir_grazoprevir", "Elbasvir/grazoprevir"],
      ["sofosbuvir_velpatasvir_voxilaprevir", "Sofosbuvir/velpatasvir/voxilaprevir"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Antiviral oral anti-HCV (ação direta)",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Melhor tolerados que interferons, mas precisam ser tomados com alimento — daí a suspensão apenas na manhã da cirurgia. Interações medicamentosas relevantes via citocromo P450 (ex.: elbasvir/grazoprevir interage com opioides, antibióticos, benzodiazepínicos, antieméticos).",
    situacoesEspeciais:
      "Discutir com gastroenterologista se é ideal adiar a cirurgia até conclusão da terapia.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3171",
  })),

  // =========================================================================
  // OUTROS GI DE MENOR PRIORIDADE (mencionados no artigo)
  // =========================================================================

  // --- Agentes solubilizadores de cálculo biliar ---
  ...(
    [
      ["ursodiol", "Ursodiol"],
      ["acido_quenodesoxicolico", "Ácido quenodesoxicólico"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Agente solubilizador de cálculo biliar",
    regra: { tipo: "suspender_dia_cirurgia" as const },
    racional:
      "Tomados sem alimento podem causar náusea; o benefício é de longo prazo, não agudo, então a suspensão de uma única dose no dia da cirurgia não compromete o tratamento.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3172",
  })),

  // --- Enzimas pancreáticas ---
  {
    id: "pancrelipase",
    nomeGenerico: "Pancrelipase (enzimas pancreáticas)",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Enzima pancreática",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional: "Geralmente desnecessárias durante o jejum pré-operatório.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3172",
  },

  // --- Lubiprostona ---
  {
    id: "lubiprostona",
    nomeGenerico: "Lubiprostona",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Agente pró-secretório intestinal",
    regra: { tipo: "continuar" },
    racional: "Pouca literatura perioperatória, sem sinal de risco que justifique suspensão.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3172",
  },

  // --- Agonistas da guanilato ciclase C ---
  ...(
    [
      ["linaclotida", "Linaclotida"],
      ["plecanatida", "Plecanatida"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Agonista da guanilato ciclase C",
    regra: { tipo: "continuar" as const },
    racional: "Sem sinal de risco perioperatório que justifique suspensão.",
    situacoesEspeciais: "Evitar em obstrução intestinal ou risco de perfuração intestinal.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3172",
  })),

  // --- Moduladores serotoninérgicos neuroentéricos ---
  ...(
    [
      ["tegaserode", "Tegaserode"],
      ["alosetrona", "Alosetrona"],
      ["prucaloprida", "Prucaloprida"],
    ] as const
  ).map(([id, nome]) => ({
    id,
    nomeGenerico: nome,
    nomesComerciais: [],
    classe: "gi-pulmonar" as const,
    subclasse: "Modulador serotoninérgico neuroentérico",
    regra: { tipo: "continuar" as const },
    racional:
      "Sem sinal de risco perioperatório que justifique suspensão. Há dado de que prucaloprida pré-operatória pode reduzir inflamação intestinal e encurtar íleo pós-operatório.",
    fonteReferenciaNumero: 4,
    fontePagina: "3170-3172",
  })),

  // --- Medicações para perda de peso (GLP-1/liraglutida excluídos por escopo) ---
  {
    id: "fentermina",
    nomeGenerico: "Fentermina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Medicação para perda de peso (simpatomimético)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Efeito simpatomimético — o artigo recomenda suspender no mínimo 4 dias antes da cirurgia.",
    situacoesEspeciais: "O artigo especifica 'no mínimo' 4 dias (não um teto fixo).",
    fonteReferenciaNumero: 4,
    fontePagina: "3175-3176",
  },
  {
    id: "fentermina_topiramato",
    nomeGenerico: "Fentermina/topiramato",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Medicação para perda de peso (simpatomimético + anticonvulsivante)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Efeito simpatomimético do componente fentermina — o artigo recomenda suspender no mínimo 4 dias antes da cirurgia.",
    situacoesEspeciais:
      "O artigo especifica 'no mínimo' 4 dias. Considerar desmame gradual do topiramato, ou manter o topiramato isoladamente (sem a fentermina) se a suspensão abrupta do anticonvulsivante for uma preocupação clínica.",
    fonteReferenciaNumero: 4,
    fontePagina: "3175-3176",
  },
  {
    id: "lisdexanfetamina",
    nomeGenerico: "Lisdexanfetamina",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Medicação para perda de peso / estimulante",
    condicaoClinica: {
      pergunta: "Paciente com alto risco de recaída de transtorno de compulsão alimentar (binge eating)?",
      regraSeSim: { tipo: "suspender_dia_cirurgia" },
      regraSeNao: { tipo: "suspender_periodo_fixo", valor: 72, unidade: "horas" },
    },
    racional:
      "Estimulante do SNC; recomendação padrão é suspender 72h antes da cirurgia. Em pacientes de alto risco de recaída de compulsão alimentar, pode ser razoável manter até a manhã da cirurgia, suspendendo apenas a dose do dia (DOS).",
    situacoesEspeciais: "Discutir com o prescritor e o anestesiologista.",
    fonteReferenciaNumero: 4,
    fontePagina: "3175-3176",
  },
  {
    id: "orlistate",
    nomeGenerico: "Orlistate",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Medicação para perda de peso (inibidor de lipase)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional: "Ação local no trato GI dependente da ingestão de gordura na dieta; sem sentido em jejum.",
    fonteReferenciaNumero: 4,
    fontePagina: "3175-3176",
  },
  {
    id: "bupropiona_naltrexona",
    nomeGenerico: "Bupropiona/naltrexona",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Medicação para perda de peso (bupropiona/naltrexona)",
    condicaoClinica: {
      pergunta: "Uso de opioides é esperado no período perioperatório?",
      regraSeSim: { tipo: "suspender_periodo_fixo", valor: 72, unidade: "horas" },
      regraSeNao: { tipo: "continuar" },
    },
    racional:
      "Naltrexona é antagonista opioide — se opioides forem esperados no perioperatório (para controle de dor), a combinação deve ser suspensa 72h antes para não bloquear a analgesia opioide.",
    fonteReferenciaNumero: 4,
    fontePagina: "3175-3176",
  },
];
