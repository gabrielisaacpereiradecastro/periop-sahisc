import { buscarAntiplaquetario, rotuloAntiplaquetario } from "@/anticoag/data/antiplaquetarios";
import { Recomendacao, RespostasQuestionario } from "@/anticoag/types";

const PRECISA_PERGUNTAR_DOSE_ATAQUE = ["clopidogrel", "prasugrel", "ticagrelor"];

/**
 * Motor de decisão para antiplaquetários, baseado nas seções de recomendação
 * específicas do guideline ASRA Pain Medicine 5ª edição.
 */
export function gerarRecomendacaoAntiplaquetario(
  respostas: RespostasQuestionario
): Recomendacao {
  const vazio: Recomendacao = {
    decisao: "indeterminado",
    classe: "antiplaquetario",
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

  const medicamento = buscarAntiplaquetario(respostas.antiplaquetarioId);
  if (!medicamento) {
    return {
      ...vazio,
      motivoIndeterminado:
        "Este medicamento não consta no protocolo carregado neste aplicativo. Não é possível gerar uma recomendação segura sem essa informação — converse diretamente com o médico anestesiologista responsável.",
    };
  }

  if (
    PRECISA_PERGUNTAR_DOSE_ATAQUE.includes(medicamento.id) &&
    respostas.doseAtaquePosOp === null
  ) {
    return {
      ...vazio,
      medicamentoNome: rotuloAntiplaquetario(medicamento),
      motivoIndeterminado:
        "Não foi informado se haverá dose de ataque (loading dose) no pós-operatório — isso muda o intervalo de retomada.",
    };
  }

  const horasAteRetomar =
    respostas.doseAtaquePosOp === "sim" && medicamento.horasAteRetomarComDoseAtaque !== undefined
      ? medicamento.horasAteRetomarComDoseAtaque
      : medicamento.horasAteRetomar;

  const observacaoPartes = [medicamento.observacaoCateter, medicamento.observacaoRetomada].filter(
    (t): t is string => !!t
  );

  return {
    ...vazio,
    decisao: "calculada",
    medicamentoNome: rotuloAntiplaquetario(medicamento),
    detalhe: null,
    semRestricao: !!medicamento.semRestricao,
    horasSuspensao: medicamento.horasSuspensao,
    horasAteRetomar,
    observacaoRetomada: observacaoPartes.length > 0 ? observacaoPartes.join(" ") : null,
    nivelResidualAceitavel: null,
  };
}
