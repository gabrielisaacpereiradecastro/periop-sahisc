import { Farmaco } from "@/medperiop/types";
import { etapaExtraParaFarmaco } from "@/medperiop/logic/fluxo";

function farmaco(overrides: Partial<Farmaco>): Farmaco {
  return {
    id: "teste",
    nomeGenerico: "Teste",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Teste",
    racional: "teste",
    fonteReferenciaNumero: 2,
    ...overrides,
  };
}

describe("etapaExtraParaFarmaco", () => {
  test("regra fixa simples não precisa de etapa extra", () => {
    expect(etapaExtraParaFarmaco(farmaco({ regra: { tipo: "continuar" } }))).toBeNull();
  });

  test("regra fixa suspender_periodo_fixo não precisa de etapa extra", () => {
    expect(
      etapaExtraParaFarmaco(farmaco({ regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" } }))
    ).toBeNull();
  });

  test("fármaco com indicações precisa da etapa 'indicacao'", () => {
    expect(
      etapaExtraParaFarmaco(
        farmaco({ indicacoes: [{ id: "a", descricao: "A", regra: { tipo: "continuar" } }] })
      )
    ).toBe("indicacao");
  });

  test("fármaco com condição clínica precisa da etapa 'condicao'", () => {
    expect(
      etapaExtraParaFarmaco(
        farmaco({
          condicaoClinica: {
            pergunta: "TFG < 50?",
            regraSeSim: { tipo: "suspender_dia_cirurgia" },
            regraSeNao: { tipo: "continuar" },
          },
        })
      )
    ).toBe("condicao");
  });

  test("regra fixa suspender_intervalo_dose precisa da etapa 'frequencia'", () => {
    expect(
      etapaExtraParaFarmaco(farmaco({ regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 } }))
    ).toBe("frequencia");
  });
});
