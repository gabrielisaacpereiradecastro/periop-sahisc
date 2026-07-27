import { FatorRisco } from "@/glp1/types";

/**
 * Passo 2 do fluxograma — caixas "Fatores relacionados ao paciente"
 * e "Medicações associadas".
 */
export const FATORES_PACIENTE: FatorRisco[] = [
  {
    id: "hba1c_alto",
    descricao: "HbA1c acima de 8% ou controle glicêmico inadequado",
  },
  {
    id: "dm_longa_ou_gastroparesia",
    descricao: "Diabetes há mais de 8 anos, ou gastroparesia conhecida",
  },
  {
    id: "cirurgia_gi_previa",
    descricao: "Cirurgia gastrointestinal prévia (incluindo cirurgia bariátrica)",
  },
  {
    id: "eda_residuo",
    descricao: "Endoscopia digestiva prévia com resíduo gástrico documentado",
  },
  {
    id: "obstrucao_gi",
    descricao: "Obstrução gastrointestinal suspeita ou documentada",
  },
  {
    id: "imc_acalasia_disfagia",
    descricao: "IMC igual ou maior que 40, acalasia, ou dificuldade de deglutição (disfagia)",
  },
  {
    id: "opioide_cronico",
    descricao: "Uso crônico de opioides",
  },
  {
    id: "medicacao_lentifica_esvaziamento",
    descricao:
      "Uso de anticolinérgicos, antidepressivos tricíclicos ou bloqueadores de canais de cálcio",
  },
  {
    id: "idoso_doenca_neurologica",
    descricao: "Idade avançada com doença neurológica limitante",
  },
];

/**
 * Passo 2 do fluxograma — caixa "Fatores relacionados à técnica anestésica".
 * Costuma ser mais conhecida pela equipe médica, mas também é perguntada
 * ao paciente de forma simplificada (com opção "não sei").
 */
export const FATORES_TECNICA_ANESTESICA: FatorRisco[] = [
  {
    id: "sedacao_prolongada",
    descricao: "Sedação prolongada, com duração maior que 30 minutos",
  },
  {
    id: "sedacao_sem_via_aerea_avancada",
    descricao:
      "Sedação moderada ou profunda sem uso de tubo orotraqueal ou outro dispositivo avançado de via aérea",
  },
  {
    id: "decubito_ventral_ou_cabeca_imobilizada",
    descricao:
      "Cirurgia com paciente deitado de bruços (decúbito ventral) ou com a cabeça imobilizada (ex.: cirurgia de coluna, neurocirurgia)",
  },
  {
    id: "via_aerea_dificil",
    descricao: "Via aérea difícil já identificada em avaliação prévia",
  },
];
