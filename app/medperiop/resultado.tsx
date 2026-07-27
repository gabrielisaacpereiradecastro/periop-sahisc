import React, { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { router } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { gerarRecomendacao } from "@/medperiop/logic/regras";
import { gerarHtmlResumo } from "@/medperiop/logic/resumoPdf";
import { formatarDataExtenso } from "@/medperiop/utils/data";
import { cores, espacamento, raio } from "@/theme";

export default function TelaResultado() {
  const { respostas, reiniciar } = useQuestionario();
  const recomendacao = useMemo(() => gerarRecomendacao(respostas), [respostas]);
  const [nomePaciente, setNomePaciente] = useState("");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  function refazer() {
    reiniciar();
    router.dismissAll();
    router.replace("/medperiop");
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
          dialogTitle: "Resumo MedPeriOp",
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
        <Botao titulo="Voltar" onPress={() => router.back()} variante="secundario" />
        <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
        <Botao titulo="Ver bibliografia" onPress={() => router.push("/medperiop/bibliografia")} />
      </ScrollView>
    );
  }

  const farmaco = recomendacao.farmaco!;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estilos.cartaoInfo}>
        <Text style={estilos.tituloCartao}>Resumo do caso</Text>
        <Text style={estilos.textoDecisao}>Medicamento: {farmaco.nomeGenerico}</Text>
        <Text style={estilos.textoDecisao}>Classe: {farmaco.subclasse}</Text>
        {recomendacao.indicacao && (
          <Text style={estilos.textoDecisao}>Indicação: {recomendacao.indicacao.descricao}</Text>
        )}
        {respostas.dataCirurgia && (
          <Text style={estilos.textoDecisao}>
            Cirurgia prevista: {formatarDataExtenso(respostas.dataCirurgia)}
          </Text>
        )}
      </Cartao>

      {recomendacao.decisao === "continuar" && (
        <Cartao style={estilos.cartaoSucesso}>
          <Text style={estilos.tituloSucesso}>Continuar normalmente</Text>
          <Text style={estilos.textoDecisao}>
            Manter o uso habitual do medicamento, incluindo a dose da manhã da cirurgia.
          </Text>
        </Cartao>
      )}

      {recomendacao.decisao === "suspender_dia_cirurgia" && (
        <Cartao style={estilos.cartaoAlerta}>
          <Text style={estilos.tituloAlerta}>Suspender só a dose do dia da cirurgia</Text>
          <Text style={estilos.textoDecisao}>
            Manter a terapia crônica normalmente até a véspera. Não tomar a dose da manhã
            da cirurgia. Retomar o uso habitual assim que possível no pós-operatório.
          </Text>
        </Cartao>
      )}

      {recomendacao.decisao === "suspender_com_data" &&
        (recomendacao.falhaJanelaSuspensao ? (
          <Cartao style={estilos.cartaoPerigo}>
            <Text style={estilos.tituloPerigo}>⚠️ Alerta — não há mais tempo hábil</Text>
            <Text style={estilos.textoPerigo}>
              Este medicamento deveria ter sido suspenso a partir de{" "}
              {recomendacao.dataCorteSuspensao &&
                formatarDataExtenso(recomendacao.dataCorteSuspensao)}
              . Como esse prazo já passou, considere adiar o procedimento eletivo até
              cumprir o intervalo de segurança, ou discutir com a equipe cirúrgica e
              anestésica uma conduta alternativa se o procedimento não puder esperar.
            </Text>
          </Cartao>
        ) : (
          <Cartao style={estilos.cartaoAlerta}>
            <Text style={estilos.tituloAlerta}>Suspender antes da cirurgia</Text>
            <Text style={estilos.textoDecisao}>
              Não usar o medicamento a partir de{" "}
              <Text style={estilos.destaque}>
                {recomendacao.dataCorteSuspensao &&
                  formatarDataExtenso(recomendacao.dataCorteSuspensao)}
              </Text>
              .
            </Text>
          </Cartao>
        ))}

      {recomendacao.decisao === "reduzir_dose" && (
        <Cartao style={estilos.cartaoAlerta}>
          <Text style={estilos.tituloAlerta}>Ajustar a dose (não é suspensão)</Text>
          <Text style={estilos.textoDecisao}>{recomendacao.regraAplicada?.ajusteDose}</Text>
        </Cartao>
      )}

      {recomendacao.decisao === "individualizado" && (
        <Cartao style={estilos.cartaoIndividualizado}>
          <Text style={estilos.tituloIndividualizado}>Decisão individualizada</Text>
          <Text style={estilos.textoIndividualizado}>
            O consensus statement não define um número fixo para este caso — a decisão
            deve ser compartilhada com o médico prescritor e a equipe anestésica/cirúrgica.
          </Text>
          {recomendacao.regraAplicada?.motivoIndividualizado && (
            <Text style={[estilos.textoIndividualizado, { marginTop: espacamento.sm }]}>
              {recomendacao.regraAplicada.motivoIndividualizado}
            </Text>
          )}
        </Cartao>
      )}

      {farmaco.racional && (
        <Cartao>
          <Text style={estilos.tituloCartao}>Racional</Text>
          <Text style={estilos.textoInformativo}>{farmaco.racional}</Text>
        </Cartao>
      )}

      {farmaco.situacoesEspeciais && (
        <Cartao style={estilos.cartaoAtencao}>
          <Text style={estilos.tituloAtencao}>Situações especiais / interações</Text>
          <Text style={estilos.textoAtencao}>{farmaco.situacoesEspeciais}</Text>
        </Cartao>
      )}

      <Cartao style={estilos.cartaoAviso}>
        <Text style={estilos.avisoTexto}>
          Esta recomendação segue exclusivamente a série de consensus statements da SPAQI
          carregada neste aplicativo e não substitui o julgamento do médico
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

      <Botao titulo="Ver bibliografia completa" onPress={() => router.push("/medperiop/bibliografia")} />
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
  tituloAlerta: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.alerta,
    marginBottom: espacamento.sm,
  },
  cartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
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
  cartaoIndividualizado: {
    backgroundColor: "#F3F4F6",
    borderColor: cores.textoSecundario,
  },
  tituloIndividualizado: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.textoSecundario,
    marginBottom: espacamento.sm,
  },
  textoIndividualizado: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 20,
  },
  cartaoAtencao: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  tituloAtencao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#78350F",
    marginBottom: espacamento.xs,
  },
  textoAtencao: {
    fontSize: 13,
    color: "#78350F",
    lineHeight: 19,
  },
  cartaoAviso: {
    backgroundColor: cores.fundo,
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
