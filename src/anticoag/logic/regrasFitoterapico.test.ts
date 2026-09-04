import { gerarRecomendacaoFitoterapicoItem } from "./regrasFitoterapico";
import { FITOTERAPICOS } from "@/anticoag/data/fitoterapicos";

describe("fitoterápicos", () => {
  test("todos os 33 fitoterápicos do artigo estão cadastrados", () => {
    expect(FITOTERAPICOS).toHaveLength(33);
  });

  test.each(
    FITOTERAPICOS.filter((f) => f.regra.tipo === "suspender_periodo_fixo").map((f) => f.id)
  )("%s: gera dias de suspensão a partir da regra cadastrada", (id) => {
    const r = gerarRecomendacaoFitoterapicoItem(id);
    expect(r.decisao).toBe("calculada");
    expect(r.diasSuspensao).toBeGreaterThan(0);
    expect(r.medicamentoNome).toBeTruthy();
    expect(r.racional).toBeTruthy();
    expect(r.situacoesEspeciais).toBeTruthy();
  });

  test("cannabis: decisão individualizada, sem dias fixos", () => {
    const r = gerarRecomendacaoFitoterapicoItem("cannabis");
    expect(r.decisao).toBe("calculada");
    expect(r.diasSuspensao).toBeNull();
    expect(r.motivoIndividualizado).toBeTruthy();
  });

  test("ginkgo: usa o extremo mais conservador da faixa (2 semanas)", () => {
    const r = gerarRecomendacaoFitoterapicoItem("ginkgo");
    expect(r.diasSuspensao).toBe(14);
  });

  test("id inexistente fica indeterminado", () => {
    const r = gerarRecomendacaoFitoterapicoItem("nao_existe");
    expect(r.decisao).toBe("indeterminado");
    expect(r.motivoIndeterminado).toBeTruthy();
  });
});
