import React, { createContext, useContext, useMemo, useState } from "react";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { etapaExtraParaFarmaco } from "@/medperiop/logic/fluxo";
import { FarmacoPendente, ItemMedicamento, RespostasQuestionario } from "@/medperiop/types";

const RESPOSTAS_INICIAIS: RespostasQuestionario = {
  medicamentos: [],
  filaPendente: [],
  classeAtual: null,
  farmacoIdAtual: null,
  indicacaoIdAtual: null,
  condicaoAtendidaAtual: null,
  frequenciaDoseDiasAtual: null,
};

const CAMPOS_RASCUNHO: Partial<RespostasQuestionario> = {
  classeAtual: null,
  farmacoIdAtual: null,
  indicacaoIdAtual: null,
  condicaoAtendidaAtual: null,
  frequenciaDoseDiasAtual: null,
};

function novoId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Tela para onde ir depois de confirmar um medicamento (ou um lote deles):
 * ou a próxima pergunta extra pendente na fila, ou a tela "mais medicamentos". */
export type ProximoPasso = "indicacao" | "condicao" | "frequencia" | "mais-medicamentos";

/**
 * Dado o estado com `filaPendente` já atualizada e `medicamentos` já com o(s)
 * item(ns) recém-confirmado(s), decide a próxima tela: se a fila tem mais
 * fármacos pendentes, promove o primeiro para "Atual" e diz qual pergunta
 * ele precisa; senão, manda para "mais-medicamentos" e limpa o rascunho.
 */
function avancarFila(
  atual: RespostasQuestionario,
  medicamentos: ItemMedicamento[],
  filaPendente: FarmacoPendente[]
): { proximo: ProximoPasso; respostas: RespostasQuestionario } {
  if (filaPendente.length === 0) {
    return {
      proximo: "mais-medicamentos",
      respostas: { ...atual, ...CAMPOS_RASCUNHO, medicamentos, filaPendente: [] },
    };
  }
  const [proximoPendente, ...resto] = filaPendente;
  const farmacoProximo = buscarFarmaco(proximoPendente.classe, proximoPendente.farmacoId);
  const etapa = farmacoProximo ? etapaExtraParaFarmaco(farmacoProximo) : null;
  return {
    // Só entram na fila fármacos que já foram checados e precisam de etapa
    // extra — `etapa` só seria null aqui se o fármaco tivesse sumido da base
    // entre a seleção e agora, o que não deveria acontecer.
    proximo: etapa ?? "mais-medicamentos",
    respostas: {
      ...atual,
      medicamentos,
      filaPendente: resto,
      classeAtual: proximoPendente.classe,
      farmacoIdAtual: proximoPendente.farmacoId,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    },
  };
}

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;
  /** Recebe os fármacos marcados na tela de seleção (podem ser vários, de
   * classes diferentes se veio da opção "Todos os medicamentos"). Os que não
   * precisam de pergunta extra são confirmados na hora; os que precisam
   * entram numa fila, resolvida um de cada vez. Devolve a próxima tela. */
  processarSelecaoFarmacos: (selecionados: FarmacoPendente[]) => ProximoPasso;
  /** Confirma o medicamento em edição (campos "Atual", já resolvido pelas
   * telas de indicação/condição/frequência) e avança pro próximo pendente
   * da fila, se houver. Devolve a próxima tela. */
  confirmarMedicamentoAtual: () => ProximoPasso;
  removerMedicamento: (id: string) => void;
  reiniciar: () => void;
}

const QuestionarioContext = createContext<QuestionarioContextValor | null>(null);

export function QuestionarioProvider({ children }: { children: React.ReactNode }) {
  const [respostas, setRespostas] = useState<RespostasQuestionario>(RESPOSTAS_INICIAIS);

  const valor = useMemo<QuestionarioContextValor>(
    () => ({
      respostas,
      atualizar: (parcial) => setRespostas((atual) => ({ ...atual, ...parcial })),

      processarSelecaoFarmacos: (selecionados) => {
        let proximoPasso: ProximoPasso = "mais-medicamentos";
        setRespostas((atual) => {
          const simples: ItemMedicamento[] = [];
          const pendentes: FarmacoPendente[] = [];
          for (const sel of selecionados) {
            const farmaco = buscarFarmaco(sel.classe, sel.farmacoId);
            if (!farmaco) continue;
            if (etapaExtraParaFarmaco(farmaco) === null) {
              simples.push({
                id: novoId(),
                classe: sel.classe,
                farmacoId: sel.farmacoId,
                indicacaoId: null,
                condicaoAtendida: null,
                frequenciaDoseDias: null,
              });
            } else {
              pendentes.push(sel);
            }
          }
          const medicamentos = [...atual.medicamentos, ...simples];
          const resultado = avancarFila(atual, medicamentos, pendentes);
          proximoPasso = resultado.proximo;
          return resultado.respostas;
        });
        return proximoPasso;
      },

      confirmarMedicamentoAtual: () => {
        let proximoPasso: ProximoPasso = "mais-medicamentos";
        setRespostas((atual) => {
          if (!atual.classeAtual || atual.classeAtual === "todas" || !atual.farmacoIdAtual) {
            return atual;
          }
          const item: ItemMedicamento = {
            id: novoId(),
            classe: atual.classeAtual,
            farmacoId: atual.farmacoIdAtual,
            indicacaoId: atual.indicacaoIdAtual,
            condicaoAtendida: atual.condicaoAtendidaAtual,
            frequenciaDoseDias: atual.frequenciaDoseDiasAtual,
          };
          const medicamentos = [...atual.medicamentos, item];
          const resultado = avancarFila(atual, medicamentos, atual.filaPendente);
          proximoPasso = resultado.proximo;
          return resultado.respostas;
        });
        return proximoPasso;
      },

      removerMedicamento: (id) =>
        setRespostas((atual) => ({
          ...atual,
          medicamentos: atual.medicamentos.filter((m) => m.id !== id),
        })),
      reiniciar: () => setRespostas(RESPOSTAS_INICIAIS),
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
