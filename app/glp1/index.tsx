import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/glp1/state/QuestionarioContext";
import { cores, espacamento } from "@/theme";

export default function TelaInicial() {
  const { reiniciar } = useQuestionario();

  function comecar() {
    reiniciar();
    router.push("/glp1/questionario/medicamento");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cabecalho}>
        <Image
          source={require("../../assets/sahisc-mark.png")}
          style={estilos.iconeCabecalho}
          resizeMode="contain"
          accessibilityLabel="Símbolo do SAHISC"
        />
        <View>
          <Text style={estilos.titulo}>GLP-1 PeriOp</Text>
          <Text style={estilos.marca}>SAHISC</Text>
        </View>
      </View>
      <Text style={estilos.subtitulo}>
        Responda algumas perguntas rápidas para saber quando suspender o uso do
        medicamento e como proceder com jejum e dieta antes da cirurgia.
      </Text>

      <Cartao style={estilos.avisoCartao}>
        <Text style={estilos.avisoTexto}>
          Este aplicativo segue exclusivamente a Nota da Sociedade Brasileira de
          Anestesiologia (SBA) C.SBA-01744/2026, de 15/05/2026. Ele não substitui a
          avaliação individualizada do médico anestesiologista responsável pelo caso.
        </Text>
      </Cartao>

      <Cartao style={estilos.privacidadeCartao}>
        <Text style={estilos.privacidadeTexto}>
          O aplicativo funciona 100% localmente, no seu aparelho. Nenhuma informação
          digitada aqui é enviada, salva em servidor ou compartilhada — os dados só saem
          do celular se você mesmo escolher gerar e enviar o PDF resumo.
        </Text>
      </Cartao>

      <Botao titulo="Começar" onPress={comecar} />

      <Botao
        titulo="Consultar bibliografia"
        variante="secundario"
        onPress={() => router.push("/glp1/bibliografia")}
      />

      <View style={estilos.rodape}>
        <Text style={estilos.rodapeTexto}>Desenvolvido por</Text>
        <Image
          source={require("../../assets/sahisc-logo.png")}
          style={estilos.rodapeLogo}
          resizeMode="contain"
          accessibilityLabel="Logotipo do SAHISC, Serviço de Anestesiologia de São Carlos"
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.md,
  },
  iconeCabecalho: {
    width: 56,
    height: 56,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: cores.texto,
  },
  marca: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.primaria,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: cores.textoSecundario,
    lineHeight: 22,
  },
  avisoCartao: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  avisoTexto: {
    color: "#78350F",
    fontSize: 13,
    lineHeight: 19,
  },
  privacidadeCartao: {
    backgroundColor: cores.primariaClara,
    borderColor: cores.primaria,
  },
  privacidadeTexto: {
    color: cores.primariaEscura,
    fontSize: 13,
    lineHeight: 19,
  },
  rodape: {
    alignItems: "center",
    marginTop: espacamento.sm,
  },
  rodapeTexto: {
    fontSize: 11,
    color: cores.textoSecundario,
    marginBottom: espacamento.xs,
  },
  rodapeLogo: {
    width: 90,
    height: 110,
  },
});
