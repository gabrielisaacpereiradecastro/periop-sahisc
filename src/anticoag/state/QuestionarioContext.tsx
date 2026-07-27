import React, { createContext, useContext, useMemo, useState } from "react";
import { RespostasQuestionario } from "@/anticoag/types";

const RESPOSTAS_INICIAIS: RespostasQuestionario = {
  classe: null,
  medicamentoId: null,
  indicacaoId: null,
  funcaoRenalOpcao: null,
  crClExata: null,
  viaHnf: null,
  doseHbpm: null,
  frequenciaHbpm: null,
  antiplaquetarioId: null,
  doseAtaquePosOp: null,
  dataProcedimento: null,
  horaProcedimento: null,
};

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;
  reiniciar: () => void;
}

const QuestionarioContext = createContext<QuestionarioContextValor | null>(null);

export function QuestionarioProvider({ children }: { children: React.ReactNode }) {
  const [respostas, setRespostas] = useState<RespostasQuestionario>(RESPOSTAS_INICIAIS);

  const valor = useMemo<QuestionarioContextValor>(
    () => ({
      respostas,
      atualizar: (parcial) => setRespostas((atual) => ({ ...atual, ...parcial })),
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
