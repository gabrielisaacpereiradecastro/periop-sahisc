export interface ReferenciaBibliografica {
  numero: number;
  citacao: string;
  url: string;
  /** O que essa fonte cobre neste app, e qualquer ressalva de escopo
   * relevante (ex.: risco geral de sangramento cirúrgico vs. risco
   * específico de bloqueio neuraxial). */
  escopo: string;
}

export const REFERENCIAS: ReferenciaBibliografica[] = [
  {
    numero: 1,
    citacao:
      "Kopp SL, Vandermeulen E, McBane RD, Perlas A, Leffert L, Horlocker T. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: American Society of Regional Anesthesia and Pain Medicine Evidence-Based Guidelines (fifth edition). Reg Anesth Pain Med. 2025;0:1–29.",
    url: "https://rapm.bmj.com/content/early/2025/01/21/rapm-2024-105766",
    escopo:
      "Anticoagulantes orais diretos (DOACs — apixaban, edoxaban, rivaroxaban e dabigatran), heparina não fracionada (HNF), heparina de baixo peso molecular (HBPM) e antiplaquetários (AAS/AINEs, clopidogrel, prasugrel, ticagrelor, cilostazol, cangrelor, inibidores GP IIb/IIIa), para bloqueio neuraxial e de plexo profundo/periférico. Outras classes tratadas pelo guideline (inibidores diretos de trombina parenterais, trombolíticos, e o manejo na gestante) serão adicionadas em atualizações futuras.",
  },
  {
    numero: 2,
    citacao:
      "Elvir Lazo OL, White PF, Lee C, Cruz Eng H, Matin JM, Lin C, Del Cid F, Yumul R. Use of herbal medication in the perioperative period: Potential adverse drug interactions. J Clin Anesth. 2024;95:111473.",
    url: "https://doi.org/10.1016/j.jclinane.2024.111473",
    escopo:
      "Fitoterápicos — os 33 fitoterápicos mais usados no perioperatório (ex.: alho, ginkgo, ginseng, cúrcuma, valeriana), com efeitos adversos, interações medicamentosas e janela recomendada de suspensão antes de cirurgia. Importante: esta fonte trata do risco de sangramento e complicações no perioperatório de cirurgias EM GERAL — não é específica para bloqueio neuraxial/regional como o guideline ASRA acima.",
  },
];
