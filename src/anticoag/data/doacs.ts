import { Doac } from "@/anticoag/types";

/**
 * Dados extraídos da Tabela 1 (indicações e doses) e das seções de
 * recomendação específicas de cada fármaco (suspensão antes do bloqueio
 * neuraxial/plexo profundo-periférico, e retomada após colocação de
 * agulha/retirada de cateter) do guideline:
 *
 * Kopp SL, Vandermeulen E, McBane RD, et al. Regional anesthesia in the
 * patient receiving antithrombotic or thrombolytic therapy: American
 * Society of Regional Anesthesia and Pain Medicine Evidence-Based
 * Guidelines (fifth edition). Reg Anesth Pain Med 2025;0:1–29.
 * doi:10.1136/rapm-2024-105766
 *
 * Texto extraído e verificado célula a célula (posição x/y no PDF, não só
 * fluxo de texto simples) para evitar embaralhamento entre colunas da
 * tabela — ver histórico de revisão. Indicações usam o texto completo do
 * guideline, não resumos, para não perder nuances clínicas (ex.: "pelo
 * menos 2 de 3 critérios", não "os 3").
 */
export const DOACS: Doac[] = [
  {
    id: "apixaban",
    nomeGenerico: "Apixaban",
    nomesComerciais: ["Eliquis"],
    indicacoes: [
      {
        id: "apixaban_tvp_recorrencia",
        descricao: "Redução do risco de recorrência de TVP e/ou EP, após terapia inicial",
        dose: "2,5 mg, via oral, 2x/dia",
        nivel: "baixa",
      },
      {
        id: "apixaban_profilaxia_atq_atj",
        descricao: "Profilaxia de TVP após artroplastia total de quadril (ATQ) ou de joelho (ATJ)",
        dose: "2,5 mg, via oral, 2x/dia",
        nivel: "baixa",
      },
      {
        id: "apixaban_fanv",
        descricao:
          "Redução do risco de AVC e embolismo sistêmico em fibrilação atrial não valvar (FANV). Dose reduzida para 2,5 mg 2x/dia se o paciente tiver PELO MENOS 2 dos 3 critérios: idade ≥80 anos, peso corporal <60 kg, ou creatinina sérica ≥1,5 mg/dL",
        dose: "5 mg (ou 2,5 mg se ≥2 de 3 critérios), via oral, 2x/dia",
        nivel: "alta",
      },
      {
        id: "apixaban_tvp_ep_tratamento",
        descricao:
          "Tratamento de TVP e EP. Reduzir a dose em 50% se uso concomitante de inibidores fortes de P-gp e CYP3A4 (ex.: cetoconazol, itraconazol, ritonavir)",
        dose: "10 mg 2x/dia por 7 dias, depois 5 mg 2x/dia",
        nivel: "alta",
      },
    ],
    regras: {
      baixa: {
        faixasCrCl: [{ min: null, max: null, horasSuspensao: 36 }],
        horasAteRetomar: 6,
        nivelResidualAceitavel: "<30 ng/mL (ou atividade anti-Xa ≤0,1 UI/mL)",
      },
      alta: {
        faixasCrCl: [{ min: null, max: null, horasSuspensao: 72 }],
        horasAteRetomar: 24,
        nivelResidualAceitavel: "<30 ng/mL (ou atividade anti-Xa ≤0,1 UI/mL)",
      },
    },
  },
  {
    id: "edoxaban",
    nomeGenerico: "Edoxaban",
    nomesComerciais: ["Savaysa", "Lixiana"],
    indicacoes: [
      {
        id: "edoxaban_fanv",
        descricao:
          "Redução do risco de AVC e embolismo sistêmico em FANV. CrCl 50–95 mL/min: 60 mg 1x/dia. CrCl 15–50 mL/min: 30 mg 1x/dia. NÃO USAR se CrCl >95 mL/min (sem indicação aprovada acima desse valor)",
        dose: "60 mg (ou 30 mg conforme CrCl), via oral, 1x/dia",
        nivel: "alta",
      },
      {
        id: "edoxaban_tvp_ep",
        descricao:
          "Tratamento de TVP e EP. Reduzir para 30 mg 1x/dia se CrCl 15–50 mL/min, ou peso corporal ≤60 kg, ou uso concomitante de inibidores de P-gp",
        dose: "60 mg (ou 30 mg conforme fatores acima), via oral, 1x/dia",
        nivel: "alta",
      },
    ],
    regras: {
      // Não existe indicação de dose baixa aprovada pela FDA para edoxaban.
      alta: {
        faixasCrCl: [{ min: null, max: null, horasSuspensao: 72 }],
        horasAteRetomar: 24,
        nivelResidualAceitavel: "<30 ng/mL (ou atividade anti-Xa ≤0,1 UI/mL)",
      },
    },
  },
  {
    id: "rivaroxaban",
    nomeGenerico: "Rivaroxaban",
    nomesComerciais: ["Xarelto"],
    indicacoes: [
      {
        id: "rivaroxaban_tvp_recorrencia",
        descricao:
          "Redução do risco de recorrência de TVP e/ou EP em pacientes com risco continuado. CrCl >15 mL/min: 10 mg 1x/dia. CrCl <15 mL/min: evitar uso",
        dose: "10 mg, via oral, 1x/dia",
        nivel: "baixa",
      },
      {
        id: "rivaroxaban_profilaxia_atq_atj",
        descricao:
          "Profilaxia de TVP após artroplastia total de quadril (ATQ) ou de joelho (ATJ). CrCl >15 mL/min: 10 mg 1x/dia. CrCl <15 mL/min: evitar uso",
        dose: "10 mg, via oral, 1x/dia",
        nivel: "baixa",
      },
      {
        id: "rivaroxaban_profilaxia_tev_clinico",
        descricao:
          "Profilaxia de TEV em pacientes clínicos agudamente enfermos, com risco de complicações tromboembólicas e sem alto risco de sangramento. CrCl >15 mL/min: 10 mg 1x/dia. CrCl <15 mL/min: evitar uso",
        dose: "10 mg, via oral, 1x/dia",
        nivel: "baixa",
      },
      {
        id: "rivaroxaban_dac",
        descricao:
          "Redução do risco de eventos cardiovasculares maiores (morte cardiovascular, IAM e AVC) em doença arterial coronariana (DAC). Sem ajuste de dose por CrCl",
        dose: "2,5 mg 2x/dia + AAS 75–100 mg 1x/dia",
        nivel: "baixa",
      },
      {
        id: "rivaroxaban_dap",
        descricao:
          "Redução do risco de eventos trombóticos vasculares maiores em doença arterial periférica (DAP), incluindo pacientes após revascularização recente de membro inferior por DAP sintomática. Sem ajuste de dose por CrCl",
        dose: "2,5 mg 2x/dia + AAS 75–100 mg 1x/dia",
        nivel: "baixa",
      },
      {
        id: "rivaroxaban_fanv",
        descricao:
          "Redução do risco de AVC e embolismo sistêmico em FANV. CrCl >50 mL/min: 20 mg 1x/dia. CrCl 15–50 mL/min: 15 mg 1x/dia",
        dose: "20 mg (ou 15 mg conforme CrCl), via oral, 1x/dia",
        nivel: "alta",
      },
      {
        id: "rivaroxaban_tvp_ep_tratamento",
        descricao:
          "Tratamento de TVP, EP, e redução do risco de recorrência de TVP e EP. CrCl >15 mL/min",
        dose: "15 mg 2x/dia por 21 dias, depois 20 mg 1x/dia",
        nivel: "alta",
      },
    ],
    regras: {
      baixa: {
        faixasCrCl: [
          { min: 30, max: null, horasSuspensao: 24 },
          { min: null, max: 29, horasSuspensao: 30 },
        ],
        horasAteRetomar: 6,
        nivelResidualAceitavel: "<30 ng/mL (ou atividade anti-Xa ≤0,1 UI/mL)",
      },
      alta: {
        faixasCrCl: [{ min: null, max: null, horasSuspensao: 72 }],
        horasAteRetomar: 24,
        nivelResidualAceitavel: "<30 ng/mL (ou atividade anti-Xa ≤0,1 UI/mL)",
      },
    },
  },
  {
    id: "dabigatran",
    nomeGenerico: "Dabigatran",
    nomesComerciais: ["Pradaxa"],
    indicacoes: [
      {
        id: "dabigatran_profilaxia_atq",
        descricao:
          "Profilaxia de TVP e EP após artroplastia total de quadril (ATQ). CrCl >30 mL/min: 110 mg no primeiro dia, depois 220 mg 1x/dia. Evitar coadministração se CrCl <50 mL/min e uso concomitante de inibidores de P-gp (ex.: dronedarona, cetoconazol sistêmico)",
        dose: "110 mg (1º dia) → 220 mg 1x/dia",
        nivel: "baixa",
      },
      {
        id: "dabigatran_fanv",
        descricao:
          "Redução do risco de AVC e embolismo sistêmico em FANV. CrCl >30 mL/min: 150 mg 2x/dia. CrCl 30–50 mL/min com inibidor de P-gp, ou CrCl 15–30 mL/min: 75 mg 2x/dia. Evitar coadministração se CrCl <30 mL/min e uso de inibidor de P-gp",
        dose: "150 mg (ou 75 mg conforme CrCl/interação), via oral, 2x/dia",
        nivel: "alta",
      },
      {
        id: "dabigatran_tvp_ep_tratamento",
        descricao: "Tratamento de TVP e EP. CrCl >30 mL/min",
        dose: "150 mg, via oral, 2x/dia",
        nivel: "alta",
      },
      {
        id: "dabigatran_tvp_recorrencia",
        descricao: "Redução do risco de recorrência de TVP e EP. CrCl >30 mL/min",
        dose: "150 mg, via oral, 2x/dia",
        nivel: "alta",
      },
    ],
    regras: {
      baixa: {
        faixasCrCl: [{ min: null, max: null, horasSuspensao: 48 }],
        contraindicadoAbaixoCrCl: 30,
        horasAteRetomar: 6,
        nivelResidualAceitavel: "<30 ng/mL",
      },
      alta: {
        faixasCrCl: [
          { min: 50, max: null, horasSuspensao: 72 },
          { min: 30, max: 49, horasSuspensao: 120 },
        ],
        contraindicadoAbaixoCrCl: 30,
        horasAteRetomar: 24,
        nivelResidualAceitavel: "<30 ng/mL",
      },
    },
  },
];

export const DOAC_OUTRO_ID = "outro";

export function buscarDoac(id: string | null): Doac | null {
  if (!id) return null;
  return DOACS.find((d) => d.id === id) ?? null;
}

export function buscarIndicacao(doac: Doac | null, indicacaoId: string | null) {
  if (!doac || !indicacaoId) return null;
  return doac.indicacoes.find((i) => i.id === indicacaoId) ?? null;
}

export function rotuloDoac(d: Doac): string {
  return `${d.nomeGenerico} (${d.nomesComerciais.join(", ")})`;
}
