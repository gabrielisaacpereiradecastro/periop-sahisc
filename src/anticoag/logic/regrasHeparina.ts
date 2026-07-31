import {
  OPCOES_VIA_HNF,
  REGRAS_HNF,
  REGRA_HBPM_ALTA,
  REGRA_HBPM_BAIXA,
  observacaoHbpmBaixa,
} from "@/anticoag/data/heparinas";
import { Recomendacao, RegraHeparina, RespostasQuestionario } from "@/anticoag/types";

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
  horasAteRetomar: null,
  observacaoRetomada: null,
  nivelResidualAceitavel: null,
};

function montarRecomendacao(
  classe: "hnf" | "hbpm",
  medicamentoNome: string,
  detalhe: string,
  regra: RegraHeparina
): Recomendacao {
  return {
    ...VAZIO_BASE,
    decisao: "calculada",
    classe,
    medicamentoNome,
    detalhe,
    horasSuspensao: regra.horasSuspensao,
    horasAteRetomar: regra.horasAteRetomar,
    observacaoRetomada: regra.observacaoRetomada ?? null,
    nivelResidualAceitavel: regra.nivelResidualAceitavel,
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
    regra
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
      REGRA_HBPM_ALTA
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
    regra
  );
}
