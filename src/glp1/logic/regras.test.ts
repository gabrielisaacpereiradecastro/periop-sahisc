import { gerarRecomendacao } from "./regras";
import { MEDICAMENTO_OUTRO_ID } from "@/glp1/data/medicamentos";
import { RespostasQuestionario } from "@/glp1/types";

function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function somarDias(dataISO: string, dias: number): string {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const d = new Date(ano, mes - 1, dia);
  d.setDate(d.getDate() + dias);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Espelha o fluxograma da Nota SBA C.SBA-01744/2026. Cada teste aqui
 * corresponde a um ramo específico do fluxograma (Passos 1 a 4) — se o
 * protocolo mudar, é aqui que a mudança precisa ser refletida primeiro.
 */
function respostasBase(overrides: Partial<RespostasQuestionario> = {}): RespostasQuestionario {
  return {
    medicamentoId: "semaglutida_sc", // longa ação, 7 dias
    usoMenosDe12Semanas: "nao",
    aumentoDoseUltimos3Meses: "nao",
    usoIrregular: "nao",
    sintomasGI: "nao",
    fatoresPaciente: [],
    fatoresTecnicaAnestesica: [],
    dataCirurgia: "2026-08-10",
    pocusDisponivel: "sim",
    ...overrides,
  };
}

describe("caso base: sem fatores de risco, uso estável, POCUS disponível", () => {
  test("mantém a dose habitual", () => {
    const r = gerarRecomendacao(respostasBase());
    expect(r.decisao).toBe("manter");
    expect(r.dataCorteSuspensao).toBeNull();
    expect(r.diasSuspensao).toBeNull();
    expect(r.fatoresIdentificados).toHaveLength(0);
    expect(r.usouEstratificacaoDeRisco).toBe(true);
  });
});

describe("sem disponibilidade de POCUS gástrico", () => {
  test("suspende mesmo sem nenhum fator de risco (medicamento de longa ação: 7 dias)", () => {
    const r = gerarRecomendacao(respostasBase({ pocusDisponivel: "nao" }));
    expect(r.decisao).toBe("suspender");
    expect(r.diasSuspensao).toBe(7);
    expect(r.dataCorteSuspensao).toBe("2026-08-03");
    expect(r.usouEstratificacaoDeRisco).toBe(false);
  });

  test("'não sei' sobre disponibilidade de POCUS é tratado como indisponível", () => {
    const r = gerarRecomendacao(respostasBase({ pocusDisponivel: "nao_sei" }));
    expect(r.decisao).toBe("suspender");
    expect(r.usouEstratificacaoDeRisco).toBe(false);
  });

  test("medicamento de curta ação suspende por 1 dia", () => {
    const r = gerarRecomendacao(
      respostasBase({ medicamentoId: "liraglutida", pocusDisponivel: "nao" })
    );
    expect(r.diasSuspensao).toBe(1);
    expect(r.dataCorteSuspensao).toBe("2026-08-09");
  });
});

describe("fatores de risco individuais (com POCUS disponível)", () => {
  test("uso há menos de 12 semanas leva à suspensão", () => {
    const r = gerarRecomendacao(respostasBase({ usoMenosDe12Semanas: "sim" }));
    expect(r.decisao).toBe("suspender");
    expect(r.fatoresIdentificados).toContain("Início de uso há menos de 12 semanas");
  });

  test("aumento de dose nos últimos 3 meses leva à suspensão", () => {
    const r = gerarRecomendacao(respostasBase({ aumentoDoseUltimos3Meses: "sim" }));
    expect(r.decisao).toBe("suspender");
  });

  test("uso irregular leva à suspensão", () => {
    const r = gerarRecomendacao(respostasBase({ usoIrregular: "sim" }));
    expect(r.decisao).toBe("suspender");
  });

  test("sintomas gastrointestinais levam à suspensão", () => {
    const r = gerarRecomendacao(respostasBase({ sintomasGI: "sim" }));
    expect(r.decisao).toBe("suspender");
  });

  test("fator de risco do paciente (checklist) leva à suspensão", () => {
    const r = gerarRecomendacao(respostasBase({ fatoresPaciente: ["hba1c_alto"] }));
    expect(r.decisao).toBe("suspender");
    expect(r.fatoresIdentificados[0]).toMatch(/HbA1c/);
  });

  test("fator de técnica anestésica leva à suspensão", () => {
    const r = gerarRecomendacao(
      respostasBase({ fatoresTecnicaAnestesica: ["sedacao_prolongada"] })
    );
    expect(r.decisao).toBe("suspender");
    expect(r.fatoresIdentificados[0]).toMatch(/Sedação prolongada/);
  });
});

describe("medicamento não coberto pelo protocolo", () => {
  test("responde 'indeterminado' em vez de arriscar um palpite", () => {
    const r = gerarRecomendacao(respostasBase({ medicamentoId: MEDICAMENTO_OUTRO_ID }));
    expect(r.decisao).toBe("indeterminado");
    expect(r.medicamento).toBeNull();
    expect(r.motivoIndeterminado).toBeTruthy();
  });

  test("medicamento nulo também é indeterminado", () => {
    const r = gerarRecomendacao(respostasBase({ medicamentoId: null }));
    expect(r.decisao).toBe("indeterminado");
  });
});

describe("casos sem data de cirurgia informada", () => {
  test("ainda calcula os dias de suspensão, mas não a data de corte", () => {
    const r = gerarRecomendacao(
      respostasBase({ dataCirurgia: null, pocusDisponivel: "nao" })
    );
    expect(r.decisao).toBe("suspender");
    expect(r.diasSuspensao).toBe(7);
    expect(r.dataCorteSuspensao).toBeNull();
    expect(r.falhaJanelaSuspensao).toBe(false);
  });
});

describe("falha de janela de suspensão (não há mais tempo hábil)", () => {
  test("cirurgia amanhã com medicamento de longa ação (7 dias): falha", () => {
    const r = gerarRecomendacao(
      respostasBase({ dataCirurgia: somarDias(hojeISO(), 1), pocusDisponivel: "nao" })
    );
    expect(r.decisao).toBe("suspender");
    expect(r.falhaJanelaSuspensao).toBe(true);
    expect(r.dataCorteSuspensao).toBe(somarDias(hojeISO(), -6));
  });

  test("cirurgia em 6 dias com medicamento de longa ação (7 dias): falha por 1 dia", () => {
    const r = gerarRecomendacao(
      respostasBase({ dataCirurgia: somarDias(hojeISO(), 6), pocusDisponivel: "nao" })
    );
    expect(r.falhaJanelaSuspensao).toBe(true);
  });

  test("cirurgia em exatamente 7 dias: ainda dá tempo (corte = hoje, não é falha)", () => {
    const r = gerarRecomendacao(
      respostasBase({ dataCirurgia: somarDias(hojeISO(), 7), pocusDisponivel: "nao" })
    );
    expect(r.dataCorteSuspensao).toBe(hojeISO());
    expect(r.falhaJanelaSuspensao).toBe(false);
  });

  test("cirurgia em 10 dias: bastante tempo, sem falha", () => {
    const r = gerarRecomendacao(
      respostasBase({ dataCirurgia: somarDias(hojeISO(), 10), pocusDisponivel: "nao" })
    );
    expect(r.falhaJanelaSuspensao).toBe(false);
  });

  test("falha também ocorre quando a suspensão vem de fator de risco (não só falta de POCUS)", () => {
    const r = gerarRecomendacao(
      respostasBase({
        dataCirurgia: somarDias(hojeISO(), 1),
        pocusDisponivel: "sim",
        sintomasGI: "sim",
      })
    );
    expect(r.decisao).toBe("suspender");
    expect(r.falhaJanelaSuspensao).toBe(true);
  });

  test("medicamento de curta ação (1 dia): cirurgia amanhã ainda dá tempo", () => {
    const r = gerarRecomendacao(
      respostasBase({
        medicamentoId: "liraglutida",
        dataCirurgia: somarDias(hojeISO(), 1),
        pocusDisponivel: "nao",
      })
    );
    expect(r.dataCorteSuspensao).toBe(hojeISO());
    expect(r.falhaJanelaSuspensao).toBe(false);
  });

  test("manter dose habitual nunca é falha de janela", () => {
    const r = gerarRecomendacao(respostasBase());
    expect(r.falhaJanelaSuspensao).toBe(false);
  });
});
