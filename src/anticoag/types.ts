export interface ItemChecklist {
  id: string;
  descricao: string;
}

export type ClasseMedicamento = "doac" | "hnf" | "hbpm" | "antiplaquetario";

export type NivelDose = "baixa" | "alta";

/**
 * Uma indicação de uso do medicamento, com o texto completo (não resumido)
 * da Tabela 1 do guideline ASRA, e o nível de dose que essa indicação implica.
 */
export interface Indicacao {
  id: string;
  descricao: string;
  dose: string;
  nivel: NivelDose;
}

/** Faixa de clearance de creatinina (CrCl) em mL/min. min/max null = sem limite nessa direção. */
export interface FaixaCrCl {
  min: number | null;
  max: number | null;
  horasSuspensao: number;
}

export interface RegraNivelDose {
  /** Faixas de CrCl com o número de horas de suspensão antes do procedimento em cada uma. */
  faixasCrCl: FaixaCrCl[];
  /** Abaixo desse CrCl (mL/min), o guideline sugere não realizar o bloqueio, salvo dosagem do fármaco. */
  contraindicadoAbaixoCrCl?: number;
  /** Horas entre colocação de agulha/retirada de cateter e a primeira dose pós-procedimento. */
  horasAteRetomar: number;
  /** Nível plasmático residual aceitável, citado no guideline. */
  nivelResidualAceitavel: string;
}

export interface Doac {
  id: string;
  nomeGenerico: string;
  nomesComerciais: string[];
  indicacoes: Indicacao[];
  regras: Partial<Record<NivelDose, RegraNivelDose>>;
}

export type RespostaSimNao = "sim" | "nao" | null;

export type OpcaoFuncaoRenal = "exata" | "normal" | "reduzida_desconhecida";

// --- Heparina (HNF e HBPM) ---

export type ViaHnf = "iv" | "sc_baixa" | "sc_alta_12h" | "sc_alta_24h";
export type FrequenciaHbpm = "uma_vez_dia" | "duas_vezes_dia";

export interface OpcaoViaOuDose {
  id: string;
  rotulo: string;
  descricao: string;
}

export interface RegraHeparina {
  id: string;
  horasSuspensao: number;
  /** Horas entre agulha (ou retirada de cateter) e a próxima dose. */
  horasAteRetomar: number;
  /** Texto livre com detalhes de manejo do cateter que não cabem num número
   * só (ex.: diferença de conduta entre HBPM 1x/dia e 2x/dia). */
  observacaoRetomada?: string;
  nivelResidualAceitavel: string;
}

// --- Antiplaquetários ---

export interface RegraAntiplaquetario {
  id: string;
  nomeGenerico: string;
  nomesComerciais: string[];
  /** true para AAS/AINEs: o guideline não recomenda suspender nem restringe a técnica. */
  semRestricao?: boolean;
  horasSuspensao: number;
  /** null quando o guideline não dá um número fixo (ex.: inibidores IIb/IIIa —
   * decisão individualizada, ver observacaoRetomada). */
  horasAteRetomar: number | null;
  /** Horas até retomar SE uma dose de ataque (loading dose) for administrada
   * no pós-operatório — só se aplica a clopidogrel/prasugrel/ticagrelor. */
  horasAteRetomarComDoseAtaque?: number;
  observacaoCateter?: string;
  observacaoRetomada?: string;
}

// --- Questionário e recomendação (comum às classes) ---

export interface RespostasQuestionario {
  classe: ClasseMedicamento | null;

  // DOAC
  medicamentoId: string | null;
  indicacaoId: string | null;
  funcaoRenalOpcao: OpcaoFuncaoRenal | null;
  crClExata: number | null;

  // Heparina
  viaHnf: ViaHnf | null;
  doseHbpm: NivelDose | null;
  frequenciaHbpm: FrequenciaHbpm | null;

  // Antiplaquetário
  antiplaquetarioId: string | null;
  doseAtaquePosOp: RespostaSimNao;

  // Comum
  dataProcedimento: string | null; // ISO AAAA-MM-DD
  horaProcedimento: number | null; // 0-23
}

export type Decisao = "calculada" | "indeterminado";

export interface Recomendacao {
  decisao: Decisao;
  classe: ClasseMedicamento | null;
  medicamentoNome: string | null;
  /** Descrição da indicação de uso (DOAC) ou da via/frequência (heparina). */
  detalhe: string | null;
  nivel: NivelDose | null;
  crClUsada: number | null;
  crClOrigem: OpcaoFuncaoRenal | null;
  horasSuspensao: number | null;
  contraindicado: boolean;
  /** true quando o guideline não recomenda suspender nem restringe a técnica (AAS/AINEs). */
  semRestricao: boolean;
  dataHoraCorteSuspensao: string | null;
  horasAteRetomar: number | null;
  observacaoRetomada: string | null;
  nivelResidualAceitavel: string | null;
  falhaJanelaSuspensao: boolean;
  motivoIndeterminado?: string;
}
