import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

/**
 * Só existe no navegador (web/PWA) — em apps nativos `window.sessionStorage`
 * é sempre undefined e as funções abaixo viram no-ops.
 */
const CHAVE_SESSAO = "glp1_respostas";

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

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;
  reiniciar: () => void;
}

const QuestionarioContext = createContext<QuestionarioContextValor | null>(null);

/**
 * Estado espelhado no `sessionStorage` da aba (ver anticoag/state/
 * QuestionarioContext.tsx para o porquê) — protege contra navegadores
 * in-app que recarregam a página no meio do questionário.
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
