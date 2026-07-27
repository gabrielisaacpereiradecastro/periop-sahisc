import { Recomendacao, RespostasQuestionario } from "@/medperiop/types";
import { formatarDataExtenso } from "@/medperiop/utils/data";
import { SAHISC_LOGO_BASE64 } from "@/sahiscLogo";

/**
 * HTML enxuto (pensado para impressão em A4) com só o essencial da
 * recomendação, para o médico enviar a quem precisar (cirurgião, equipe,
 * etc.). Não repete a lista completa de referências — isso fica só dentro
 * do app (tela de bibliografia).
 */
export function gerarHtmlResumo(
  respostas: RespostasQuestionario,
  recomendacao: Recomendacao,
  nomePaciente: string
): string {
  const nome = nomePaciente.trim() || "Não informado";
  const medicamento = recomendacao.farmaco?.nomeGenerico ?? "Não identificado";
  const cirurgia = respostas.dataCirurgia ? formatarDataExtenso(respostas.dataCirurgia) : "Não informada";

  let corAlerta = "#B45309";
  let fundoAlerta = "#FEF3C7";
  let corpoDecisao = "";

  switch (recomendacao.decisao) {
    case "continuar":
      corAlerta = "#15803D";
      fundoAlerta = "#DCFCE7";
      corpoDecisao =
        "<p><strong>Continuar normalmente.</strong> Manter o uso habitual do medicamento, incluindo a dose da manhã da cirurgia.</p>";
      break;
    case "suspender_dia_cirurgia":
      corpoDecisao =
        "<p><strong>Suspender só a dose do dia da cirurgia.</strong> Manter a terapia crônica até a véspera; não tomar a dose da manhã da cirurgia; retomar assim que possível no pós-operatório.</p>";
      break;
    case "suspender_com_data": {
      const dataCorte = recomendacao.dataCorteSuspensao
        ? formatarDataExtenso(recomendacao.dataCorteSuspensao)
        : "a definir";
      if (recomendacao.falhaJanelaSuspensao) {
        corAlerta = "#B91C1C";
        fundoAlerta = "#FEE2E2";
        corpoDecisao = `<p><strong>⚠️ Não há mais tempo hábil.</strong> Deveria ter sido suspenso a partir de <strong>${dataCorte}</strong>. Considerar adiar o procedimento eletivo ou discutir conduta alternativa com a equipe.</p>`;
      } else {
        corpoDecisao = `<p><strong>Suspender a partir de ${dataCorte}.</strong></p>`;
      }
      break;
    }
    case "reduzir_dose":
      corpoDecisao = `<p><strong>Ajustar a dose (não é suspensão):</strong> ${recomendacao.regraAplicada?.ajusteDose ?? ""}</p>`;
      break;
    case "individualizado":
      corAlerta = "#4B5563";
      fundoAlerta = "#F3F4F6";
      corpoDecisao = `<p><strong>Decisão individualizada.</strong> Não há número fixo no consensus statement — decidir junto com o médico prescritor e a equipe anestésica/cirúrgica.</p>${
        recomendacao.regraAplicada?.motivoIndividualizado
          ? `<p>${recomendacao.regraAplicada.motivoIndividualizado}</p>`
          : ""
      }`;
      break;
  }

  if (recomendacao.farmaco?.situacoesEspeciais) {
    corpoDecisao += `<p><strong>Situações especiais:</strong> ${recomendacao.farmaco.situacoesEspeciais}</p>`;
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
        .info td.rotulo { color: #4B5563; width: 140px; vertical-align: top; }
        .info td.valor { font-weight: 600; }
        .decisao { margin-top: 18px; padding: 14px 16px; border-radius: 10px; border: 1px solid ${corAlerta}; background-color: ${fundoAlerta}; }
        .decisao p { margin: 4px 0; font-size: 12.5px; line-height: 1.5; }
        .rodape { margin-top: 24px; padding-top: 10px; border-top: 1px solid #E5E7EB; font-size: 10px; color: #6B7280; line-height: 1.5; }
        .rodape-creditos { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
        .rodape-creditos img { width: 34px; height: auto; }
        .rodape-creditos span { font-size: 10px; color: #6B7280; }
      </style>
    </head>
    <body>
      <div class="cabecalho">
        <h1>MedPeriOp</h1>
        <p>Baseado na série de consensus statements SPAQI (Mayo Clinic Proceedings)</p>
      </div>

      <table class="info" width="100%">
        <tr><td class="rotulo">Paciente</td><td class="valor">${nome}</td></tr>
        <tr><td class="rotulo">Medicamento</td><td class="valor">${medicamento}</td></tr>
        ${
          recomendacao.indicacao
            ? `<tr><td class="rotulo">Indicação</td><td class="valor">${recomendacao.indicacao.descricao}</td></tr>`
            : ""
        }
        <tr><td class="rotulo">Cirurgia prevista</td><td class="valor">${cirurgia}</td></tr>
      </table>

      <div class="decisao">
        ${corpoDecisao}
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
