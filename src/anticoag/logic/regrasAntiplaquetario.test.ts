import { gerarRecomendacaoAntiplaquetario } from "./regrasAntiplaquetario";
import { RespostasQuestionario } from "@/anticoag/types";

function base(overrides: Partial<RespostasQuestionario> = {}): RespostasQuestionario {
  return {
    classe: "antiplaquetario",
    medicamentoId: null,
    indicacaoId: null,
    funcaoRenalOpcao: null,
    crClExata: null,
    viaHnf: null,
    doseHbpm: null,
    frequenciaHbpm: null,
    antiplaquetarioId: null,
    doseAtaquePosOp: null,
    fitoterapicoIds: [],
    ...overrides,
  };
}

describe("AAS/AINEs", () => {
  test("sem restrição — não precisa suspender", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "aas_aine" }));
    expect(r.decisao).toBe("calculada");
    expect(r.semRestricao).toBe(true);
    expect(r.horasSuspensao).toBe(0);
  });
});

describe("Clopidogrel", () => {
  test("suspender 168h (7 dias); sem dose de ataque, retomar imediatamente", () => {
    const r = gerarRecomendacaoAntiplaquetario(
      base({ antiplaquetarioId: "clopidogrel", doseAtaquePosOp: "nao" })
    );
    expect(r.horasSuspensao).toBe(168);
    expect(r.horasAteRetomar).toBe(0);
  });

  test("com dose de ataque no pós-operatório: retomar em 6h", () => {
    const r = gerarRecomendacaoAntiplaquetario(
      base({ antiplaquetarioId: "clopidogrel", doseAtaquePosOp: "sim" })
    );
    expect(r.horasAteRetomar).toBe(6);
  });

  test("sem responder sobre dose de ataque: indeterminado", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "clopidogrel" }));
    expect(r.decisao).toBe("indeterminado");
  });
});

describe("Prasugrel", () => {
  test("suspender 240h (10 dias)", () => {
    const r = gerarRecomendacaoAntiplaquetario(
      base({ antiplaquetarioId: "prasugrel", doseAtaquePosOp: "nao" })
    );
    expect(r.horasSuspensao).toBe(240);
  });
});

describe("Ticagrelor", () => {
  test("suspender 120h (5 dias)", () => {
    const r = gerarRecomendacaoAntiplaquetario(
      base({ antiplaquetarioId: "ticagrelor", doseAtaquePosOp: "nao" })
    );
    expect(r.horasSuspensao).toBe(120);
  });
});

describe("Cilostazol", () => {
  test("suspender 48h (2 dias), retomar 6h após retirada do cateter", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "cilostazol" }));
    expect(r.horasSuspensao).toBe(48);
    expect(r.horasAteRetomar).toBe(6);
  });
});

describe("Cangrelor", () => {
  test("suspender 3h, retomar 8h após retirada do cateter", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "cangrelor" }));
    expect(r.horasSuspensao).toBe(3);
    expect(r.horasAteRetomar).toBe(8);
  });
});

describe("Inibidores GP IIb/IIIa", () => {
  test("abciximab: suspender 48h, retomada individualizada (sem número fixo)", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "abciximab" }));
    expect(r.horasSuspensao).toBe(48);
    expect(r.horasAteRetomar).toBeNull();
    expect(r.observacaoRetomada).toMatch(/individualmente/);
  });

  test("eptifibatide/tirofiban: suspender 8h", () => {
    const r = gerarRecomendacaoAntiplaquetario(
      base({ antiplaquetarioId: "eptifibatide_tirofiban" })
    );
    expect(r.horasSuspensao).toBe(8);
  });
});

describe("medicamento não encontrado", () => {
  test("indeterminado", () => {
    const r = gerarRecomendacaoAntiplaquetario(base({ antiplaquetarioId: "varfarina" }));
    expect(r.decisao).toBe("indeterminado");
  });
});
