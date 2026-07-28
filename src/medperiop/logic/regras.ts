import { buscarFarmaco } from "@/medperiop/data/farmacos";
import {
  Farmaco,
  Indicacao,
  ItemMedicamento,
  Recomendacao,
  RegraRecomendacao,
  RespostasQuestionario,
} from "@/medperiop/types";
import { dataEhFutura, paraDias, subtrairDias } from "@/medperiop/utils/data";

interface RegraResolvida {
  regra: RegraRecomendacao;
  indicacao: Indicacao | null;
}

/**
 * Um fármaco tem exatamente uma fonte de regra: fixa (`regra`), dependente de
 * indicação de uso (`indicacoes`) ou dependente de uma condição clínica de
 * sim/não (`condicaoClinica`). Retorna `null` quando a informação adicional
 * necessária (indicação ou condição) ainda não foi respondida — o chamador
 * trata isso como "indeterminado" (não é erro, é questionário incompleto).
 */
function resolverRegra(
  farmaco: Farmaco,
  indicacaoId: string | null,
  condicaoAtendida: "sim" | "nao" | null
): RegraResolvida | null {
  if (farmaco.regra) {
    return { regra: farmaco.regra, indicacao: null };
  }
  if (farmaco.indicacoes) {
    const indicacao = farmaco.indicacoes.find((i) => i.id === indicacaoId) ?? null;
    if (!indicacao) return null;
    return { regra: indicacao.regra, indicacao };
  }
  if (farmaco.condicaoClinica) {
    if (condicaoAtendida === null) return null;
    const regra =
      condicaoAtendida === "sim"
        ? farmaco.condicaoClinica.regraSeSim
        : farmaco.condicaoClinica.regraSeNao;
    return { regra, indicacao: null };
  }
  return null;
}

/**
 * A janela de suspensão foi perdida quando a data de corte (data da cirurgia
 * menos o período de suspensão exigido) já ficou no passado. Data de corte
 * igual a hoje ainda é considerada válida. Sem data de cirurgia informada,
 * não há como avaliar falha de janela.
 */
function houveFalhaDeJanela(dataCorteSuspensao: string | null): boolean {
  return dataCorteSuspensao !== null && !dataEhFutura(dataCorteSuspensao);
}

/**
 * Motor de decisão para um único medicamento da lista. `dataCirurgia` é
 * opcional: quando ausente, a recomendação ainda é gerada normalmente, só
 * que sem data de corte calculada — o período relativo (`diasSuspensao`)
 * continua disponível para exibir "suspender N dias antes" sem data exata.
 */
export function gerarRecomendacaoItem(
  item: ItemMedicamento,
  dataCirurgia: string | null
): Recomendacao {
  const farmaco = buscarFarmaco(item.classe, item.farmacoId);

  if (!farmaco) {
    return {
      decisao: "indeterminado",
      farmaco: null,
      indicacao: null,
      regraAplicada: null,
      diasSuspensao: null,
      dataCorteSuspensao: null,
      falhaJanelaSuspensao: false,
      motivoIndeterminado:
        "Este fármaco não consta na base de dados do aplicativo (série de consensus statements SPAQI). Não é possível gerar uma recomendação segura sem essa informação — converse diretamente com o médico prescritor e com o anestesiologista responsável.",
    };
  }

  const resolvido = resolverRegra(farmaco, item.indicacaoId, item.condicaoAtendida);
  if (!resolvido) {
    return {
      decisao: "indeterminado",
      farmaco,
      indicacao: null,
      regraAplicada: null,
      diasSuspensao: null,
      dataCorteSuspensao: null,
      falhaJanelaSuspensao: false,
      motivoIndeterminado:
        "Faltam informações para gerar a recomendação (indicação de uso do medicamento, ou uma condição clínica, ainda não foi respondida).",
    };
  }

  const { regra, indicacao } = resolvido;

  switch (regra.tipo) {
    case "continuar":
      return {
        decisao: "continuar",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };

    case "suspender_dia_cirurgia":
      return {
        decisao: "suspender_dia_cirurgia",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
        dataCorteSuspensao: dataCirurgia,
        falhaJanelaSuspensao: false,
      };

    case "suspender_periodo_fixo": {
      const dias = paraDias(regra.valor ?? 0, regra.unidade ?? "dias");
      const dataCorteSuspensao = dataCirurgia ? subtrairDias(dataCirurgia, dias) : null;
      return {
        decisao: "suspender_com_data",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: dias,
        dataCorteSuspensao,
        falhaJanelaSuspensao: houveFalhaDeJanela(dataCorteSuspensao),
      };
    }

    case "suspender_intervalo_dose": {
      const numeroIntervalos = regra.numeroIntervalos ?? 1;
      if (item.frequenciaDoseDias === null) {
        return {
          decisao: "indeterminado",
          farmaco,
          indicacao,
          regraAplicada: regra,
          diasSuspensao: null,
          dataCorteSuspensao: null,
          falhaJanelaSuspensao: false,
          motivoIndeterminado:
            "Falta informar a cada quantos dias o paciente toma a dose deste medicamento, para calcular a data de suspensão (a regra depende da posologia individual, não de um número fixo de dias).",
        };
      }
      const dias = numeroIntervalos * item.frequenciaDoseDias;
      const dataCorteSuspensao = dataCirurgia ? subtrairDias(dataCirurgia, dias) : null;
      return {
        decisao: "suspender_com_data",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: dias,
        dataCorteSuspensao,
        falhaJanelaSuspensao: houveFalhaDeJanela(dataCorteSuspensao),
      };
    }

    case "reduzir_dose":
      return {
        decisao: "reduzir_dose",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };

    case "individualizado":
      return {
        decisao: "individualizado",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };
  }
}

/** Gera uma recomendação para cada medicamento adicionado na sessão. */
export function gerarRecomendacoes(respostas: RespostasQuestionario): Recomendacao[] {
  return respostas.medicamentos.map((item) =>
    gerarRecomendacaoItem(item, respostas.dataCirurgia)
  );
}
