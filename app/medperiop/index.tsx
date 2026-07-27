import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { cores, espacamento } from "@/theme";

export default function TelaInicial() {
  const { reiniciar } = useQuestionario();

  function comecar() {
    reiniciar();
    router.push("/medperiop/questionario/classe");
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
          <Text style={estilos.titulo}>MedPeriOp</Text>
          <Text style={estilos.marca}>SAHISC</Text>
        </View>
      </View>
      <Text style={estilos.subtitulo}>
        Responda algumas perguntas rápidas sobre a medicação de uso crônico do paciente
        para saber se deve manter, suspender (e quantos dias antes) ou ajustar a dose
        antes da cirurgia.
      </Text>

      <Cartao style={estilos.avisoCartao}>
        <Text style={estilos.avisoTexto}>
          Este aplicativo segue exclusivamente a série de consensus statements da Society
          for Perioperative Assessment and Quality Improvement (SPAQI), publicada na Mayo
          Clinic Proceedings, elaborada por painel multidisciplinar com metodologia Delphi
          modificada. Cobre 7 classes: cardiovascular, endócrino/hormonal/urológico
          (inclui diabetes), gastrointestinal/pulmonar, neurológico, psiquiátrico,
          reumatológico/HIV (inclui AINEs) e analgésicos. Não cobre anticoagulantes/
          antiagregantes (ver app AntiCoag PeriOp), agonistas do GLP-1 (ver app GLP-1
          PeriOp) nem gabapentinoides. Quando o artigo-fonte não define um número fixo,
          o aplicativo sinaliza "decisão individualizada" em vez de estimar um valor. Não
          substitui a avaliação individualizada do médico anestesiologista responsável.
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
        onPress={() => router.push("/medperiop/bibliografia")}
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
