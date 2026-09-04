import { gerarRecomendacaoDoac } from "@/anticoag/logic/regras";
import { gerarRecomendacaoHbpm, gerarRecomendacaoHnf } from "@/anticoag/logic/regrasHeparina";
import { gerarRecomendacaoAntiplaquetario } from "@/anticoag/logic/regrasAntiplaquetario";
import { gerarRecomendacaoFitoterapicoItem } from "@/anticoag/logic/regrasFitoterapico";
import { ItemMedicamentoAntiCoag, Recomendacao, RespostasQuestionario } from "@/anticoag/types";

/**
 * Despacha para o motor de decisão certo com base em `item.classe` — o
 * AntiCoag tem 4 fontes/motores estruturalmente diferentes (DOAC, HNF/HBPM,
 * antiplaquetário, fitoterápico), diferente do MedPeriOp que tem uma única
 * tabela de fármacos.
 */
export function gerarRecomendacaoItemAntiCoag(item: ItemMedicamentoAntiCoag): Recomendacao {
  if (item.classe === "hnf") return gerarRecomendacaoHnf(item);
  if (item.classe === "hbpm") return gerarRecomendacaoHbpm(item);
  if (item.classe === "antiplaquetario") return gerarRecomendacaoAntiplaquetario(item);
  if (item.classe === "fitoterapico") return gerarRecomendacaoFitoterapicoItem(item.fitoterapicoId ?? "");
  return gerarRecomendacaoDoac(item);
}

/** Gera uma recomendação para cada medicamento confirmado na sessão. */
export function gerarRecomendacoesAntiCoag(respostas: RespostasQuestionario): Recomendacao[] {
  return respostas.medicamentos.map((item) => gerarRecomendacaoItemAntiCoag(item));
}
