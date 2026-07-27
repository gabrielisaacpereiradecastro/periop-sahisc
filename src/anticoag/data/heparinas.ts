import { OpcaoViaOuDose, RegraHeparina } from "@/anticoag/types";

/**
 * Dados extraídos e verificados (por coluna) das seções "MANAGEMENT OF
 * NEURAXIAL BLOCK OR DEEP PLEXUS/PERIPHERAL BLOCK IN THE PATIENT RECEIVING
 * UNFRACTIONATED HEPARIN" e "...LOW MOLECULAR WEIGHT HEPARIN" do guideline
 * ASRA Pain Medicine 5ª edição (Kopp SL, et al. Reg Anesth Pain Med 2025;
 * doi:10.1136/rapm-2024-105766).
 */

// --- Heparina não fracionada (HNF) ---

export const OPCOES_VIA_HNF: OpcaoViaOuDose[] = [
  {
    id: "iv",
    rotulo: "Intravenosa (infusão contínua)",
    descricao: "Heparina não fracionada em infusão intravenosa contínua",
  },
  {
    id: "sc_baixa",
    rotulo: "Subcutânea, profilática (5.000 UI, 2–3x/dia)",
    descricao: "Dose baixa subcutânea, uso profilático padrão",
  },
  {
    id: "sc_alta_12h",
    rotulo: "Subcutânea, 7.500–10.000 UI 2x/dia (ou até 20.000 UI/dia no total)",
    descricao: "Dose alta subcutânea, patamar intermediário",
  },
  {
    id: "sc_alta_24h",
    rotulo: "Subcutânea, acima de 10.000 UI por dose, ou acima de 20.000 UI/dia no total",
    descricao: "Dose alta subcutânea, patamar mais alto",
  },
];

export const REGRAS_HNF: Record<string, RegraHeparina> = {
  iv: {
    id: "iv",
    horasSuspensao: 6,
    horasAteRetomar: 1,
    observacaoRetomada:
      "Não é recomendado manter cateter neuraxial/de plexo profundo durante infusão intravenosa contínua de heparina.",
    nivelResidualAceitavel: "Coagulação normal (ex.: aPTT normal)",
  },
  sc_baixa: {
    id: "sc_baixa",
    horasSuspensao: 6,
    horasAteRetomar: 0,
    observacaoRetomada:
      "Sem contraindicação para manter o cateter em dose baixa. Retirar o cateter pelo menos 4–6 horas após uma dose; a dose seguinte pode ocorrer imediatamente após a retirada.",
    nivelResidualAceitavel: "Coagulação normal (ex.: aPTT normal), se avaliada",
  },
  sc_alta_12h: {
    id: "sc_alta_12h",
    horasSuspensao: 12,
    horasAteRetomar: 12,
    observacaoRetomada:
      "Segurança do cateter mantido não está bem estabelecida nessa dose — avaliação individualizada de risco-benefício, com monitorização neurológica facilitada.",
    nivelResidualAceitavel: "Coagulação normal (ex.: aPTT normal)",
  },
  sc_alta_24h: {
    id: "sc_alta_24h",
    horasSuspensao: 24,
    horasAteRetomar: 24,
    observacaoRetomada:
      "Segurança do cateter mantido não está bem estabelecida nessa dose — avaliação individualizada de risco-benefício, com monitorização neurológica facilitada.",
    nivelResidualAceitavel: "Coagulação normal (ex.: aPTT normal)",
  },
};

// --- Heparina de baixo peso molecular (HBPM) ---

export const EXEMPLOS_HBPM_BAIXA =
  "Ex.: enoxaparina 40 mg 1x/dia, enoxaparina 30 mg 12/12h, dalteparina 5.000 UI 1x/dia";
export const EXEMPLOS_HBPM_ALTA =
  "Ex.: enoxaparina 1 mg/kg 12/12h ou 1,5 mg/kg 1x/dia, dalteparina 120 UI/kg 12/12h ou 200 UI/kg 1x/dia, tinzaparina 175 UI/kg 1x/dia";

const OBSERVACAO_HBPM_BAIXA_1X =
  "O cateter pode ser mantido. Retire 12h após a última dose de HBPM, e aguarde mais 4h após a retirada antes da próxima dose (a 2ª dose pós-operatória deve ocorrer pelo menos 24h após a 1ª).";
const OBSERVACAO_HBPM_BAIXA_2X =
  "O cateter deve ser retirado ANTES de iniciar a HBPM no pós-operatório. A dose seguinte pode ocorrer 4h após a retirada.";

export function observacaoHbpmBaixa(frequenciaDuasVezesDia: boolean): string {
  return frequenciaDuasVezesDia ? OBSERVACAO_HBPM_BAIXA_2X : OBSERVACAO_HBPM_BAIXA_1X;
}

export const REGRA_HBPM_BAIXA: RegraHeparina = {
  id: "hbpm_baixa",
  horasSuspensao: 12,
  horasAteRetomar: 12,
  nivelResidualAceitavel: "Atividade anti-Xa ≤0,1 UI/mL, se avaliada (considerar checar se <12h)",
};

export const REGRA_HBPM_ALTA: RegraHeparina = {
  id: "hbpm_alta",
  horasSuspensao: 24,
  horasAteRetomar: 24,
  observacaoRetomada:
    "Retomar 24h após cirurgia sem alto risco de sangramento, ou 48–72h se alto risco. O cateter deve ser retirado pelo menos 4h antes da 1ª dose pós-operatória, E a 1ª dose deve ocorrer pelo menos 24h após a colocação da agulha/cateter — vale o que for maior.",
  nivelResidualAceitavel:
    "Atividade anti-Xa ≤0,1 UI/mL, se avaliada (considerar checar especialmente em idosos >75 anos ou CrCl ≤30 mL/min)",
};
