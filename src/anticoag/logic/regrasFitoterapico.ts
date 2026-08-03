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
};

/**
 * Motor de decisão para fitoterápicos, baseado na seção HERBAL MEDICATIONS e
 * na Tabela 6 do guideline ASRA Pain Medicine 5ª edição. A recomendação é
 * única para os três fitoterápicos cobertos: não suspender, sem restrição à
 * técnica (grau 1C) — não há um cálculo de horas/data envolvido.
 */
export function gerarRecomendacaoFitoterapico(respostas: RespostasQuestionario): Recomendacao {
  const fito = buscarFitoterapico(respostas.fitoterapicoId);
  if (!fito) {
    return {
      ...VAZIO,
      motivoIndeterminado: "Selecione qual fitoterápico o paciente utiliza.",
    };
  }

  return {
    ...VAZIO,
    decisao: "calculada",
    medicamentoNome: fito.nomeGenerico,
    detalhe: `${fito.efeitosImportantes} ${fito.preocupacoesPerioperatorias} Tempo de referência até a normalização completa da hemostasia após a suspensão (não é necessário aguardar esse prazo): ${fito.tempoNormalizacaoHemostasia}.`,
    semRestricao: true,
  };
}
