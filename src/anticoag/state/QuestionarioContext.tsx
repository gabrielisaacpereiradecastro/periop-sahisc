import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

interface QuestionarioContextValor {
  respostas: RespostasQuestionario;
  atualizar: (parcial: Partial<RespostasQuestionario>) => void;
  reiniciar: () => void;
}

const QuestionarioContext = createContext<QuestionarioContextValor | null>(null);

/**
 * O estado do questionário é mantido em memória (`useState`), mas também
 * espelhado no `sessionStorage` da aba. Isso existe porque navegadores
 * in-app (ex.: o navegador embutido do WhatsApp) às vezes recarregam a
 * página no meio do fluxo — sem isso, a recarga zera silenciosamente todas
 * as respostas e a tela de resultado cai no branch errado (ex.: mostra erro
 * de "medicamento não encontrado" mesmo depois de escolher fitoterápicos).
 * `sessionStorage` sobrevive a essa recarga porque pertence à aba, não à
 * página — só é limpo quando a aba/janela fecha, então continua 100% local.
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
