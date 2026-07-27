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
  dataCirurgia: string | null; // formato ISO: AAAA-MM-DD
  pocusDisponivel: DisponibilidadePocus | null;
}

export type Decisao = "manter" | "suspender" | "indeterminado";

export interface Recomendacao {
  decisao: Decisao;
  medicamento: Medicamento | null;
  dataCorteSuspensao: string | null; // AAAA-MM-DD, último dia sem tomar a medicação
  diasSuspensao: number | null;
  fatoresIdentificados: string[];
  usouEstratificacaoDeRisco: boolean;
  motivoIndeterminado?: string;
  /**
   * true quando a decisão é "suspender" mas a data de corte já passou — ou seja,
   * não há mais tempo hábil para suspender o medicamento com segurança antes da
   * cirurgia. Nesse caso a recomendação de data de corte não deve ser exibida;
   * a UI deve mostrar a orientação de falha de suspensão em vez disso.
   */
  falhaJanelaSuspensao: boolean;
}
