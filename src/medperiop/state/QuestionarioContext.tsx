import React, { createContext, useContext, useMemo, useState } from "react";
import { ItemMedicamento, RespostasQuestionario } from "@/medperiop/types";

const RESPOSTAS_INICIAIS: RespostasQuestionario = {
  medicamentos: [],
  classeAtual: null,
  farmacoIdAtual: null,
  indicacaoIdAtual: null,
  condicaoAtendidaAtual: null,
  frequenciaDoseDiasAtual: null,
  dataCirurgia: null,
};

const CAMPOS_RASCUNHO: Partial<RespostasQuestionario> = {
  classeAtual: null,
  farmacoIdAtual: null,
  indicacaoIdAtual: null,
  condicaoAtendidaAtual: null,
  frequenciaDoseDiasAtual: null,
};

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;
  /** Confirma o medicamento em edição (campos "Atual") como um item da lista,
   * e limpa o rascunho para o próximo. */
  confirmarMedicamentoAtual: () => void;
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
      confirmarMedicamentoAtual: () =>
        setRespostas((atual) => {
          if (!atual.classeAtual || !atual.farmacoIdAtual) return atual;
          const item: ItemMedicamento = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            classe: atual.classeAtual,
            farmacoId: atual.farmacoIdAtual,
            indicacaoId: atual.indicacaoIdAtual,
            condicaoAtendida: atual.condicaoAtendidaAtual,
            frequenciaDoseDias: atual.frequenciaDoseDiasAtual,
          };
          return {
            ...atual,
            ...CAMPOS_RASCUNHO,
            medicamentos: [...atual.medicamentos, item],
          };
        }),
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
