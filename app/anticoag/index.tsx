import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { cores, espacamento } from "@/theme";

export default function TelaInicial() {
  const { reiniciar } = useQuestionario();

  function comecar() {
    reiniciar();
    router.push("/anticoag/questionario/classe");
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
          <Text style={estilos.titulo}>AntiCoag PeriOp</Text>
          <Text style={estilos.marca}>SAHISC</Text>
        </View>
      </View>
      <Text style={estilos.subtitulo}>
        Responda algumas perguntas rápidas sobre o anticoagulante do paciente para saber
        quando suspender antes do bloqueio (neuraxial ou de plexo profundo/periférico) e
        quando retomar depois da colocação de agulha ou retirada de cateter.
      </Text>

      <Cartao style={estilos.avisoCartao}>
        <Text style={estilos.avisoTexto}>
          Este aplicativo segue exclusivamente as Evidence-Based Guidelines da American
          Society of Regional Anesthesia and Pain Medicine (ASRA Pain Medicine), 5ª edição
          (Kopp SL, et al. Reg Anesth Pain Med 2025). Cobre, por enquanto, anticoagulantes
          orais diretos (DOACs), heparina (não fracionada e de baixo peso molecular) e
          antiplaquetários — outras classes (inibidores diretos de trombina parenterais,
          trombolíticos, gestante) serão adicionadas em atualizações futuras. Não
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
        onPress={() => router.push("/anticoag/bibliografia")}
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
