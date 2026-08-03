import { gerarRecomendacaoFitoterapico } from "./regrasFitoterapico";
import { FITOTERAPICOS } from "@/anticoag/data/fitoterapicos";
import { RespostasQuestionario } from "@/anticoag/types";

function respostasBase(overrides: Partial<RespostasQuestionario> = {}): RespostasQuestionario {
  return {
    classe: "fitoterapico",
    medicamentoId: null,
    indicacaoId: null,
    funcaoRenalOpcao: null,
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

describe("fitoterápicos", () => {
  test("todos os 33 fitoterápicos do artigo estão cadastrados", () => {
    expect(FITOTERAPICOS).toHaveLength(33);
  });

  test.each(
    FITOTERAPICOS.filter((f) => f.regra.tipo === "suspender_periodo_fixo").map((f) => f.id)
  )("%s: gera dias de suspensão a partir da regra cadastrada", (id) => {
    const r = gerarRecomendacaoFitoterapico(respostasBase({ fitoterapicoId: id }));
    expect(r.decisao).toBe("calculada");
    expect(r.diasSuspensao).toBeGreaterThan(0);
    expect(r.medicamentoNome).toBeTruthy();
    expect(r.racional).toBeTruthy();
    expect(r.situacoesEspeciais).toBeTruthy();
  });

  test("cannabis: decisão individualizada, sem dias fixos", () => {
    const r = gerarRecomendacaoFitoterapico(respostasBase({ fitoterapicoId: "cannabis" }));
    expect(r.decisao).toBe("calculada");
    expect(r.diasSuspensao).toBeNull();
    expect(r.motivoIndividualizado).toBeTruthy();
  });

  test("ginkgo: usa o extremo mais conservador da faixa (2 semanas)", () => {
    const r = gerarRecomendacaoFitoterapico(respostasBase({ fitoterapicoId: "ginkgo" }));
    expect(r.diasSuspensao).toBe(14);
  });

  test("sem fitoterápico selecionado, fica indeterminado", () => {
    const r = gerarRecomendacaoFitoterapico(respostasBase());
    expect(r.decisao).toBe("indeterminado");
    expect(r.motivoIndeterminado).toBeTruthy();
  });

  test("id inexistente também fica indeterminado", () => {
    const r = gerarRecomendacaoFitoterapico(respostasBase({ fitoterapicoId: "nao_existe" }));
    expect(r.decisao).toBe("indeterminado");
  });
});
