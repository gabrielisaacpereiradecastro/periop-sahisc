import { Recomendacao } from "@/anticoag/types";
import { SAHISC_LOGO_BASE64 } from "@/sahiscLogo";

/**
 * HTML enxuto (pensado para impressão em A4) com só o essencial da
 * recomendação, para o médico enviar a quem precisar (cirurgião, equipe,
 * etc.). Não repete a lista completa de indicações nem a bibliografia —
 * isso fica só dentro do app.
 */
function estiloBase(): string {
  return `
        @page { margin: 28px; }
        body { font-family: -apple-system, Helvetica, Arial, sans-serif; color: #1F2937; }
        .cabecalho { background-color: #0F766E; color: #FFFFFF; padding: 16px 20px; border-radius: 10px; }
        .cabecalho h1 { margin: 0; font-size: 18px; }
        .cabecalho p { margin: 4px 0 0; font-size: 12px; opacity: 0.9; }
        .info { margin-top: 16px; font-size: 13px; }
        .info td { padding: 3px 0; }
        .info td.rotulo { color: #4B5563; width: 140px; vertical-align: top; }
        .info td.valor { font-weight: 600; }
        .decisao { margin-top: 18px; padding: 14px 16px; border-radius: 10px; border: 1px solid; }
        .decisao p { margin: 4px 0; font-size: 12.5px; line-height: 1.5; }
        .rodape { margin-top: 24px; padding-top: 10px; border-top: 1px solid #E5E7EB; font-size: 10px; color: #6B7280; line-height: 1.5; }
        .rodape-creditos { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
        .rodape-creditos img { width: 34px; height: auto; }
        .rodape-creditos span { font-size: 10px; color: #6B7280; }
  `;
}

function rodape(): string {
  return `
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
  `;
}

function gerarHtmlResumoFitoterapico(recomendacao: Recomendacao, nomePaciente: string): string {
  const nome = nomePaciente.trim() || "Não informado";
  const medicamento = recomendacao.medicamentoNome ?? "Não identificado";
  const individualizado = recomendacao.diasSuspensao == null && !!recomendacao.motivoIndividualizado;

  const corpoDecisao = individualizado
    ? `<p><strong>Decisão individualizada.</strong> ${recomendacao.motivoIndividualizado}</p>`
    : `<p><strong>Suspender ${recomendacao.diasSuspensao} dias antes</strong> de cirurgia eletiva.</p>`;

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>${estiloBase()}
        .decisao { border-color: ${individualizado ? "#4B5563" : "#B45309"}; background-color: ${individualizado ? "#F3F4F6" : "#FEF3C7"}; }
      </style>
    </head>
    <body>
      <div class="cabecalho">
        <h1>AntiCoag PeriOp — Fitoterápicos</h1>
        <p>Elvir Lazo OL, White PF, et al. J Clin Anesth. 2024;95:111473 (risco perioperatório geral, não específico de bloqueio neuraxial)</p>
      </div>

      <table class="info" width="100%">
        <tr><td class="rotulo">Paciente</td><td class="valor">${nome}</td></tr>
        <tr><td class="rotulo">Fitoterápico</td><td class="valor">${medicamento}</td></tr>
      </table>

      <div class="decisao">
        ${corpoDecisao}
        ${recomendacao.situacoesEspeciais ? `<p><strong>Interações e recomendação completa:</strong> ${recomendacao.situacoesEspeciais}</p>` : ""}
      </div>

      ${rodape()}
    </body>
  </html>
  `;
}

export function gerarHtmlResumo(recomendacao: Recomendacao, nomePaciente: string): string {
  if (recomendacao.classe === "fitoterapico") {
    return gerarHtmlResumoFitoterapico(recomendacao, nomePaciente);
  }

  const nome = nomePaciente.trim() || "Não informado";
  const medicamento = recomendacao.medicamentoNome ?? "Não identificado";
  const detalhe = recomendacao.detalhe ?? "Não informado";

  const corAlerta = recomendacao.semRestricao
    ? "#15803D"
    : recomendacao.contraindicado
      ? "#B91C1C"
      : "#B45309";
  const fundoAlerta = recomendacao.semRestricao
    ? "#DCFCE7"
    : recomendacao.contraindicado
      ? "#FEE2E2"
      : "#FEF3C7";

  let corpoDecisao = "";
  if (recomendacao.semRestricao) {
    corpoDecisao +=
      "<p><strong>Não é necessário suspender.</strong> O guideline não identifica risco adicional relevante de sangramento com este medicamento, nem restringe a técnica, monitorização ou retirada de cateter.</p>";
  } else {
    if (recomendacao.contraindicado) {
      corpoDecisao += `<p><strong>⚠️ Bloqueio não recomendado nessa função renal</strong>, a menos que um nível plasmático do medicamento seja dosado e esteja ${recomendacao.nivelResidualAceitavel}.</p>`;
    }
    corpoDecisao += `<p><strong>Suspender nas ${recomendacao.horasSuspensao} horas antes</strong> do bloqueio.</p>`;
    corpoDecisao +=
      recomendacao.horasAteRetomar !== null
        ? `<p><strong>Retomar:</strong> aguardar pelo menos ${recomendacao.horasAteRetomar} horas após a colocação da agulha ou retirada do cateter, antes da próxima dose.</p>`
        : "<p><strong>Retomar:</strong> sem número fixo de horas — ver observação.</p>";
    if (recomendacao.observacaoRetomada) {
      corpoDecisao += `<p><strong>Observação:</strong> ${recomendacao.observacaoRetomada}</p>`;
    }
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
        <h1>AntiCoag PeriOp</h1>
        <p>Baseado em ASRA Pain Medicine, 5ª edição (Kopp SL, et al. Reg Anesth Pain Med 2025)</p>
      </div>

      <table class="info" width="100%">
        <tr><td class="rotulo">Paciente</td><td class="valor">${nome}</td></tr>
        <tr><td class="rotulo">Medicamento</td><td class="valor">${medicamento}</td></tr>
        <tr><td class="rotulo">Detalhe</td><td class="valor">${detalhe}</td></tr>
        ${
          recomendacao.crClUsada !== null
            ? `<tr><td class="rotulo">CrCl usada</td><td class="valor">${recomendacao.crClUsada} mL/min</td></tr>`
            : ""
        }
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
