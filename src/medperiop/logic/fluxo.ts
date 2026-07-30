import { Farmaco } from "@/medperiop/types";

export type EtapaExtra = "indicacao" | "condicao" | "frequencia";

/**
 * Determina se um fármaco precisa de uma pergunta extra antes de poder ser
 * confirmado como item da lista (indicação de uso, condição clínica, ou
 * frequência de dose), e qual — `null` significa que pode ser confirmado
 * direto, sem pergunta adicional. Usado tanto para decidir a rota logo após
 * a tela de seleção quanto para montar a fila de pendências quando o
 * usuário marca vários fármacos de uma vez.
 */
export function etapaExtraParaFarmaco(farmaco: Farmaco): EtapaExtra | null {
  if (farmaco.indicacoes) return "indicacao";
  if (farmaco.condicaoClinica) return "condicao";
  if (farmaco.regra?.tipo === "suspender_intervalo_dose") return "frequencia";
  return null;
}
