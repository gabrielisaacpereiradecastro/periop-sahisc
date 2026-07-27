import { RegraAntiplaquetario } from "@/anticoag/types";

/**
 * Dados extraídos e verificados (por coluna) das seções "MANAGEMENT OF
 * NEURAXIAL BLOCK OR DEEP PLEXUS/PERIPHERAL BLOCK IN THE PATIENT TAKING..."
 * (NSAIDs, tienopiridinas, ticagrelor, inibidores IIb/IIIa, cilostazol,
 * cangrelor) do guideline ASRA Pain Medicine 5ª edição (Kopp SL, et al.
 * Reg Anesth Pain Med 2025; doi:10.1136/rapm-2024-105766).
 *
 * Quando o guideline dá uma faixa de dias (ex.: clopidogrel "5–7 dias"),
 * usamos sempre o extremo mais conservador (mais longo).
 */
export const ANTIPLAQUETARIOS: RegraAntiplaquetario[] = [
  {
    id: "aas_aine",
    nomeGenerico: "AAS (aspirina) ou outro AINE",
    nomesComerciais: ["AAS", "Aspirina", "ibuprofeno", "naproxeno", "outros AINEs"],
    semRestricao: true,
    horasSuspensao: 0,
    horasAteRetomar: 0,
    observacaoRetomada:
      "O guideline não identifica risco adicional relevante de sangramento com AINEs (incluindo AAS) — não há necessidade de suspender, nem restrição quanto à técnica (dose única ou cateter), monitorização, ou retirada de cateter.",
  },
  {
    id: "clopidogrel",
    nomeGenerico: "Clopidogrel",
    nomesComerciais: ["Plavix"],
    horasSuspensao: 24 * 7,
    horasAteRetomar: 0,
    horasAteRetomarComDoseAtaque: 6,
    observacaoCateter:
      "O cateter PODE ser mantido por 1–2 dias, desde que nenhuma dose de ataque seja administrada nesse período (o efeito antiplaquetário do clopidogrel não é imediato).",
  },
  {
    id: "prasugrel",
    nomeGenerico: "Prasugrel",
    nomesComerciais: ["Efient"],
    horasSuspensao: 24 * 10,
    horasAteRetomar: 0,
    horasAteRetomarComDoseAtaque: 6,
    observacaoCateter:
      "O cateter NÃO deve ser mantido com prasugrel em uso, devido ao início de ação rápido.",
  },
  {
    id: "ticagrelor",
    nomeGenerico: "Ticagrelor",
    nomesComerciais: ["Brilinta"],
    horasSuspensao: 24 * 5,
    horasAteRetomar: 0,
    horasAteRetomarComDoseAtaque: 6,
    observacaoCateter:
      "O cateter NÃO deve ser mantido com ticagrelor em uso, devido ao início de ação rápido.",
  },
  {
    id: "cilostazol",
    nomeGenerico: "Cilostazol",
    nomesComerciais: ["Pletal"],
    horasSuspensao: 24 * 2,
    horasAteRetomar: 6,
    observacaoCateter: "O cateter deve ser retirado antes de reiniciar o cilostazol.",
  },
  {
    id: "cangrelor",
    nomeGenerico: "Cangrelor",
    nomesComerciais: ["Kengreal"],
    horasSuspensao: 3,
    horasAteRetomar: 8,
    observacaoCateter: "O cateter deve ser retirado antes de reiniciar o cangrelor.",
  },
  {
    id: "abciximab",
    nomeGenerico: "Abciximab (inibidor GP IIb/IIIa)",
    nomesComerciais: ["ReoPro"],
    horasSuspensao: 48,
    horasAteRetomar: null,
    observacaoRetomada:
      "O guideline não define um número fixo de horas para retomada — a decisão sobre retirada do cateter e reinício depende do risco de tromboembolismo em curso e do risco de sangramento durante a manutenção/retirada do cateter, avaliados individualmente. Esses fármacos são contraindicados dentro de 4 semanas de cirurgia; se administrados em caráter de urgência no pós-operatório, use soluções neuroaxiais que minimizem o bloqueio motor/sensitivo e mantenha monitorização neurológica rigorosa.",
  },
  {
    id: "eptifibatide_tirofiban",
    nomeGenerico: "Eptifibatide ou Tirofiban (inibidores GP IIb/IIIa)",
    nomesComerciais: ["Integrilin", "Aggrastat"],
    horasSuspensao: 8,
    horasAteRetomar: null,
    observacaoRetomada:
      "O guideline não define um número fixo de horas para retomada — a decisão sobre retirada do cateter e reinício depende do risco de tromboembolismo em curso e do risco de sangramento durante a manutenção/retirada do cateter, avaliados individualmente. Esses fármacos são contraindicados dentro de 4 semanas de cirurgia; se administrados em caráter de urgência no pós-operatório, use soluções neuroaxiais que minimizem o bloqueio motor/sensitivo e mantenha monitorização neurológica rigorosa.",
  },
];

export function buscarAntiplaquetario(id: string | null): RegraAntiplaquetario | null {
  if (!id) return null;
  return ANTIPLAQUETARIOS.find((a) => a.id === id) ?? null;
}

export function rotuloAntiplaquetario(a: RegraAntiplaquetario): string {
  return a.nomesComerciais.length > 0
    ? `${a.nomeGenerico} (${a.nomesComerciais.join(", ")})`
    : a.nomeGenerico;
}
