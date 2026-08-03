import { gerarRecomendacaoDoac } from "./regras";
import { RespostasQuestionario } from "@/anticoag/types";

function base(overrides: Partial<RespostasQuestionario> = {}): RespostasQuestionario {
  return {
    classe: "doac",
    medicamentoId: "apixaban",
    indicacaoId: "apixaban_tvp_recorrencia",
    funcaoRenalOpcao: "normal",
    crClExata: null,
    viaHnf: null,
    doseHbpm: null,
    frequenciaHbpm: null,
    antiplaquetarioId: null,
    doseAtaquePosOp: null,
    fitoterapicoId: null,
    ...overrides,
  };
}

describe("Apixaban", () => {
  test("dose baixa: 36h de suspensão, retomar 6h após", () => {
    const r = gerarRecomendacaoDoac(base());
    expect(r.decisao).toBe("calculada");
    expect(r.nivel).toBe("baixa");
    expect(r.horasSuspensao).toBe(36);
    expect(r.horasAteRetomar).toBe(6);
    expect(r.contraindicado).toBe(false);
  });

  test("dose alta (FANV): 72h de suspensão, retomar 24h após, independe de CrCl", () => {
    const r = gerarRecomendacaoDoac(
      base({ indicacaoId: "apixaban_fanv", funcaoRenalOpcao: "exata", crClExata: 20 })
    );
    expect(r.nivel).toBe("alta");
    expect(r.horasSuspensao).toBe(72);
    expect(r.horasAteRetomar).toBe(24);
  });
});

describe("Edoxaban", () => {
  test("dose alta (FANV): 72h de suspensão, retomar 24h após", () => {
    const r = gerarRecomendacaoDoac(
      base({ medicamentoId: "edoxaban", indicacaoId: "edoxaban_fanv" })
    );
    expect(r.decisao).toBe("calculada");
    expect(r.nivel).toBe("alta");
    expect(r.horasSuspensao).toBe(72);
  });
});

describe("Rivaroxaban", () => {
  test("dose baixa (DAC + AAS), CrCl normal: 24h de suspensão", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "rivaroxaban",
        indicacaoId: "rivaroxaban_dac",
        funcaoRenalOpcao: "exata",
        crClExata: 60,
      })
    );
    expect(r.nivel).toBe("baixa");
    expect(r.horasSuspensao).toBe(24);
    expect(r.horasAteRetomar).toBe(6);
  });

  test("dose baixa, CrCl <30: 30h de suspensão (faixa renal reduzida)", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "rivaroxaban",
        indicacaoId: "rivaroxaban_profilaxia_atq_atj",
        funcaoRenalOpcao: "exata",
        crClExata: 20,
      })
    );
    expect(r.horasSuspensao).toBe(30);
  });

  test("dose alta (FANV): 72h de suspensão fixas, independente de CrCl", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "rivaroxaban",
        indicacaoId: "rivaroxaban_fanv",
        funcaoRenalOpcao: "exata",
        crClExata: 18,
      })
    );
    expect(r.horasSuspensao).toBe(72);
  });
});

describe("Dabigatran", () => {
  test("dose baixa, CrCl normal: 48h de suspensão, não contraindicado", () => {
    const r = gerarRecomendacaoDoac(
      base({ medicamentoId: "dabigatran", indicacaoId: "dabigatran_profilaxia_atq" })
    );
    expect(r.horasSuspensao).toBe(48);
    expect(r.contraindicado).toBe(false);
  });

  test("dose baixa, CrCl <30: contraindicado", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "dabigatran",
        indicacaoId: "dabigatran_profilaxia_atq",
        funcaoRenalOpcao: "exata",
        crClExata: 25,
      })
    );
    expect(r.contraindicado).toBe(true);
  });

  test("dose alta, CrCl ≥50: 72h de suspensão", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "dabigatran",
        indicacaoId: "dabigatran_fanv",
        funcaoRenalOpcao: "exata",
        crClExata: 55,
      })
    );
    expect(r.horasSuspensao).toBe(72);
    expect(r.contraindicado).toBe(false);
  });

  test("dose alta, CrCl 30–49: 120h de suspensão", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "dabigatran",
        indicacaoId: "dabigatran_fanv",
        funcaoRenalOpcao: "exata",
        crClExata: 40,
      })
    );
    expect(r.horasSuspensao).toBe(120);
  });

  test("dose alta, CrCl <30: contraindicado", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "dabigatran",
        indicacaoId: "dabigatran_fanv",
        funcaoRenalOpcao: "exata",
        crClExata: 25,
      })
    );
    expect(r.contraindicado).toBe(true);
  });

  test("função renal 'reduzida, desconhecida' cai na faixa 30–49 (120h), não presume contraindicação", () => {
    const r = gerarRecomendacaoDoac(
      base({
        medicamentoId: "dabigatran",
        indicacaoId: "dabigatran_fanv",
        funcaoRenalOpcao: "reduzida_desconhecida",
      })
    );
    expect(r.horasSuspensao).toBe(120);
    expect(r.contraindicado).toBe(false);
  });
});

describe("casos indeterminados", () => {
  test("medicamento não encontrado", () => {
    const r = gerarRecomendacaoDoac(base({ medicamentoId: "varfarina" }));
    expect(r.decisao).toBe("indeterminado");
  });

  test("indicação não encontrada para o medicamento selecionado", () => {
    const r = gerarRecomendacaoDoac(base({ indicacaoId: "indicacao_inexistente" }));
    expect(r.decisao).toBe("indeterminado");
  });
});
