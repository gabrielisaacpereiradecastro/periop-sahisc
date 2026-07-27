export interface ItemChecklist {
  id: string;
  descricao: string;
}

export type ClasseTerapeutica =
  | "cardiovascular"
  | "endocrino"
  | "gi-pulmonar"
  | "neurologico"
  | "psiquiatrico"
  | "reumatologico-hiv"
  | "analgesicos";

export const CLASSES_TERAPEUTICAS: { valor: ClasseTerapeutica; rotulo: string }[] = [
  { valor: "cardiovascular", rotulo: "Cardiovascular" },
  { valor: "endocrino", rotulo: "Endócrino / hormonal / urológico (inclui diabetes)" },
  { valor: "gi-pulmonar", rotulo: "Gastrointestinal / pulmonar" },
  { valor: "neurologico", rotulo: "Neurológico" },
  { valor: "psiquiatrico", rotulo: "Psiquiátrico" },
  { valor: "reumatologico-hiv", rotulo: "Reumatológico / HIV" },
  { valor: "analgesicos", rotulo: "Analgésicos (opioides, não-opioides, AINEs)" },
];

/**
 * Formas de recomendação encontradas nos consensus statements SPAQI. Não é
 * um único formato ("suspender N dias") porque o próprio conjunto de artigos
 * usa formas estruturalmente diferentes — ver docs/spaqi-extraction/*.md.
 */
export type TipoRecomendacao =
  | "continuar"
  /** Terapia crônica mantida; só a dose da manhã da cirurgia (DOS) é pulada. */
  | "suspender_dia_cirurgia"
  /** Suspender por um período fixo antes da cirurgia (ex.: SGLT2i 3 dias, AINE por meia-vida). */
  | "suspender_periodo_fixo"
  /** Suspender por N intervalos de dose do próprio fármaco — depende da posologia
   * do paciente, não é um número de dias universal (ex.: biológicos/DMARDs). */
  | "suspender_intervalo_dose"
  /** Não é suspensão — é ajuste de dose (ex.: insulina). */
  | "reduzir_dose"
  /** O próprio artigo não dá um número fixo; decisão compartilhada com o
   * especialista prescritor. Nunca deve ser preenchido com um valor inventado. */
  | "individualizado";

export type UnidadeTempo = "horas" | "dias";

export interface RegraRecomendacao {
  tipo: TipoRecomendacao;
  /** Usado só quando tipo === "suspender_periodo_fixo". */
  valor?: number;
  unidade?: UnidadeTempo;
  /** Usado só quando tipo === "suspender_intervalo_dose" (ex.: 1 intervalo). */
  numeroIntervalos?: number;
  /** Usado só quando tipo === "reduzir_dose" — texto livre, porque o artigo dá
   * faixas (ex.: "60%-80% da dose usual"), não um percentual único. */
  ajusteDose?: string;
  /** Usado só quando tipo === "individualizado" — por que não há número fixo e
   * o que considerar na decisão compartilhada. */
  motivoIndividualizado?: string;
}

export interface Indicacao {
  id: string;
  descricao: string;
  regra: RegraRecomendacao;
}

/**
 * Exceção condicional de sim/não que muda a regra (ex.: metformina — GFR>50 E
 * cirurgia ambulatorial com no máximo 1 refeição omitida permite não suspender).
 * Distinto de `indicacoes`: aqui o fármaco tem UM uso, mas a regra muda conforme
 * uma condição clínica objetiva declarada pelo usuário.
 */
export interface CondicaoClinica {
  pergunta: string;
  regraSeSim: RegraRecomendacao;
  regraSeNao: RegraRecomendacao;
}

export interface Farmaco {
  id: string;
  nomeGenerico: string;
  nomesComerciais: string[];
  classe: ClasseTerapeutica;
  subclasse: string;
  /** Exatamente uma destas três fontes de regra deve estar preenchida. */
  regra?: RegraRecomendacao;
  indicacoes?: Indicacao[];
  condicaoClinica?: CondicaoClinica;
  racional: string;
  situacoesEspeciais?: string;
  /** Aponta para REFERENCIAS em src/data/referencias.ts (1 a 8). */
  fonteReferenciaNumero: number;
  fontePagina?: string;
}

export interface RespostasQuestionario {
  classe: ClasseTerapeutica | null;
  farmacoId: string | null;
  /** Só relevante se o fármaco tiver `indicacoes`. */
  indicacaoId: string | null;
  /** Só relevante se o fármaco tiver `condicaoClinica`. */
  condicaoAtendida: "sim" | "nao" | null;
  /** Só relevante se a regra resolvida for "suspender_intervalo_dose" — a cada
   * quantos dias o paciente toma a dose (ex.: 28 para "a cada 4 semanas"). */
  frequenciaDoseDias: number | null;
  /** AAAA-MM-DD */
  dataCirurgia: string | null;
}

export type DecisaoFinal =
  | "continuar"
  | "suspender_dia_cirurgia"
  | "suspender_com_data"
  | "reduzir_dose"
  | "individualizado"
  | "indeterminado";

export interface Recomendacao {
  decisao: DecisaoFinal;
  farmaco: Farmaco | null;
  indicacao: Indicacao | null;
  regraAplicada: RegraRecomendacao | null;
  /** Calculada só quando decisao === "suspender_com_data". AAAA-MM-DD. */
  dataCorteSuspensao: string | null;
  falhaJanelaSuspensao: boolean;
  motivoIndeterminado?: string;
}
