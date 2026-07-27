export const PROTOCOLO_META = {
  titulo: "Society for Perioperative Assessment and Quality Improvement (SPAQI) — série de consensus statements sobre manejo perioperatório de medicações de uso crônico",
  autores: "O'Glasser AY, et al. (metodologia); Sahai SK, Pfeifer KJ, Oprea AD, Russell LA, O'Rourke MJ, et al. (por classe)",
  publicacao: "Mayo Clinic Proceedings, 2021–2022 (ver referência completa de cada classe abaixo)",
  doi: "várias — ver REFERENCIAS",
  url: "https://www.mayoclinicproceedings.org",
};

export interface Referencia {
  numero: number;
  citacao: string;
  url?: string;
}

export const REFERENCIAS: Referencia[] = [
  {
    numero: 1,
    citacao:
      "O'Glasser AY, Boxhorn CE, Pfeifer KJ, Vaz Fragoso CA, Cohn SL. Striving for Evidence-Based, Patient-Centered Guidance: The Impetus Behind the Society for Perioperative Assessment and Quality Improvement (SPAQI) Medication Management Consensus Statements. Mayo Clin Proc. 2021;96(3):545-548.",
    url: "https://doi.org/10.1016/j.mayocp.2020.12.026",
  },
  {
    numero: 2,
    citacao:
      "Sahai SK, Balonov K, Bentov N, et al. Preoperative Management of Cardiovascular Medications: A Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2022;97(9):1734-1751.",
    url: "https://doi.org/10.1016/j.mayocp.2022.05.017",
  },
  {
    numero: 3,
    citacao:
      "Pfeifer KJ, Selzer A, Mendez CE, et al. Preoperative Management of Endocrine, Hormonal, and Urologic Medications: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2021;96(6):1655-1669.",
    url: "https://doi.org/10.1016/j.mayocp.2020.10.002",
  },
  {
    numero: 4,
    citacao:
      "Pfeifer KJ, Selzer A, Whinney CM, et al. Preoperative Management of Gastrointestinal and Pulmonary Medications: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2021;96(12):3158-3177.",
    url: "https://doi.org/10.1016/j.mayocp.2021.08.021",
  },
  {
    numero: 5,
    citacao:
      "Oprea AD, Keshock MC, Cummings KC III, et al. Preoperative Management of Medications for Neurologic Diseases: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2022;97(2):375-396.",
    url: "https://doi.org/10.1016/j.mayocp.2021.11.019",
  },
  {
    numero: 6,
    citacao:
      "Oprea AD, Keshock MC, Cummings KC III, et al. Preoperative Management of Medications for Psychiatric Diseases: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2022;97(2):397-416.",
    url: "https://doi.org/10.1016/j.mayocp.2021.11.020",
  },
  {
    numero: 7,
    citacao:
      "Russell LA, Craig C, Flores EK, et al. Preoperative Management of Medications for Rheumatologic and HIV Diseases: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2022;97(8):1551-1571.",
    url: "https://doi.org/10.1016/j.mayocp.2022.05.002",
  },
  {
    numero: 8,
    citacao:
      "O'Rourke MJ, Keshock MC, Boxhorn CE, Correll DJ, O'Glasser AY, Gazelka HM, Urman RD. Preoperative Management of Opioid and Nonopioid Analgesics: Society for Perioperative Assessment and Quality Improvement (SPAQI) Consensus Statement. Mayo Clin Proc. 2021;96(5):1325-1341.",
    url: "https://doi.org/10.1016/j.mayocp.2020.06.045",
  },
];

export const ESCOPO_ATUAL =
  "Este aplicativo cobre 7 classes de medicações de uso crônico, conforme a série de consensus statements da SPAQI (metodologia Delphi modificada, painel multidisciplinar): cardiovascular, endócrino/hormonal/urológico (incluindo diabetes), gastrointestinal/pulmonar, neurológico, psiquiátrico, reumatológico/HIV (incluindo AINEs) e analgésicos opioides/não-opioides. Não cobre: anticoagulantes/antiagregantes (ver app AntiCoag PeriOp — SAHISC) e agonistas do receptor de GLP-1 (ver app GLP-1 PeriOp — SAHISC). Gabapentina e pregabalina aparecem apenas como anticonvulsivantes (classe neurológica, indicação de epilepsia/doença neurológica) — como analgésicos/adjuvantes de dor, a própria SPAQI reservou essas duas classes para um consensus statement separado, ainda não incorporado aqui. Dose de estresse de corticoide também fica de fora: a SPAQI trata o tema como debate em andamento, fora do escopo de suas recomendações. Quando o artigo-fonte não define um número fixo de dias/horas de suspensão, o aplicativo sinaliza explicitamente \"decisão individualizada\" em vez de estimar um valor.";
