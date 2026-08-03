import { buscarFitoterapico } from "@/anticoag/data/fitoterapicos";
import { Recomendacao, RespostasQuestionario } from "@/anticoag/types";

const VAZIO: Recomendacao = {
  decisao: "indeterminado",
  classe: "fitoterapico",
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
  racional: null,
  situacoesEspeciais: null,
  diasSuspensao: null,
};

/**
 * Motor de decisão para fitoterápicos, baseado na Tabela 1 de Elvir Lazo
 * OL, White PF, et al. J Clin Anesth. 2024;95:111473 — uma fonte diferente
 * do guideline ASRA usado no resto do AntiCoag (risco de sangramento
 * perioperatório geral, não específico de bloqueio neuraxial).
 */
export function gerarRecomendacaoFitoterapico(respostas: RespostasQuestionario): Recomendacao {
  const fito = buscarFitoterapico(respostas.fitoterapicoId);
  if (!fito) {
    return {
      ...VAZIO,
      motivoIndeterminado: "Selecione qual fitoterápico o paciente utiliza.",
    };
  }

  const racional = `${fito.mecanismoAcao} ${fito.efeitosAdversos}`;
  const situacoesEspeciais = `${fito.interacoesMedicamentosas} ${fito.recomendacaoTexto}`;

  if (fito.regra.tipo === "individualizado") {
    return {
      ...VAZIO,
      decisao: "calculada",
      medicamentoNome: fito.nomeGenerico,
      detalhe: fito.usosClinicos,
      racional,
      situacoesEspeciais,
      motivoIndividualizado: fito.regra.motivoIndividualizado,
    };
  }

  return {
    ...VAZIO,
    decisao: "calculada",
    medicamentoNome: fito.nomeGenerico,
    detalhe: fito.usosClinicos,
    racional,
    situacoesEspeciais,
    diasSuspensao: fito.regra.valorDias ?? null,
  };
}
