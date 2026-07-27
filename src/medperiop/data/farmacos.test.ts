import { TODOS_FARMACOS } from "@/medperiop/data/farmacos";

/**
 * Testes de integridade estrutural da base de dados combinada. Não valida
 * conteúdo clínico (isso foi conferido na extração, ver
 * ~/Desktop/MedPeriOp-extracao-SPAQI/*.md) — valida só que os 7 arquivos de
 * dados, escritos independentemente, formam um conjunto internamente
 * consistente com o sistema de tipos e entre si.
 */
describe("integridade da base de dados", () => {
  test("todo fármaco tem exatamente uma fonte de regra (regra XOR indicacoes XOR condicaoClinica)", () => {
    const semNenhuma = TODOS_FARMACOS.filter(
      (f) => !f.regra && !f.indicacoes && !f.condicaoClinica
    );
    const comMaisDeUma = TODOS_FARMACOS.filter(
      (f) => [f.regra, f.indicacoes, f.condicaoClinica].filter(Boolean).length > 1
    );
    expect(semNenhuma).toEqual([]);
    expect(comMaisDeUma).toEqual([]);
  });

  test("nenhum id duplicado dentro da mesma classe (buscarFarmaco depende disso)", () => {
    const chaveCount = new Map<string, number>();
    for (const f of TODOS_FARMACOS) {
      const chave = `${f.classe}::${f.id}`;
      chaveCount.set(chave, (chaveCount.get(chave) ?? 0) + 1);
    }
    const duplicados = Array.from(chaveCount.entries()).filter(([, n]) => n > 1);
    expect(duplicados).toEqual([]);
  });

  test("fonteReferenciaNumero está entre 1 e 8 (aponta para REFERENCIAS)", () => {
    const foraDoIntervalo = TODOS_FARMACOS.filter(
      (f) => f.fonteReferenciaNumero < 1 || f.fonteReferenciaNumero > 8
    );
    expect(foraDoIntervalo).toEqual([]);
  });

  test("suspender_periodo_fixo sempre tem valor e unidade definidos", () => {
    function regrasDoFarmaco(f: (typeof TODOS_FARMACOS)[number]) {
      if (f.regra) return [f.regra];
      if (f.indicacoes) return f.indicacoes.map((i) => i.regra);
      if (f.condicaoClinica) return [f.condicaoClinica.regraSeSim, f.condicaoClinica.regraSeNao];
      return [];
    }
    const invalidas = TODOS_FARMACOS.flatMap((f) =>
      regrasDoFarmaco(f).filter(
        (r) => r.tipo === "suspender_periodo_fixo" && (r.valor === undefined || r.unidade === undefined)
      )
    );
    expect(invalidas).toEqual([]);
  });

  test("base tem uma quantidade razoável de fármacos por classe (detecta arquivo vazio/quebrado)", () => {
    const porClasse: Record<string, number> = {};
    for (const f of TODOS_FARMACOS) {
      porClasse[f.classe] = (porClasse[f.classe] ?? 0) + 1;
    }
    for (const classe of [
      "cardiovascular",
      "endocrino",
      "gi-pulmonar",
      "neurologico",
      "psiquiatrico",
      "reumatologico-hiv",
      "analgesicos",
    ]) {
      expect(porClasse[classe] ?? 0).toBeGreaterThan(5);
    }
  });
});
