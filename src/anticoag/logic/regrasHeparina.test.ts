import { gerarRecomendacaoHbpm, gerarRecomendacaoHnf } from "./regrasHeparina";
import { RespostasQuestionario } from "@/anticoag/types";

function base(overrides: Partial<RespostasQuestionario> = {}): RespostasQuestionario {
  return {
    classe: "hnf",
    medicamentoId: null,
    indicacaoId: null,
    funcaoRenalOpcao: null,
    crClExata: null,
    viaHnf: null,
    doseHbpm: null,
    frequenciaHbpm: null,
    antiplaquetarioId: null,
    doseAtaquePosOp: null,
    ...overrides,
  };
}

describe("Heparina não fracionada (HNF)", () => {
  test("via IV: 6h de suspensão, retomar 1h após", () => {
    const r = gerarRecomendacaoHnf(base({ viaHnf: "iv" }));
    expect(r.decisao).toBe("calculada");
    expect(r.horasSuspensao).toBe(6);
    expect(r.horasAteRetomar).toBe(1);
  });

  test("subcutânea profilática: 6h de suspensão", () => {
    const r = gerarRecomendacaoHnf(base({ viaHnf: "sc_baixa" }));
    expect(r.horasSuspensao).toBe(6);
  });

  test("subcutânea dose alta, patamar 12h", () => {
    const r = gerarRecomendacaoHnf(base({ viaHnf: "sc_alta_12h" }));
    expect(r.horasSuspensao).toBe(12);
  });

  test("subcutânea dose alta, patamar 24h", () => {
    const r = gerarRecomendacaoHnf(base({ viaHnf: "sc_alta_24h" }));
    expect(r.horasSuspensao).toBe(24);
  });

  test("sem via informada: indeterminado", () => {
    const r = gerarRecomendacaoHnf(base());
    expect(r.decisao).toBe("indeterminado");
  });
});

describe("Heparina de baixo peso molecular (HBPM)", () => {
  test("dose alta: 24h de suspensão, retomar 24h após", () => {
    const r = gerarRecomendacaoHbpm(base({ classe: "hbpm", doseHbpm: "alta" }));
    expect(r.decisao).toBe("calculada");
    expect(r.horasSuspensao).toBe(24);
    expect(r.horasAteRetomar).toBe(24);
  });

  test("dose baixa, 1x/dia: 12h de suspensão, observação menciona manter cateter", () => {
    const r = gerarRecomendacaoHbpm(
      base({ classe: "hbpm", doseHbpm: "baixa", frequenciaHbpm: "uma_vez_dia" })
    );
    expect(r.horasSuspensao).toBe(12);
    expect(r.observacaoRetomada).toMatch(/pode ser mantido/);
  });

  test("dose baixa, 2x/dia: mesma suspensão de 12h, mas observação exige retirar cateter antes", () => {
    const r = gerarRecomendacaoHbpm(
      base({ classe: "hbpm", doseHbpm: "baixa", frequenciaHbpm: "duas_vezes_dia" })
    );
    expect(r.horasSuspensao).toBe(12);
    expect(r.observacaoRetomada).toMatch(/deve ser retirado ANTES/);
  });

  test("dose baixa sem frequência informada: indeterminado", () => {
    const r = gerarRecomendacaoHbpm(base({ classe: "hbpm", doseHbpm: "baixa" }));
    expect(r.decisao).toBe("indeterminado");
  });

  test("sem dose informada: indeterminado", () => {
    const r = gerarRecomendacaoHbpm(base({ classe: "hbpm" }));
    expect(r.decisao).toBe("indeterminado");
  });
});
