import { buscarMedicamento } from "@/glp1/data/medicamentos";
import { FATORES_PACIENTE, FATORES_TECNICA_ANESTESICA } from "@/glp1/data/fatoresRisco";
import { Recomendacao, RespostasQuestionario } from "@/glp1/types";

/**
 * Motor de decisão que espelha, passo a passo, o "FLUXOGRAMA ILUSTRATIVO"
 * da Nota SBA C.SBA-01744/2026 (15/05/2026) — Passos 1 a 3 (decisão sobre a
 * medicação) e Passo 4 (preparo pré-operatório universal, tratado à parte
 * na tela de resultado). Os Passos 5 em diante (POCUS no dia da cirurgia,
 * procinético, intubação em sequência rápida) são decisões intraoperatórias
 * da equipe de anestesia no momento do procedimento e não são calculados
 * aqui — o app apenas informa que eles existem.
 */
export function gerarRecomendacao(respostas: RespostasQuestionario): Recomendacao {
  const medicamento = buscarMedicamento(respostas.medicamentoId);

  const fatoresIdentificados: string[] = [];
  if (respostas.usoMenosDe12Semanas === "sim") {
    fatoresIdentificados.push("Início de uso há menos de 12 semanas");
  }
  if (respostas.aumentoDoseUltimos3Meses === "sim") {
    fatoresIdentificados.push("Aumento de dose ou escalonamento nos últimos 3 meses");
  }
  if (respostas.usoIrregular === "sim") {
    fatoresIdentificados.push("Uso irregular ou instabilidade terapêutica");
  }
  if (respostas.sintomasGI === "sim") {
    fatoresIdentificados.push(
      "Sintomas gastrointestinais atuais (náusea, vômito, plenitude, distensão, refluxo ou dispepsia)"
    );
  }
  for (const id of respostas.fatoresPaciente) {
    const f = FATORES_PACIENTE.find((x) => x.id === id);
    if (f) fatoresIdentificados.push(f.descricao);
  }
  for (const id of respostas.fatoresTecnicaAnestesica) {
    const f = FATORES_TECNICA_ANESTESICA.find((x) => x.id === id);
    if (f) fatoresIdentificados.push(f.descricao);
  }

  if (!medicamento) {
    return {
      decisao: "indeterminado",
      medicamento: null,
      diasSuspensao: null,
      fatoresIdentificados,
      usouEstratificacaoDeRisco: false,
      motivoIndeterminado:
        "Este medicamento não consta explicitamente na Nota SBA C.SBA-01744/2026. Não é possível gerar uma recomendação segura sem essa informação — converse diretamente com o médico anestesiologista responsável.",
    };
  }

  const temFatorRisco = fatoresIdentificados.length > 0;

  // Passo 1: sem POCUS gástrico disponível no serviço -> maximizar segurança,
  // suspender sempre, independente da estratificação de risco.
  if (respostas.pocusDisponivel !== "sim") {
    return {
      decisao: "suspender",
      medicamento,
      diasSuspensao: medicamento.diasSuspensao,
      fatoresIdentificados,
      usouEstratificacaoDeRisco: false,
    };
  }

  // Passo 2/3: POCUS disponível -> estratificar risco.
  if (!temFatorRisco) {
    return {
      decisao: "manter",
      medicamento,
      diasSuspensao: null,
      fatoresIdentificados,
      usouEstratificacaoDeRisco: true,
    };
  }

  return {
    decisao: "suspender",
    medicamento,
    diasSuspensao: medicamento.diasSuspensao,
    fatoresIdentificados,
    usouEstratificacaoDeRisco: true,
  };
}
