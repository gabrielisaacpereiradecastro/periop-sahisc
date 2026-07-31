export type DuracaoClasse = "curta" | "longa";

export interface Medicamento {
  id: string;
  nomeGenerico: string;
  nomesComerciais: string[];
  classe: DuracaoClasse;
  diasSuspensao: number;
}

export type RespostaSimNao = "sim" | "nao" | null;

export type DisponibilidadePocus = "sim" | "nao" | "nao_sei";

export interface FatorRisco {
  id: string;
  descricao: string;
}

export interface RespostasQuestionario {
  medicamentoId: string | null;
  usoMenosDe12Semanas: RespostaSimNao;
  aumentoDoseUltimos3Meses: RespostaSimNao;
  usoIrregular: RespostaSimNao;
  sintomasGI: RespostaSimNao;
  fatoresPaciente: string[];
  fatoresTecnicaAnestesica: string[];
  pocusDisponivel: DisponibilidadePocus | null;
}

export type Decisao = "manter" | "suspender" | "indeterminado";

export interface Recomendacao {
  decisao: Decisao;
  medicamento: Medicamento | null;
  /** Período relativo (ex.: "suspender 3 dias antes"). O app não pede data
   * de cirurgia/procedimento — nunca é calculada uma data de corte. */
  diasSuspensao: number | null;
  fatoresIdentificados: string[];
  usouEstratificacaoDeRisco: boolean;
  motivoIndeterminado?: string;
}
