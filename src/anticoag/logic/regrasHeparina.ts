import {
  OPCOES_VIA_HNF,
  REGRAS_HNF,
  REGRA_HBPM_ALTA,
  REGRA_HBPM_BAIXA,
  observacaoHbpmBaixa,
} from "@/anticoag/data/heparinas";
import { Recomendacao, RegraHeparina, RespostasQuestionario } from "@/anticoag/types";
import { combinarDataHora, dataHoraEhFutura, subtrairHoras } from "@/anticoag/utils/data";

const VAZIO_BASE: Omit<Recomendacao, "classe" | "motivoIndeterminado"> = {
  decisao: "indeterminado",
  medicamentoNome: null,
  detalhe: null,
  nivel: null,
  crClUsada: null,
  crClOrigem: null,
  horasSuspensao: null,
  contraindicado: false,
  semRestricao: false,
  dataHoraCorteSuspensao: null,
  horasAteRetomar: null,
  observacaoRetomada: null,
  nivelResidualAceitavel: null,
  falhaJanelaSuspensao: false,
};

function calcularCorte(
  respostas: RespostasQuestionario,
  horasSuspensao: number
): { dataHoraCorteSuspensao: string | null; falhaJanelaSuspensao: boolean } {
  if (!respostas.dataProcedimento || respostas.horaProcedimento === null) {
    return { dataHoraCorteSuspensao: null, falhaJanelaSuspensao: false };
  }
  const dataHoraProcedimento = combinarDataHora(
    respostas.dataProcedimento,
    respostas.horaProcedimento
  );
  const dataHoraCorteSuspensao = subtrairHoras(dataHoraProcedimento, horasSuspensao);
  return {
    dataHoraCorteSuspensao,
    falhaJanelaSuspensao: !dataHoraEhFutura(dataHoraCorteSuspensao),
  };
}

function montarRecomendacao(
  classe: "hnf" | "hbpm",
  medicamentoNome: string,
  detalhe: string,
  regra: RegraHeparina,
  respostas: RespostasQuestionario
): Recomendacao {
  const { dataHoraCorteSuspensao, falhaJanelaSuspensao } = calcularCorte(
    respostas,
    regra.horasSuspensao
  );
  return {
    ...VAZIO_BASE,
    decisao: "calculada",
    classe,
    medicamentoNome,
    detalhe,
    horasSuspensao: regra.horasSuspensao,
    dataHoraCorteSuspensao,
    horasAteRetomar: regra.horasAteRetomar,
    observacaoRetomada: regra.observacaoRetomada ?? null,
    nivelResidualAceitavel: regra.nivelResidualAceitavel,
    falhaJanelaSuspensao,
  };
}

/**
 * Motor de decisão para heparina não fracionada (HNF), baseado nas seções
 * de recomendação específicas do guideline ASRA Pain Medicine 5ª edição.
 */
export function gerarRecomendacaoHnf(respostas: RespostasQuestionario): Recomendacao {
  if (!respostas.viaHnf) {
    return {
      ...VAZIO_BASE,
      classe: "hnf",
      motivoIndeterminado: "Via de administração da heparina não fracionada não informada.",
    };
  }
  const regra = REGRAS_HNF[respostas.viaHnf];
  const opcao = OPCOES_VIA_HNF.find((o) => o.id === respostas.viaHnf);
  return montarRecomendacao(
    "hnf",
    "Heparina não fracionada (HNF)",
    opcao?.rotulo ?? respostas.viaHnf,
    regra,
    respostas
  );
}

/**
 * Motor de decisão para heparina de baixo peso molecular (HBPM).
 */
export function gerarRecomendacaoHbpm(respostas: RespostasQuestionario): Recomendacao {
  if (!respostas.doseHbpm) {
    return {
      ...VAZIO_BASE,
      classe: "hbpm",
      motivoIndeterminado: "Dose de HBPM não informada.",
    };
  }

  if (respostas.doseHbpm === "alta") {
    return montarRecomendacao(
      "hbpm",
      "Heparina de baixo peso molecular (HBPM)",
      "Dose alta/terapêutica",
      REGRA_HBPM_ALTA,
      respostas
    );
  }

  // dose baixa: depende da frequência para o texto de manejo do cateter
  if (!respostas.frequenciaHbpm) {
    return {
      ...VAZIO_BASE,
      classe: "hbpm",
      motivoIndeterminado: "Frequência de dose da HBPM (1x ou 2x/dia) não informada.",
    };
  }
  const regra: RegraHeparina = {
    ...REGRA_HBPM_BAIXA,
    observacaoRetomada: observacaoHbpmBaixa(respostas.frequenciaHbpm === "duas_vezes_dia"),
  };
  return montarRecomendacao(
    "hbpm",
    "Heparina de baixo peso molecular (HBPM)",
    `Dose baixa/profilática, ${
      respostas.frequenciaHbpm === "duas_vezes_dia" ? "2x/dia" : "1x/dia"
    }`,
    regra,
    respostas
  );
}
