import React, { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { gerarRecomendacaoDoac } from "@/anticoag/logic/regras";
import { gerarRecomendacaoHbpm, gerarRecomendacaoHnf } from "@/anticoag/logic/regrasHeparina";
import { gerarRecomendacaoAntiplaquetario } from "@/anticoag/logic/regrasAntiplaquetario";
import { gerarHtmlResumo } from "@/anticoag/logic/resumoPdf";
import { CalculadoraCateter } from "@/anticoag/components/CalculadoraCateter";
import { Recomendacao } from "@/anticoag/types";
import { formatarDataHoraExtenso } from "@/anticoag/utils/data";
import { cores, espacamento, raio } from "@/theme";

const ORIGEM_CRCL_TEXTO: Record<string, string> = {
  exata: "valor informado",
  normal: "estimativa para função renal normal (não é o valor real do paciente)",
  reduzida_desconhecida:
    "estimativa conservadora para função renal reduzida (não é o valor real do paciente)",
};

function calcular(respostas: ReturnType<typeof useQuestionario>["respostas"]): Recomendacao {
  if (respostas.classe === "hnf") return gerarRecomendacaoHnf(respostas);
  if (respostas.classe === "hbpm") return gerarRecomendacaoHbpm(respostas);
  if (respostas.classe === "antiplaquetario") return gerarRecomendacaoAntiplaquetario(respostas);
  return gerarRecomendacaoDoac(respostas);
}

export default function TelaResultado() {
  const { respostas, reiniciar } = useQuestionario();
  const recomendacao = useMemo(() => calcular(respostas), [respostas]);
  const [nomePaciente, setNomePaciente] = useState("");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  function refazer() {
    reiniciar();
    router.dismissAll();
    router.replace("/anticoag");
  }

  async function baixarPdf() {
    setGerandoPdf(true);
    try {
      const html = gerarHtmlResumo(respostas, recomendacao, nomePaciente);

      if (Platform.OS === "web") {
        await Print.printAsync({ html });
        return;
      }

      const { uri } = await Print.printToFileAsync({ html, base64: false });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Resumo AntiCoag perioperatório",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("PDF gerado", `Arquivo salvo em: ${uri}`);
      }
    } catch {
      Alert.alert(
        "Não foi possível gerar o PDF",
        "Tente novamente. Se o problema continuar, feche e reabra o aplicativo."
      );
    } finally {
      setGerandoPdf(false);
    }
  }

  if (recomendacao.decisao === "indeterminado") {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>Não foi possível gerar uma recomendação</Text>
          <Text style={estilos.textoPerigo}>{recomendacao.motivoIndeterminado}</Text>
        </Cartao>
        <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
        <Botao titulo="Ver bibliografia" onPress={() => router.push("/anticoag/bibliografia")} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estilos.cartaoInfo}>
        <Text style={estilos.tituloCartao}>Resumo do caso</Text>
        {recomendacao.medicamentoNome && (
          <Text style={estilos.textoDecisao}>Medicamento: {recomendacao.medicamentoNome}</Text>
        )}
        {recomendacao.detalhe && (
          <Text style={estilos.textoDecisao}>{recomendacao.detalhe}</Text>
        )}
        {recomendacao.crClUsada !== null && recomendacao.crClOrigem && (
          <Text style={estilos.textoDecisao}>
            CrCl usada no cálculo: {recomendacao.crClUsada} mL/min (
            {ORIGEM_CRCL_TEXTO[recomendacao.crClOrigem]})
          </Text>
        )}
      </Cartao>

      {recomendacao.contraindicado && (
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>⚠️ Bloqueio não recomendado nessa função renal</Text>
          <Text style={estilos.textoPerigo}>
            O guideline sugere não realizar o bloqueio neuraxial ou de plexo
            profundo/periférico nessa faixa de função renal, a menos que um nível
            plasmático do medicamento seja dosado e esteja {recomendacao.nivelResidualAceitavel}.
          </Text>
        </Cartao>
      )}

      {recomendacao.semRestricao ? (
        <Cartao style={estilos.cartaoSucesso}>
          <Text style={estilos.tituloSucesso}>Não é necessário suspender</Text>
          <Text style={estilos.textoDecisao}>
            O guideline não identifica risco adicional relevante de sangramento com este
            medicamento, e não restringe a técnica (dose única ou cateter), a
            monitorização, ou o momento de retirada do cateter.
          </Text>
        </Cartao>
      ) : recomendacao.falhaJanelaSuspensao ? (
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>⚠️ Alerta de segurança — falha na suspensão</Text>
          <Text style={estilos.textoPerigo}>
            Este medicamento exige suspensão prévia de {recomendacao.horasSuspensao} horas
            antes do procedimento — ou seja, o uso deveria ter sido suspenso a partir de{" "}
            {recomendacao.dataHoraCorteSuspensao &&
              formatarDataHoraExtenso(recomendacao.dataHoraCorteSuspensao)}
            . Por não cumprir esse intervalo, considere:
          </Text>
          <Text style={[estilos.textoPerigo, estilos.destaquePerigo]}>
            Procedimentos eletivos: devem ser adiados e reagendados após o cumprimento do
            prazo de segurança.
          </Text>
          <Text style={[estilos.textoPerigo, estilos.destaquePerigo]}>
            Procedimentos de urgência/emergência: considere avaliar o nível
            plasmático/coagulação (aceitável {recomendacao.nivelResidualAceitavel}), e
            discuta com a equipe uma técnica anestésica alternativa caso a suspensão não
            seja possível a tempo.
          </Text>
        </Cartao>
      ) : (
        <Cartao style={estilos.cartaoAlerta}>
          <Text style={estilos.tituloAlerta}>Suspender antes do procedimento</Text>
          <Text style={estilos.textoDecisao}>
            Não usar o medicamento a partir de{" "}
            <Text style={estilos.destaque}>
              {recomendacao.dataHoraCorteSuspensao &&
                formatarDataHoraExtenso(recomendacao.dataHoraCorteSuspensao)}
            </Text>{" "}
            — ou seja, suspensão de {recomendacao.horasSuspensao} horas antes do bloqueio
            (agulha ou colocação de cateter).
          </Text>
          {recomendacao.nivelResidualAceitavel && (
            <Text style={estilos.textoDecisao}>
              Nível residual aceitável, se o tempo não puder ser cumprido:{" "}
              {recomendacao.nivelResidualAceitavel}.
            </Text>
          )}
        </Cartao>
      )}

      {!recomendacao.semRestricao && (
        <Cartao>
          <Text style={estilos.tituloCartao}>Retomar após o procedimento</Text>
          {recomendacao.horasAteRetomar !== null ? (
            <Text style={estilos.textoInformativo}>
              Aguarde pelo menos{" "}
              <Text style={estilos.destaque}>{recomendacao.horasAteRetomar} horas</Text>{" "}
              após a colocação da agulha (bloqueio único) — ou, no caso de cateter, após a{" "}
              <Text style={estilos.destaque}>retirada do cateter</Text> — antes da próxima
              dose do medicamento.
            </Text>
          ) : (
            <Text style={estilos.textoInformativo}>
              O guideline não define um número fixo de horas para retomada — veja a
              observação abaixo.
            </Text>
          )}
          {recomendacao.observacaoRetomada && (
            <Text style={[estilos.textoInformativo, { marginTop: espacamento.sm }]}>
              {recomendacao.observacaoRetomada}
            </Text>
          )}
        </Cartao>
      )}

      <CalculadoraCateter
        horasSuspensao={recomendacao.horasSuspensao}
        nivelResidualAceitavel={recomendacao.nivelResidualAceitavel}
        contraindicado={recomendacao.contraindicado}
      />

      <Cartao style={estilos.cartaoAviso}>
        <Text style={estilos.avisoTexto}>
          Esta recomendação segue exclusivamente o guideline ASRA Pain Medicine (5ª edição,
          2025) carregado neste aplicativo e não substitui o julgamento do médico
          anestesiologista responsável, que deve avaliar cada caso de forma individualizada.
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.tituloCartao}>Enviar resumo para interessados</Text>
        <Text style={[estilos.textoInformativo, { marginBottom: espacamento.sm }]}>
          Gera um PDF curto, só com o essencial, para enviar ao cirurgião ou a quem precisar.
        </Text>
        <TextInput
          style={estilos.campoNome}
          placeholder="Nome do paciente (opcional)"
          accessibilityLabel="Nome do paciente, opcional"
          value={nomePaciente}
          onChangeText={setNomePaciente}
        />
        <Botao
          titulo={gerandoPdf ? "Gerando PDF…" : "Baixar PDF resumo"}
          onPress={baixarPdf}
          desabilitado={gerandoPdf}
        />
        {Platform.OS === "web" && (
          <Text style={[estilos.textoInformativo, { marginTop: espacamento.sm }]}>
            Vai abrir o diálogo de impressão do navegador — escolha "Salvar como PDF".
          </Text>
        )}
      </Cartao>

      <Botao titulo="Ver bibliografia completa" onPress={() => router.push("/anticoag/bibliografia")} />
      <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  cartaoInfo: {
    backgroundColor: cores.fundoCartao,
  },
  cartaoSucesso: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  tituloSucesso: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.sucesso,
    marginBottom: espacamento.sm,
  },
  cartaoAlerta: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  cartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
  },
  cartaoAviso: {
    backgroundColor: cores.fundo,
  },
  tituloAlerta: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.alerta,
    marginBottom: espacamento.sm,
  },
  tituloPerigo: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.perigo,
    marginBottom: espacamento.sm,
  },
  textoPerigo: {
    color: "#7F1D1D",
    fontSize: 14,
    lineHeight: 20,
    marginTop: espacamento.xs,
  },
  destaquePerigo: {
    fontWeight: "700",
  },
  textoDecisao: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 21,
    marginTop: espacamento.xs,
  },
  destaque: {
    fontWeight: "800",
  },
  tituloCartao: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.sm,
  },
  textoInformativo: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 20,
  },
  avisoTexto: {
    fontSize: 12,
    color: cores.textoSecundario,
    lineHeight: 18,
    fontStyle: "italic",
  },
  campoNome: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 15,
    color: cores.texto,
    marginBottom: espacamento.md,
  },
});
