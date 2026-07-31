import { buscarFarmaco } from "@/medperiop/data/farmacos";
import {
  Farmaco,
  Indicacao,
  ItemMedicamento,
  Recomendacao,
  RegraRecomendacao,
  RespostasQuestionario,
} from "@/medperiop/types";
import { paraDias } from "@/medperiop/utils/data";

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
 * Motor de decisão para um único medicamento da lista. O app não pede data
 * de cirurgia/procedimento — a recomendação é sempre o período relativo
 * (`diasSuspensao`), nunca uma data de corte calculada.
 */
export function gerarRecomendacaoItem(item: ItemMedicamento): Recomendacao {
  const farmaco = buscarFarmaco(item.classe, item.farmacoId);

  if (!farmaco) {
    return {
      decisao: "indeterminado",
      farmaco: null,
      indicacao: null,
      regraAplicada: null,
      diasSuspensao: null,
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
      };

    case "suspender_dia_cirurgia":
      return {
        decisao: "suspender_dia_cirurgia",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
      };

    case "suspender_periodo_fixo": {
      const dias = paraDias(regra.valor ?? 0, regra.unidade ?? "dias");
      return {
        decisao: "suspender_periodo",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: dias,
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
          motivoIndeterminado:
            "Falta informar a cada quantos dias o paciente toma a dose deste medicamento, para calcular o período de suspensão (a regra depende da posologia individual, não de um número fixo de dias).",
        };
      }
      const dias = numeroIntervalos * item.frequenciaDoseDias;
      return {
        decisao: "suspender_periodo",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: dias,
      };
    }

    case "reduzir_dose":
      return {
        decisao: "reduzir_dose",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
      };

    case "individualizado":
      return {
        decisao: "individualizado",
        farmaco,
        indicacao,
        regraAplicada: regra,
        diasSuspensao: null,
      };
  }
}

/** Gera uma recomendação para cada medicamento adicionado na sessão. */
export function gerarRecomendacoes(respostas: RespostasQuestionario): Recomendacao[] {
  return respostas.medicamentos.map((item) => gerarRecomendacaoItem(item));
}
