import { Farmaco, ItemMedicamento } from "@/medperiop/types";

/**
 * O motor de decisão (`gerarRecomendacaoItem`/`gerarRecomendacoes`) é
 * genérico: a mesma função processa qualquer uma das 7 classes terapêuticas
 * consultando `TODOS_FARMACOS`. Em vez de depender dos dados reais (grandes,
 * um arquivo por classe, escritos à parte), os testes aqui usam um conjunto
 * sintético de fármacos que cobre cada `TipoRecomendacao` do sistema de
 * tipos — isso verifica a mecânica do motor isoladamente do conteúdo
 * clínico real.
 */
const FARMACOS_TESTE: Farmaco[] = [
  {
    id: "continua_sempre",
    nomeGenerico: "Continua Sempre",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Teste",
    regra: { tipo: "continuar" },
    racional: "teste",
    fonteReferenciaNumero: 2,
  },
  {
    id: "suspende_no_dia",
    nomeGenerico: "Suspende No Dia",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Teste",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional: "teste",
    fonteReferenciaNumero: 2,
  },
  {
    id: "suspende_3_dias",
    nomeGenerico: "Suspende 3 Dias",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Teste",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional: "teste",
    fonteReferenciaNumero: 3,
  },
  {
    id: "suspende_72_horas",
    nomeGenerico: "Suspende 72 Horas",
    nomesComerciais: [],
    classe: "psiquiatrico",
    subclasse: "Teste",
    regra: { tipo: "suspender_periodo_fixo", valor: 72, unidade: "horas" },
    racional: "teste",
    fonteReferenciaNumero: 6,
  },
  {
    id: "suspende_intervalo",
    nomeGenerico: "Suspende Por Intervalo",
    nomesComerciais: [],
    classe: "reumatologico-hiv",
    subclasse: "Teste",
    regra: { tipo: "suspender_intervalo_dose", numeroIntervalos: 1 },
    racional: "teste",
    fonteReferenciaNumero: 7,
  },
  {
    id: "reduz_dose",
    nomeGenerico: "Reduz Dose",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Teste",
    regra: { tipo: "reduzir_dose", ajusteDose: "60%-80% da dose usual" },
    racional: "teste",
    fonteReferenciaNumero: 3,
  },
  {
    id: "individualizado",
    nomeGenerico: "Individualizado",
    nomesComerciais: [],
    classe: "analgesicos",
    subclasse: "Teste",
    regra: { tipo: "individualizado", motivoIndividualizado: "Sem número fixo no artigo." },
    racional: "teste",
    fonteReferenciaNumero: 8,
  },
  {
    id: "por_indicacao",
    nomeGenerico: "Por Indicação",
    nomesComerciais: [],
    classe: "endocrino",
    subclasse: "Teste",
    indicacoes: [
      { id: "indicacao_a", descricao: "Indicação A", regra: { tipo: "continuar" } },
      {
        id: "indicacao_b",
        descricao: "Indicação B",
        regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
      },
    ],
    racional: "teste",
    fonteReferenciaNumero: 3,
  },
  {
    id: "por_condicao",
    nomeGenerico: "Por Condição",
    nomesComerciais: [],
    classe: "gi-pulmonar",
    subclasse: "Teste",
    condicaoClinica: {
      pergunta: "TFG < 50 mL/min?",
      regraSeSim: { tipo: "suspender_dia_cirurgia" },
      regraSeNao: { tipo: "continuar" },
    },
    racional: "teste",
    fonteReferenciaNumero: 4,
  },
  // Mesmo id, classes diferentes — reproduz o cenário real da base de dados
  // (ex.: guanfacina em cardiovascular e em psiquiátrico) para garantir que a
  // busca é por classe+id, não só por id.
  {
    id: "nome_repetido",
    nomeGenerico: "Nome Repetido (classe A)",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Teste",
    regra: { tipo: "continuar" },
    racional: "teste classe A",
    fonteReferenciaNumero: 2,
  },
  {
    id: "nome_repetido",
    nomeGenerico: "Nome Repetido (classe B)",
    nomesComerciais: [],
    classe: "psiquiatrico",
    subclasse: "Teste",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional: "teste classe B",
    fonteReferenciaNumero: 6,
  },
];

jest.mock("@/medperiop/data/farmacos", () => {
  const farmacos = FARMACOS_TESTE;
  return {
    TODOS_FARMACOS: farmacos,
    buscarFarmaco: (classe: string | null, id: string | null) =>
      farmacos.find((f: Farmaco) => f.classe === classe && f.id === id) ?? null,
  };
});

// eslint-disable-next-line import/first
import { gerarRecomendacaoItem, gerarRecomendacoes } from "@/medperiop/logic/regras";

function item(overrides: Partial<ItemMedicamento> & Pick<ItemMedicamento, "classe" | "farmacoId">): ItemMedicamento {
  return {
    id: "item-teste",
    indicacaoId: null,
    condicaoAtendida: null,
    frequenciaDoseDias: null,
    ...overrides,
  };
}

describe("continuar", () => {
  test("fármaco com regra fixa 'continuar' não gera dias de suspensão", () => {
    const r = gerarRecomendacaoItem(item({ classe: "cardiovascular", farmacoId: "continua_sempre" }));
    expect(r.decisao).toBe("continuar");
    expect(r.diasSuspensao).toBeNull();
  });
});

describe("suspender no dia da cirurgia", () => {
  test("decisão resolvida sem depender de data", () => {
    const r = gerarRecomendacaoItem(item({ classe: "cardiovascular", farmacoId: "suspende_no_dia" }));
    expect(r.decisao).toBe("suspender_dia_cirurgia");
  });
});

describe("suspender por período fixo", () => {
  test("N dias: preenche diasSuspensao diretamente", () => {
    const r = gerarRecomendacaoItem(item({ classe: "endocrino", farmacoId: "suspende_3_dias" }));
    expect(r.decisao).toBe("suspender_periodo");
    expect(r.diasSuspensao).toBe(3);
  });

  test("N horas: converte para dias inteiros (72h = 3 dias)", () => {
    const r = gerarRecomendacaoItem(item({ classe: "psiquiatrico", farmacoId: "suspende_72_horas" }));
    expect(r.decisao).toBe("suspender_periodo");
    expect(r.diasSuspensao).toBe(3);
  });
});

describe("suspender por intervalo de dose", () => {
  test("usa a frequência de dose do paciente para calcular diasSuspensao", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "reumatologico-hiv", farmacoId: "suspende_intervalo", frequenciaDoseDias: 28 })
    );
    expect(r.decisao).toBe("suspender_periodo");
    expect(r.diasSuspensao).toBe(28);
  });

  test("sem frequência de dose informada, fica indeterminado (não assume um valor)", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "reumatologico-hiv", farmacoId: "suspende_intervalo" })
    );
    expect(r.decisao).toBe("indeterminado");
    expect(r.motivoIndeterminado).toBeTruthy();
  });
});

describe("reduzir dose", () => {
  test("não gera diasSuspensao — é ajuste de dose, não suspensão", () => {
    const r = gerarRecomendacaoItem(item({ classe: "endocrino", farmacoId: "reduz_dose" }));
    expect(r.decisao).toBe("reduzir_dose");
    expect(r.diasSuspensao).toBeNull();
    expect(r.regraAplicada?.ajusteDose).toBe("60%-80% da dose usual");
  });
});

describe("individualizado", () => {
  test("nunca gera um número fixo — só carrega o motivo", () => {
    const r = gerarRecomendacaoItem(item({ classe: "analgesicos", farmacoId: "individualizado" }));
    expect(r.decisao).toBe("individualizado");
    expect(r.diasSuspensao).toBeNull();
    expect(r.regraAplicada?.motivoIndividualizado).toBeTruthy();
  });
});

describe("recomendação dependente de indicação", () => {
  test("sem indicação informada, fica indeterminado", () => {
    const r = gerarRecomendacaoItem(item({ classe: "endocrino", farmacoId: "por_indicacao" }));
    expect(r.decisao).toBe("indeterminado");
  });

  test("indicação A resolve para continuar", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "endocrino", farmacoId: "por_indicacao", indicacaoId: "indicacao_a" })
    );
    expect(r.decisao).toBe("continuar");
    expect(r.indicacao?.id).toBe("indicacao_a");
  });

  test("indicação B resolve para suspender por período", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "endocrino", farmacoId: "por_indicacao", indicacaoId: "indicacao_b" })
    );
    expect(r.decisao).toBe("suspender_periodo");
    expect(r.diasSuspensao).toBe(3);
  });
});

describe("recomendação dependente de condição clínica", () => {
  test("sem resposta à condição, fica indeterminado", () => {
    const r = gerarRecomendacaoItem(item({ classe: "gi-pulmonar", farmacoId: "por_condicao" }));
    expect(r.decisao).toBe("indeterminado");
  });

  test("condição atendida (sim) aplica regraSeSim", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "gi-pulmonar", farmacoId: "por_condicao", condicaoAtendida: "sim" })
    );
    expect(r.decisao).toBe("suspender_dia_cirurgia");
  });

  test("condição não atendida (não) aplica regraSeNao", () => {
    const r = gerarRecomendacaoItem(
      item({ classe: "gi-pulmonar", farmacoId: "por_condicao", condicaoAtendida: "nao" })
    );
    expect(r.decisao).toBe("continuar");
  });
});

describe("fármaco não encontrado", () => {
  test("id que não existe na base gera 'indeterminado' com motivo explicativo", () => {
    const r = gerarRecomendacaoItem(item({ classe: "cardiovascular", farmacoId: "nao_existe" }));
    expect(r.decisao).toBe("indeterminado");
    expect(r.farmaco).toBeNull();
    expect(r.motivoIndeterminado).toBeTruthy();
  });
});

describe("mesmo id em classes diferentes (colisão real na base de dados)", () => {
  test("busca por classe+id retorna o fármaco da classe correta, não o primeiro id igual encontrado", () => {
    const a = gerarRecomendacaoItem(item({ classe: "cardiovascular", farmacoId: "nome_repetido" }));
    const b = gerarRecomendacaoItem(item({ classe: "psiquiatrico", farmacoId: "nome_repetido" }));
    expect(a.farmaco?.nomeGenerico).toBe("Nome Repetido (classe A)");
    expect(a.decisao).toBe("continuar");
    expect(b.farmaco?.nomeGenerico).toBe("Nome Repetido (classe B)");
    expect(b.decisao).toBe("suspender_dia_cirurgia");
  });
});

describe("gerarRecomendacoes (lista)", () => {
  test("gera uma recomendação por item da lista, na mesma ordem", () => {
    const recomendacoes = gerarRecomendacoes({
      medicamentos: [
        item({ id: "1", classe: "cardiovascular", farmacoId: "continua_sempre" }),
        item({ id: "2", classe: "endocrino", farmacoId: "suspende_3_dias" }),
      ],
      filaPendente: [],
      classeAtual: null,
      farmacoIdAtual: null,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    });
    expect(recomendacoes).toHaveLength(2);
    expect(recomendacoes[0].decisao).toBe("continuar");
    expect(recomendacoes[1].decisao).toBe("suspender_periodo");
    expect(recomendacoes[1].diasSuspensao).toBe(3);
  });

  test("lista vazia gera lista vazia", () => {
    const recomendacoes = gerarRecomendacoes({
      medicamentos: [],
      filaPendente: [],
      classeAtual: null,
      farmacoIdAtual: null,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    });
    expect(recomendacoes).toEqual([]);
  });
});
