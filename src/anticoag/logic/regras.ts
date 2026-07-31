import { buscarDoac, buscarIndicacao, rotuloDoac } from "@/anticoag/data/doacs";
import { FaixaCrCl, Recomendacao, RespostasQuestionario } from "@/anticoag/types";

/** Valor representativo de CrCl usado quando o médico indica função renal
 * normal, sem exame em mãos. Bem acima de qualquer limiar de redução de
 * dose/suspensão usado no guideline (o mais baixo é 95 mL/min, para edoxaban). */
const CRCL_NORMAL_REPRESENTATIVA = 100;

/** Valor representativo usado quando a função renal é reduzida mas o valor
 * exato é desconhecido. Escolhido para cair na faixa de redução moderada de
 * cada fármaco (garantindo o intervalo de suspensão mais longo aplicável),
 * sem presumir automaticamente a contraindicação de CrCl <30 — que exige
 * confirmação real, não uma suposição. */
const CRCL_REDUZIDA_REPRESENTATIVA = 35;

function faixaParaCrCl(faixas: FaixaCrCl[], crCl: number): FaixaCrCl | null {
  return (
    faixas.find(
      (f) => (f.min === null || crCl >= f.min) && (f.max === null || crCl <= f.max)
    ) ?? null
  );
}

/**
 * Motor de decisão para DOACs, baseado no guideline ASRA Pain Medicine 5ª
 * edição (Kopp SL, et al. Reg Anesth Pain Med 2025;0:1–29.
 * doi:10.1136/rapm-2024-105766), Tabela 1 e seções de recomendação
 * específicas por fármaco/dose.
 */
export function gerarRecomendacaoDoac(respostas: RespostasQuestionario): Recomendacao {
  const doac = buscarDoac(respostas.medicamentoId);

  const vazio: Recomendacao = {
    decisao: "indeterminado",
    classe: "doac",
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

  if (!doac) {
    return {
      ...vazio,
      motivoIndeterminado:
        "Este medicamento não consta no protocolo carregado neste aplicativo. Não é possível gerar uma recomendação segura sem essa informação — converse diretamente com o médico anestesiologista responsável.",
    };
  }

  const indicacao = buscarIndicacao(doac, respostas.indicacaoId);
  if (!indicacao) {
    return {
      ...vazio,
      medicamentoNome: rotuloDoac(doac),
      motivoIndeterminado:
        "Não foi possível identificar a indicação de uso informada para este medicamento.",
    };
  }

  const nivel = indicacao.nivel;
  const regra = doac.regras[nivel];
  if (!regra) {
    return {
      ...vazio,
      medicamentoNome: rotuloDoac(doac),
      detalhe: `${indicacao.descricao} (${indicacao.dose})`,
      nivel,
      motivoIndeterminado: "Não há regra de suspensão cadastrada para essa combinação.",
    };
  }

  let crClUsada: number;
  if (respostas.funcaoRenalOpcao === "exata" && respostas.crClExata !== null) {
    crClUsada = respostas.crClExata;
  } else if (respostas.funcaoRenalOpcao === "normal") {
    crClUsada = CRCL_NORMAL_REPRESENTATIVA;
  } else {
    crClUsada = CRCL_REDUZIDA_REPRESENTATIVA;
  }

  const faixa = faixaParaCrCl(regra.faixasCrCl, crClUsada);
  const horasSuspensao = faixa?.horasSuspensao ?? null;
  const contraindicado =
    regra.contraindicadoAbaixoCrCl !== undefined && crClUsada < regra.contraindicadoAbaixoCrCl;

  return {
    decisao: "calculada",
    classe: "doac",
    medicamentoNome: rotuloDoac(doac),
    detalhe: `${indicacao.descricao} (${indicacao.dose})`,
    nivel,
    crClUsada,
    crClOrigem: respostas.funcaoRenalOpcao,
    horasSuspensao,
    contraindicado,
    semRestricao: false,
    horasAteRetomar: regra.horasAteRetomar,
    observacaoRetomada: null,
    nivelResidualAceitavel: regra.nivelResidualAceitavel,
  };
}
