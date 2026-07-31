import {
  combinarDataHora,
  dataHoraEhFutura,
  formatarDataHoraExtenso,
  montarDataISO,
  somarHoras,
} from "./data";

describe("montarDataISO", () => {
  test("monta data válida", () => {
    expect(montarDataISO(15, 7, 2026)).toBe("2026-07-15");
  });

  test("rejeita 29 de fevereiro em ano não bissexto", () => {
    expect(montarDataISO(29, 2, 2026)).toBeNull();
  });

  test("aceita 29 de fevereiro em ano bissexto", () => {
    expect(montarDataISO(29, 2, 2028)).toBe("2028-02-29");
  });
});

describe("combinarDataHora", () => {
  test("combina data e hora em um único identificador", () => {
    expect(combinarDataHora("2026-07-15", 14)).toBe("2026-07-15T14");
  });

  test("preenche hora com zero à esquerda", () => {
    expect(combinarDataHora("2026-07-15", 8)).toBe("2026-07-15T08");
  });
});

describe("somarHoras", () => {
  test("soma horas cruzando a virada do dia", () => {
    expect(somarHoras("2026-07-15T20", 6)).toBe("2026-07-16T02");
  });
});

describe("formatarDataHoraExtenso", () => {
  test("formata por extenso em português", () => {
    expect(formatarDataHoraExtenso("2026-07-15T14")).toBe("15 de julho de 2026, às 14h");
  });
});

describe("dataHoraEhFutura", () => {
  test("uma data/hora claramente no futuro é considerada futura", () => {
    expect(dataHoraEhFutura("2099-01-01T00")).toBe(true);
  });

  test("uma data/hora claramente no passado não é considerada futura", () => {
    expect(dataHoraEhFutura("2000-01-01T00")).toBe(false);
  });
});
