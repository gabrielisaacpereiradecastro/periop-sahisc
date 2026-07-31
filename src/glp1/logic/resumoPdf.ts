import { Recomendacao, RespostasQuestionario } from "@/glp1/types";
import { rotuloMedicamento } from "@/glp1/data/medicamentos";
import { SAHISC_LOGO_BASE64 } from "@/sahiscLogo";

const LIQUIDOS_SEM_RESIDUO_RESUMO =
  "água, café preto sem leite, chá, água de coco sem resíduos, sucos coados sem polpa, bebidas com carboidratos sem resíduos";

/**
 * HTML enxuto (pensado para impressão em A4) com só o essencial da
 * recomendação, para o paciente/médico enviar a quem precisar (cirurgião,
 * equipe de endocrinologia, etc.). Não repete a lista completa de fatores
 * de risco nem a bibliografia — isso fica só dentro do app.
 */
export function gerarHtmlResumo(
  respostas: RespostasQuestionario,
  recomendacao: Recomendacao,
  nomePaciente: string
): string {
  const nome = nomePaciente.trim() || "Não informado";
  const medicamento = recomendacao.medicamento
    ? rotuloMedicamento(recomendacao.medicamento)
    : "Não identificado no protocolo";
  const manter = recomendacao.decisao === "manter";

  const corDecisao = manter ? "#15803D" : "#B45309";
  const fundoDecisao = manter ? "#DCFCE7" : "#FEF3C7";
  const tituloDecisao = manter ? "Manter a dose habitual" : "Suspender o medicamento";

  const motivo =
    respostas.pocusDisponivel !== "sim"
      ? "Serviço sem disponibilidade confirmada de POCUS gástrico no dia da cirurgia."
      : "Fatores de risco identificados na avaliação.";

  let corpoDecisao = "";
  if (manter) {
    corpoDecisao = `<p>Uso estável há 12 semanas ou mais, sem sintomas gastrointestinais e sem outros fatores de risco identificados, em serviço com disponibilidade de ultrassonografia gástrica (POCUS).</p>`;
  } else {
    corpoDecisao = `
      <p><strong>Suspender ${recomendacao.diasSuspensao} dia${recomendacao.diasSuspensao === 1 ? "" : "s"} antes</strong> da cirurgia ou procedimento.</p>
      <p>Motivo: ${motivo}</p>
      <p><strong>Envolver a equipe de Endocrinologia</strong> para ajuste do tratamento durante o período de suspensão, prevenindo hiperglicemia.</p>
    `;
  }

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        @page { margin: 28px; }
        body { font-family: -apple-system, Helvetica, Arial, sans-serif; color: #1F2937; }
        .cabecalho { background-color: #0F766E; color: #FFFFFF; padding: 16px 20px; border-radius: 10px; }
        .cabecalho h1 { margin: 0; font-size: 18px; }
        .cabecalho p { margin: 4px 0 0; font-size: 12px; opacity: 0.9; }
        .info { margin-top: 16px; font-size: 13px; }
        .info td { padding: 3px 0; }
        .info td.rotulo { color: #4B5563; width: 140px; }
        .info td.valor { font-weight: 600; }
        .decisao { margin-top: 18px; padding: 14px 16px; border-radius: 10px; border: 1px solid ${corDecisao}; background-color: ${fundoDecisao}; }
        .decisao h2 { margin: 0 0 6px; font-size: 15px; color: ${corDecisao}; }
        .decisao p { margin: 4px 0; font-size: 12.5px; line-height: 1.5; }
        .secao { margin-top: 16px; }
        .secao h3 { font-size: 13px; margin-bottom: 4px; color: #1F2937; }
        .secao p { font-size: 12.5px; line-height: 1.5; margin: 2px 0; color: #374151; }
        .rodape { margin-top: 24px; padding-top: 10px; border-top: 1px solid #E5E7EB; font-size: 10px; color: #6B7280; line-height: 1.5; }
        .rodape-creditos { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
        .rodape-creditos img { width: 34px; height: auto; }
        .rodape-creditos span { font-size: 10px; color: #6B7280; }
      </style>
    </head>
    <body>
      <div class="cabecalho">
        <h1>GLP-1 PeriOp</h1>
        <p>Baseado na Nota SBA C.SBA-01744/2026 (15/05/2026)</p>
      </div>

      <table class="info" width="100%">
        <tr><td class="rotulo">Paciente</td><td class="valor">${nome}</td></tr>
        <tr><td class="rotulo">Medicamento</td><td class="valor">${medicamento}</td></tr>
      </table>

      <div class="decisao">
        <h2>${tituloDecisao}</h2>
        ${corpoDecisao}
      </div>

      <div class="secao">
        <h3>Preparo pré-operatório (todos os pacientes)</h3>
        <p>Dieta líquida sem resíduos nas 24 horas antes do procedimento: ${LIQUIDOS_SEM_RESIDUO_RESUMO}.</p>
        <p>Jejum absoluto de 8 a 12 horas antes do procedimento.</p>
      </div>

      <div class="rodape">
        Este resumo não substitui o julgamento do médico anestesiologista responsável, que deve
        avaliar o caso de forma individualizada. Gerado pelo aplicativo em ${new Date().toLocaleString(
          "pt-BR"
        )}.
        <div class="rodape-creditos">
          <img src="data:image/png;base64,${SAHISC_LOGO_BASE64}" />
          <span>Serviço de Anestesiologia de São Carlos (SAHISC)</span>
        </div>
      </div>
    </body>
  </html>
  `;
}
