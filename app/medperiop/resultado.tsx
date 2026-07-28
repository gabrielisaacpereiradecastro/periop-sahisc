import React, { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { gerarRecomendacoes } from "@/medperiop/logic/regras";
import { gerarHtmlResumo } from "@/medperiop/logic/resumoPdf";
import { Recomendacao } from "@/medperiop/types";
import { formatarDataExtenso } from "@/medperiop/utils/data";
import { cores, espacamento, raio } from "@/theme";

function CartaoDecisao({ recomendacao }: { recomendacao: Recomendacao }) {
  if (recomendacao.decisao === "indeterminado") {
    return (
      <Cartao style={estilos.cartaoPerigo}>
        <Text style={estilos.tituloPerigo}>Não foi possível gerar uma recomendação</Text>
        <Text style={estilos.textoPerigo}>{recomendacao.motivoIndeterminado}</Text>
      </Cartao>
    );
  }

  const farmaco = recomendacao.farmaco!;

  return (
    <Cartao style={estilos.cartaoMedicamento}>
      <Text style={estilos.tituloCartao}>{farmaco.nomeGenerico}</Text>
      <Text style={estilos.textoInformativo}>{farmaco.subclasse}</Text>
      {recomendacao.indicacao && (
        <Text style={[estilos.textoDecisao, { marginTop: espacamento.xs }]}>
          Indicação: {recomendacao.indicacao.descricao}
        </Text>
      )}

      {recomendacao.decisao === "continuar" && (
        <View style={[estilos.subCartao, estilos.subCartaoSucesso]}>
          <Text style={estilos.tituloSucesso}>Continuar normalmente</Text>
          <Text style={estilos.textoDecisao}>
            Manter o uso habitual do medicamento, incluindo a dose da manhã da cirurgia.
          </Text>
        </View>
      )}

      {recomendacao.decisao === "suspender_dia_cirurgia" && (
        <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
          <Text style={estilos.tituloAlerta}>Suspender só a dose do dia da cirurgia</Text>
          <Text style={estilos.textoDecisao}>
            Manter a terapia crônica normalmente até a véspera. Não tomar a dose da manhã
            da cirurgia. Retomar o uso habitual assim que possível no pós-operatório.
          </Text>
        </View>
      )}

      {recomendacao.decisao === "suspender_com_data" &&
        (recomendacao.falhaJanelaSuspensao ? (
          <View style={[estilos.subCartao, estilos.subCartaoPerigo]}>
            <Text style={estilos.tituloPerigo}>⚠️ Alerta — não há mais tempo hábil</Text>
            <Text style={estilos.textoPerigo}>
              Este medicamento deveria ter sido suspenso a partir de{" "}
              {recomendacao.dataCorteSuspensao &&
                formatarDataExtenso(recomendacao.dataCorteSuspensao)}
              . Como esse prazo já passou, considere adiar o procedimento eletivo até
              cumprir o intervalo de segurança, ou discutir com a equipe cirúrgica e
              anestésica uma conduta alternativa se o procedimento não puder esperar.
            </Text>
          </View>
        ) : recomendacao.dataCorteSuspensao ? (
          <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
            <Text style={estilos.tituloAlerta}>Suspender antes da cirurgia</Text>
            <Text style={estilos.textoDecisao}>
              Não usar o medicamento a partir de{" "}
              <Text style={estilos.destaque}>
                {formatarDataExtenso(recomendacao.dataCorteSuspensao)}
              </Text>
              .
            </Text>
          </View>
        ) : (
          <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
            <Text style={estilos.tituloAlerta}>Suspender antes da cirurgia</Text>
            <Text style={estilos.textoDecisao}>
              Suspender <Text style={estilos.destaque}>{recomendacao.diasSuspensao} dia
              {recomendacao.diasSuspensao !== 1 ? "s" : ""} antes</Text> da cirurgia. (Data
              da cirurgia não informada — sem uma data exata, não é possível calcular o dia
              exato de corte nem verificar se ainda há tempo hábil.)
            </Text>
          </View>
        ))}

      {recomendacao.decisao === "reduzir_dose" && (
        <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
          <Text style={estilos.tituloAlerta}>Ajustar a dose (não é suspensão)</Text>
          <Text style={estilos.textoDecisao}>{recomendacao.regraAplicada?.ajusteDose}</Text>
        </View>
      )}

      {recomendacao.decisao === "individualizado" && (
        <View style={[estilos.subCartao, estilos.subCartaoIndividualizado]}>
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
        </View>
      )}

      {farmaco.racional && (
        <View style={estilos.blocoTexto}>
          <Text style={estilos.subtituloBloco}>Racional</Text>
          <Text style={estilos.textoInformativo}>{farmaco.racional}</Text>
        </View>
      )}

      {farmaco.situacoesEspeciais && (
        <View style={[estilos.blocoTexto, estilos.blocoAtencao]}>
          <Text style={estilos.tituloAtencao}>Situações especiais / interações</Text>
          <Text style={estilos.textoAtencao}>{farmaco.situacoesEspeciais}</Text>
        </View>
      )}
    </Cartao>
  );
}

export default function TelaResultado() {
  const { respostas, reiniciar } = useQuestionario();
  const recomendacoes = useMemo(() => gerarRecomendacoes(respostas), [respostas]);
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
      const html = gerarHtmlResumo(respostas, recomendacoes, nomePaciente);

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

  if (recomendacoes.length === 0) {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>Nenhum medicamento adicionado</Text>
          <Text style={estilos.textoPerigo}>
            Volte e adicione ao menos um medicamento antes de ver a recomendação.
          </Text>
        </Cartao>
        <Botao titulo="Voltar" onPress={() => router.back()} variante="secundario" />
        <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estilos.cartaoInfo}>
        <Text style={estilos.tituloCartao}>Resumo do caso</Text>
        <Text style={estilos.textoDecisao}>
          {recomendacoes.length} medicamento{recomendacoes.length !== 1 ? "s" : ""} avaliado
          {recomendacoes.length !== 1 ? "s" : ""}
        </Text>
        <Text style={estilos.textoDecisao}>
          Cirurgia prevista:{" "}
          {respostas.dataCirurgia ? formatarDataExtenso(respostas.dataCirurgia) : "não informada"}
        </Text>
      </Cartao>

      {recomendacoes.map((recomendacao, i) => (
        <CartaoDecisao key={recomendacao.farmaco?.id ?? i} recomendacao={recomendacao} />
      ))}

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
  cartaoMedicamento: {
    gap: 0,
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
  subCartao: {
    marginTop: espacamento.md,
    padding: espacamento.md,
    borderRadius: raio.md,
    borderWidth: 1,
  },
  subCartaoSucesso: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  tituloSucesso: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.sucesso,
    marginBottom: espacamento.xs,
  },
  subCartaoAlerta: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  tituloAlerta: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.alerta,
    marginBottom: espacamento.xs,
  },
  subCartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
  },
  subCartaoIndividualizado: {
    backgroundColor: "#F3F4F6",
    borderColor: cores.textoSecundario,
  },
  tituloIndividualizado: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.textoSecundario,
    marginBottom: espacamento.xs,
  },
  textoIndividualizado: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 20,
  },
  blocoTexto: {
    marginTop: espacamento.md,
  },
  blocoAtencao: {
    padding: espacamento.md,
    borderRadius: raio.md,
    borderWidth: 1,
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  subtituloBloco: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  tituloAtencao: {
    fontSize: 13,
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
