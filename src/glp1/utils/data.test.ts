import { dataEhFutura, formatarDataExtenso, montarISO, subtrairDias } from "./data";

describe("montarISO", () => {
  test("monta data válida", () => {
    expect(montarISO(15, 7, 2026)).toBe("2026-07-15");
  });

  test("rejeita 29 de fevereiro em ano não bissexto", () => {
    expect(montarISO(29, 2, 2026)).toBeNull();
  });

  test("aceita 29 de fevereiro em ano bissexto", () => {
    expect(montarISO(29, 2, 2028)).toBe("2028-02-29");
  });

  test("rejeita dia 31 em mês de 30 dias", () => {
    expect(montarISO(31, 4, 2026)).toBeNull();
  });

  test("retorna null quando falta algum campo", () => {
    expect(montarISO(0, 7, 2026)).toBeNull();
  });
});

describe("subtrairDias", () => {
  test("subtrai dentro do mesmo mês", () => {
    expect(subtrairDias("2026-08-10", 7)).toBe("2026-08-03");
  });

  test("cruza o limite do mês", () => {
    expect(subtrairDias("2026-08-03", 7)).toBe("2026-07-27");
  });

  test("cruza o limite do ano", () => {
    expect(subtrairDias("2026-01-03", 7)).toBe("2025-12-27");
  });

  test("suspensão de 1 dia (curta ação)", () => {
    expect(subtrairDias("2026-08-10", 1)).toBe("2026-08-09");
  });
});

describe("formatarDataExtenso", () => {
  test("formata por extenso em português", () => {
    expect(formatarDataExtenso("2026-07-15")).toBe("15 de julho de 2026");
  });
});

describe("dataEhFutura", () => {
  test("uma data claramente no futuro é considerada futura", () => {
    expect(dataEhFutura("2099-01-01")).toBe(true);
  });

  test("uma data claramente no passado não é considerada futura", () => {
    expect(dataEhFutura("2000-01-01")).toBe(false);
  });
});
