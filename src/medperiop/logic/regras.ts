import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { Farmaco, Indicacao, Recomendacao, RegraRecomendacao, RespostasQuestionario } from "@/medperiop/types";
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
function resolverRegra(farmaco: Farmaco, respostas: RespostasQuestionario): RegraResolvida | null {
  if (farmaco.regra) {
    return { regra: farmaco.regra, indicacao: null };
  }
  if (farmaco.indicacoes) {
    const indicacao = farmaco.indicacoes.find((i) => i.id === respostas.indicacaoId) ?? null;
    if (!indicacao) return null;
    return { regra: indicacao.regra, indicacao };
  }
  if (farmaco.condicaoClinica) {
    if (respostas.condicaoAtendida === null) return null;
    const regra =
      respostas.condicaoAtendida === "sim"
        ? farmaco.condicaoClinica.regraSeSim
        : farmaco.condicaoClinica.regraSeNao;
    return { regra, indicacao: null };
  }
  return null;
}

/**
 * A janela de suspensão foi perdida quando a data de corte (data da cirurgia
 * menos o período de suspensão exigido) já ficou no passado. Data de corte
 * igual a hoje ainda é considerada válida.
 */
function houveFalhaDeJanela(dataCorteSuspensao: string | null): boolean {
  return dataCorteSuspensao !== null && !dataEhFutura(dataCorteSuspensao);
}

/**
 * Motor de decisão único para as 7 classes terapêuticas: função pura que
 * consulta o fármaco selecionado na base de dados (`TODOS_FARMACOS`), resolve
 * a regra aplicável (direta, por indicação ou por condição clínica) e traduz
 * essa regra em uma decisão concreta, calculando a data de corte quando fizer
 * sentido. Não há ramificação de risco tipo GLP1/AntiCoag aqui — a maior
 * parte da complexidade deste app está no volume de fármacos, não na lógica
 * de decisão em si, que é essencialmente uma consulta à tabela do consensus
 * statement correspondente.
 */
export function gerarRecomendacao(respostas: RespostasQuestionario): Recomendacao {
  const farmaco = buscarFarmaco(respostas.classe, respostas.farmacoId);

  if (!farmaco) {
    return {
      decisao: "indeterminado",
      farmaco: null,
      indicacao: null,
      regraAplicada: null,
      dataCorteSuspensao: null,
      falhaJanelaSuspensao: false,
      motivoIndeterminado:
        "Este fármaco não consta na base de dados do aplicativo (série de consensus statements SPAQI). Não é possível gerar uma recomendação segura sem essa informação — converse diretamente com o médico prescritor e com o anestesiologista responsável.",
    };
  }

  const resolvido = resolverRegra(farmaco, respostas);
  if (!resolvido) {
    return {
      decisao: "indeterminado",
      farmaco,
      indicacao: null,
      regraAplicada: null,
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
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };

    case "suspender_dia_cirurgia":
      return {
        decisao: "suspender_dia_cirurgia",
        farmaco,
        indicacao,
        regraAplicada: regra,
        dataCorteSuspensao: respostas.dataCirurgia,
        falhaJanelaSuspensao: false,
      };

    case "suspender_periodo_fixo": {
      const dias = paraDias(regra.valor ?? 0, regra.unidade ?? "dias");
      const dataCorteSuspensao = respostas.dataCirurgia
        ? subtrairDias(respostas.dataCirurgia, dias)
        : null;
      return {
        decisao: "suspender_com_data",
        farmaco,
        indicacao,
        regraAplicada: regra,
        dataCorteSuspensao,
        falhaJanelaSuspensao: houveFalhaDeJanela(dataCorteSuspensao),
      };
    }

    case "suspender_intervalo_dose": {
      const numeroIntervalos = regra.numeroIntervalos ?? 1;
      if (respostas.frequenciaDoseDias === null) {
        return {
          decisao: "indeterminado",
          farmaco,
          indicacao,
          regraAplicada: regra,
          dataCorteSuspensao: null,
          falhaJanelaSuspensao: false,
          motivoIndeterminado:
            "Falta informar a cada quantos dias o paciente toma a dose deste medicamento, para calcular a data de suspensão (a regra depende da posologia individual, não de um número fixo de dias).",
        };
      }
      const dias = numeroIntervalos * respostas.frequenciaDoseDias;
      const dataCorteSuspensao = respostas.dataCirurgia
        ? subtrairDias(respostas.dataCirurgia, dias)
        : null;
      return {
        decisao: "suspender_com_data",
        farmaco,
        indicacao,
        regraAplicada: regra,
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
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };

    case "individualizado":
      return {
        decisao: "individualizado",
        farmaco,
        indicacao,
        regraAplicada: regra,
        dataCorteSuspensao: null,
        falhaJanelaSuspensao: false,
      };
  }
}
