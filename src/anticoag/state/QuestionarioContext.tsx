import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRECISA_PERGUNTAR_DOSE_ATAQUE } from "@/anticoag/logic/regrasAntiplaquetario";
import { ItemMedicamentoAntiCoag, RespostasQuestionario } from "@/anticoag/types";

const RESPOSTAS_INICIAIS: RespostasQuestionario = {
  medicamentos: [],
  classeAtual: null,
  medicamentoId: null,
  indicacaoId: null,
  funcaoRenalOpcao: null,
  crClExata: null,
  viaHnf: null,
  doseHbpm: null,
  frequenciaHbpm: null,
  antiplaquetarioIdAtual: null,
  doseAtaquePosOp: null,
  filaAntiplaquetarioPendente: [],
  fitoterapicoIds: [],
};

const CAMPOS_RASCUNHO: Partial<RespostasQuestionario> = {
  classeAtual: null,
  medicamentoId: null,
  indicacaoId: null,
  funcaoRenalOpcao: null,
  crClExata: null,
  viaHnf: null,
  doseHbpm: null,
  frequenciaHbpm: null,
  antiplaquetarioIdAtual: null,
  doseAtaquePosOp: null,
  filaAntiplaquetarioPendente: [],
  fitoterapicoIds: [],
};

/**
 * Só existe no navegador (web/PWA) — em apps nativos `window.sessionStorage`
 * é sempre undefined e as funções abaixo viram no-ops.
 */
const CHAVE_SESSAO = "anticoag_respostas";

function lerSessao(): RespostasQuestionario | null {
  try {
    const bruto = typeof window !== "undefined" && window.sessionStorage?.getItem(CHAVE_SESSAO);
    return bruto ? { ...RESPOSTAS_INICIAIS, ...JSON.parse(bruto) } : null;
  } catch {
    return null;
  }
}

function salvarSessao(respostas: RespostasQuestionario) {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(respostas));
    }
  } catch {
    // sessionStorage indisponível (modo privado, quota, etc.) — segue sem persistir.
  }
}

function limparSessao() {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.removeItem(CHAVE_SESSAO);
    }
  } catch {
    // ignora
  }
}

function novoId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function itemVazio(classe: ItemMedicamentoAntiCoag["classe"]): ItemMedicamentoAntiCoag {
  return {
    id: novoId(),
    classe,
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
  };
}

/** Tela para onde ir depois de processar/confirmar antiplaquetário(s):
 * ou a pergunta de dose de ataque do próximo pendente na fila, ou a tela
 * "mais medicamentos". */
export type ProximoPassoAntiplaquetario = "dose_ataque" | "mais-medicamentos";

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;

  /** Confirma o DOAC em edição (rascunho) como item da lista e limpa o rascunho. */
  confirmarDoac: () => void;
  /** Confirma a heparina (HNF ou HBPM, conforme `classeAtual`) em edição. */
  confirmarHeparina: () => void;
  /** Recebe os antiplaquetários marcados (podem ser vários, ex.: AAS +
   * clopidogrel). Os que não precisam de dose de ataque são confirmados na
   * hora; os que precisam (clopidogrel/prasugrel/ticagrelor) entram numa
   * fila, resolvida um de cada vez. Devolve a próxima tela. */
  processarSelecaoAntiplaquetarios: (ids: string[]) => ProximoPassoAntiplaquetario;
  /** Confirma o antiplaquetário em edição (já com a dose de ataque
   * respondida) e avança pro próximo pendente da fila, se houver. */
  confirmarAntiplaquetarioAtual: () => ProximoPassoAntiplaquetario;
  /** Confirma os fitoterápicos marcados (não têm pergunta extra). */
  confirmarFitoterapicos: (ids: string[]) => void;

  removerMedicamento: (id: string) => void;
  reiniciar: () => void;
}

const QuestionarioContext = createContext<QuestionarioContextValor | null>(null);

/**
 * Estado espelhado no `sessionStorage` da aba (protege contra navegadores
 * in-app que recarregam a página no meio do questionário — ver histórico do
 * projeto) e com fila de medicamentos acumulando entre classes (DOAC,
 * heparina, antiplaquetário, fitoterápico), no mesmo padrão do MedPeriOp:
 * a pessoa pode adicionar quantos medicamentos quiser, de classes
 * diferentes, e ver tudo num resultado e PDF só no final.
 */
export function QuestionarioProvider({ children }: { children: React.ReactNode }) {
  const [respostas, setRespostas] = useState<RespostasQuestionario>(
    () => lerSessao() ?? RESPOSTAS_INICIAIS
  );

  useEffect(() => {
    salvarSessao(respostas);
  }, [respostas]);

  const valor = useMemo<QuestionarioContextValor>(
    () => ({
      respostas,
      atualizar: (parcial) => setRespostas((atual) => ({ ...atual, ...parcial })),

      confirmarDoac: () => {
        setRespostas((atual) => {
          const item: ItemMedicamentoAntiCoag = {
            ...itemVazio("doac"),
            medicamentoId: atual.medicamentoId,
            indicacaoId: atual.indicacaoId,
            funcaoRenalOpcao: atual.funcaoRenalOpcao,
            crClExata: atual.crClExata,
          };
          return { ...atual, ...CAMPOS_RASCUNHO, medicamentos: [...atual.medicamentos, item] };
        });
      },

      confirmarHeparina: () => {
        setRespostas((atual) => {
          if (atual.classeAtual !== "hnf" && atual.classeAtual !== "hbpm") return atual;
          const item: ItemMedicamentoAntiCoag = {
            ...itemVazio(atual.classeAtual),
            viaHnf: atual.viaHnf,
            doseHbpm: atual.doseHbpm,
            frequenciaHbpm: atual.frequenciaHbpm,
          };
          return { ...atual, ...CAMPOS_RASCUNHO, medicamentos: [...atual.medicamentos, item] };
        });
      },

      processarSelecaoAntiplaquetarios: (ids) => {
        let proximoPasso: ProximoPassoAntiplaquetario = "mais-medicamentos";
        setRespostas((atual) => {
          const simples: ItemMedicamentoAntiCoag[] = [];
          const pendentes: string[] = [];
          for (const id of ids) {
            if (PRECISA_PERGUNTAR_DOSE_ATAQUE.includes(id)) {
              pendentes.push(id);
            } else {
              simples.push({ ...itemVazio("antiplaquetario"), antiplaquetarioId: id });
            }
          }
          const medicamentos = [...atual.medicamentos, ...simples];
          if (pendentes.length === 0) {
            proximoPasso = "mais-medicamentos";
            return { ...atual, ...CAMPOS_RASCUNHO, medicamentos };
          }
          const [primeiro, ...resto] = pendentes;
          proximoPasso = "dose_ataque";
          return {
            ...atual,
            medicamentos,
            antiplaquetarioIdAtual: primeiro,
            doseAtaquePosOp: null,
            filaAntiplaquetarioPendente: resto,
          };
        });
        return proximoPasso;
      },

      confirmarAntiplaquetarioAtual: () => {
        let proximoPasso: ProximoPassoAntiplaquetario = "mais-medicamentos";
        setRespostas((atual) => {
          if (!atual.antiplaquetarioIdAtual) return atual;
          const item: ItemMedicamentoAntiCoag = {
            ...itemVazio("antiplaquetario"),
            antiplaquetarioId: atual.antiplaquetarioIdAtual,
            doseAtaquePosOp: atual.doseAtaquePosOp,
          };
          const medicamentos = [...atual.medicamentos, item];
          if (atual.filaAntiplaquetarioPendente.length === 0) {
            proximoPasso = "mais-medicamentos";
            return { ...atual, ...CAMPOS_RASCUNHO, medicamentos };
          }
          const [proximo, ...resto] = atual.filaAntiplaquetarioPendente;
          proximoPasso = "dose_ataque";
          return {
            ...atual,
            medicamentos,
            antiplaquetarioIdAtual: proximo,
            doseAtaquePosOp: null,
            filaAntiplaquetarioPendente: resto,
          };
        });
        return proximoPasso;
      },

      confirmarFitoterapicos: (ids) => {
        setRespostas((atual) => {
          const novos = ids.map((id) => ({ ...itemVazio("fitoterapico"), fitoterapicoId: id }));
          return { ...atual, ...CAMPOS_RASCUNHO, medicamentos: [...atual.medicamentos, ...novos] };
        });
      },

      removerMedicamento: (id) =>
        setRespostas((atual) => ({
          ...atual,
          medicamentos: atual.medicamentos.filter((m) => m.id !== id),
        })),

      reiniciar: () => {
        limparSessao();
        setRespostas(RESPOSTAS_INICIAIS);
      },
    }),
    [respostas]
  );

  return (
    <QuestionarioContext.Provider value={valor}>{children}</QuestionarioContext.Provider>
  );
}

export function useQuestionario(): QuestionarioContextValor {
  const ctx = useContext(QuestionarioContext);
  if (!ctx) {
    throw new Error("useQuestionario deve ser usado dentro de QuestionarioProvider");
  }
  return ctx;
}
