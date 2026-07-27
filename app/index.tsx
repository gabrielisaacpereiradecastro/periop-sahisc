import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { Checklist } from "@/components/Checklist";
import { cores, espacamento } from "@/theme";

const TERMO_ACEITE = [
  {
    id: "aceite",
    descricao:
      "Li e entendi que este aplicativo não substitui a avaliação individualizada do médico anestesiologista responsável, e que cada área segue exclusivamente a fonte carregada nela (guideline ASRA, Nota SBA, ou consensus statements SPAQI, conforme a seção).",
  },
];

export default function TelaInicial() {
  const [aceitou, setAceitou] = useState(false);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cabecalho}>
        <Image
          source={require("../assets/sahisc-mark.png")}
          style={estilos.iconeCabecalho}
          resizeMode="contain"
          accessibilityLabel="Símbolo do SAHISC"
        />
        <View>
          <Text style={estilos.titulo}>PeriOp</Text>
          <Text style={estilos.marca}>SAHISC</Text>
        </View>
      </View>
      <Text style={estilos.subtitulo}>
        Apoio à decisão sobre manejo perioperatório de medicações de uso contínuo do
        paciente — anticoagulantes/antiagregantes, agonistas do GLP-1, e demais
        medicações crônicas (cardiovascular, endócrino, GI/pulmonar, neurológico,
        psiquiátrico, reumatológico/HIV, analgésicos) — num só lugar.
      </Text>

      <Cartao style={estilos.avisoCartao}>
        <Text style={estilos.avisoTexto}>
          Cada área deste aplicativo segue exclusivamente sua fonte própria: guideline
          ASRA Pain Medicine (anticoagulantes/antiagregantes), Nota SBA (GLP-1), ou a
          série de consensus statements da SPAQI, Mayo Clinic Proceedings (demais
          classes). Nenhuma recomendação aqui substitui a avaliação individualizada do
          médico anestesiologista responsável.
        </Text>
      </Cartao>

      <Cartao style={estilos.privacidadeCartao}>
        <Text style={estilos.privacidadeTexto}>
          O aplicativo funciona 100% localmente, no seu aparelho. Nenhuma informação
          digitada aqui é enviada, salva em servidor ou compartilhada — os dados só saem
          do celular se você mesmo escolher gerar e enviar o PDF resumo.
        </Text>
      </Cartao>

      <Checklist
        itens={TERMO_ACEITE}
        selecionados={aceitou ? ["aceite"] : []}
        onAlternar={() => setAceitou((atual) => !atual)}
      />

      <Botao
        titulo="Começar"
        onPress={() => router.push("/categoria")}
        desabilitado={!aceitou}
      />

      <View style={estilos.rodape}>
        <Text style={estilos.rodapeTexto}>Desenvolvido por</Text>
        <Image
          source={require("../assets/sahisc-logo.png")}
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
