import { Medicamento } from "@/glp1/types";

/**
 * Classificação de duração de ação exatamente conforme o fluxograma
 * da Nota SBA C.SBA-01744/2026 (15/05/2026), Passo 1 e Passo 3.
 * Curta ação: suspender 1 dia antes. Longa ação: suspender 7 dias antes.
 */
export const MEDICAMENTOS: Medicamento[] = [
  {
    id: "liraglutida",
    nomeGenerico: "Liraglutida",
    nomesComerciais: ["Victoza", "Saxenda"],
    classe: "curta",
    diasSuspensao: 1,
  },
  {
    id: "lixisenatida",
    nomeGenerico: "Lixisenatida",
    nomesComerciais: ["Adlyxin", "Lyxumia"],
    classe: "curta",
    diasSuspensao: 1,
  },
  {
    id: "semaglutida_sc",
    nomeGenerico: "Semaglutida (injetável, subcutânea, semanal)",
    nomesComerciais: ["Ozempic", "Wegovy"],
    classe: "longa",
    diasSuspensao: 7,
  },
  {
    id: "semaglutida_vo",
    nomeGenerico: "Semaglutida (comprimido, via oral)",
    nomesComerciais: ["Rybelsus"],
    classe: "longa",
    diasSuspensao: 7,
  },
  {
    id: "dulaglutida",
    nomeGenerico: "Dulaglutida",
    nomesComerciais: ["Trulicity"],
    classe: "longa",
    diasSuspensao: 7,
  },
  {
    id: "tirzepatida",
    nomeGenerico: "Tirzepatida",
    nomesComerciais: ["Mounjaro", "Zepbound"],
    classe: "longa",
    diasSuspensao: 7,
  },
];

export const MEDICAMENTO_OUTRO_ID = "outro";

export function buscarMedicamento(id: string | null): Medicamento | null {
  if (!id) return null;
  return MEDICAMENTOS.find((m) => m.id === id) ?? null;
}

export function rotuloMedicamento(m: Medicamento): string {
  return `${m.nomeGenerico} (${m.nomesComerciais.join(", ")})`;
}
