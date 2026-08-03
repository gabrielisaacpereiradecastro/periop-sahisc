import { gerarRecomendacaoFitoterapico } from "./regrasFitoterapico";
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
  test.each(["alho", "ginkgo", "ginseng"])(
    "%s: não é necessário suspender, sem restrição à técnica",
    (id) => {
      const r = gerarRecomendacaoFitoterapico(respostasBase({ fitoterapicoId: id }));
      expect(r.decisao).toBe("calculada");
      expect(r.semRestricao).toBe(true);
      expect(r.horasSuspensao).toBeNull();
      expect(r.medicamentoNome).toBeTruthy();
      expect(r.detalhe).toBeTruthy();
    }
  );

  test("sem fitoterápico selecionado, fica indeterminado", () => {
    const r = gerarRecomendacaoFitoterapico(respostasBase());
    expect(r.decisao).toBe("indeterminado");
    expect(r.motivoIndeterminado).toBeTruthy();
  });
});
