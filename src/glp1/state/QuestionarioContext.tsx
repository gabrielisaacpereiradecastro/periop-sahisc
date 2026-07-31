import React, { createContext, useContext, useMemo, useState } from "react";
import { RespostasQuestionario } from "@/glp1/types";

const RESPOSTAS_INICIAIS: RespostasQuestionario = {
  medicamentoId: null,
  usoMenosDe12Semanas: null,
  aumentoDoseUltimos3Meses: null,
  usoIrregular: null,
  sintomasGI: null,
  fatoresPaciente: [],
  fatoresTecnicaAnestesica: [],
  pocusDisponivel: null,
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
