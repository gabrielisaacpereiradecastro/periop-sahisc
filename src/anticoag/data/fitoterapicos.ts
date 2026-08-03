import { Fitoterapico } from "@/anticoag/types";

/**
 * Tabela 6 do guideline ASRA (Kopp SL, et al. Reg Anesth Pain Med 2025;0:1–29,
 * p.20) — "Three herbal medications with the greatest impact on hemostasis",
 * adaptada de Horlocker et al (4ª edição). O próprio guideline afirma que,
 * atualmente, não é necessário suspender fitoterápicos nem aguardar a
 * resolução dos seus efeitos hemostáticos antes de cirurgia/anestesia.
 */
export const FITOTERAPICOS: Fitoterapico[] = [
  {
    id: "alho",
    nomeGenerico: "Alho",
    efeitosImportantes:
      "Inibição da agregação plaquetária (pode ser irreversível); aumento da fibrinólise; atividade anti-hipertensiva equívoca.",
    preocupacoesPerioperatorias:
      "Potencial de aumentar sangramento, especialmente quando combinado com outros medicamentos que inibem a agregação plaquetária.",
    tempoNormalizacaoHemostasia: "7 dias",
  },
  {
    id: "ginkgo",
    nomeGenerico: "Ginkgo biloba",
    efeitosImportantes: "Inibição do fator ativador de plaquetas (PAF).",
    preocupacoesPerioperatorias:
      "Potencial de aumentar sangramento, especialmente quando combinado com outros medicamentos que inibem a agregação plaquetária.",
    tempoNormalizacaoHemostasia: "36 horas",
  },
  {
    id: "ginseng",
    nomeGenerico: "Ginseng",
    efeitosImportantes:
      "Reduz a glicemia; aumento do tempo de protrombina e do tempo de tromboplastina parcial ativada em estudos animais; outros efeitos diversos.",
    preocupacoesPerioperatorias:
      "Hipoglicemia; potencial de aumentar o risco de sangramento; potencial de diminuir o efeito anticoagulante da varfarina.",
    tempoNormalizacaoHemostasia: "24 horas",
  },
];

export function buscarFitoterapico(id: string | null): Fitoterapico | null {
  return FITOTERAPICOS.find((f) => f.id === id) ?? null;
}
