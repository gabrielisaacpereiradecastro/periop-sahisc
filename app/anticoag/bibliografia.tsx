import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Cartao } from "@/components/Cartao";
import { PROTOCOLO_META, ESCOPO_ATUAL } from "@/anticoag/data/referencias";
import { cores, espacamento } from "@/theme";

export default function TelaBibliografia() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.tituloProtocolo}>{PROTOCOLO_META.titulo}</Text>
        <Text style={estilos.metaTexto}>{PROTOCOLO_META.autores}</Text>
        <Text style={estilos.metaTexto}>{PROTOCOLO_META.publicacao}</Text>
        <Text style={estilos.metaTexto}>doi: {PROTOCOLO_META.doi}</Text>
        <Pressable onPress={() => Linking.openURL(PROTOCOLO_META.url)}>
          <Text style={estilos.link}>{PROTOCOLO_META.url}</Text>
        </Pressable>
      </Cartao>

      <Cartao style={estilos.cartaoEscopo}>
        <Text style={estilos.tituloEscopo}>Escopo coberto pelo aplicativo</Text>
        <Text style={estilos.textoEscopo}>{ESCOPO_ATUAL}</Text>
      </Cartao>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.md,
  },
  tituloProtocolo: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    lineHeight: 22,
  },
  metaTexto: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
    marginTop: espacamento.xs,
  },
  link: {
    fontSize: 13,
    color: cores.primaria,
    marginTop: espacamento.sm,
    textDecorationLine: "underline",
  },
  cartaoEscopo: {
    backgroundColor: cores.primariaClara,
    borderColor: cores.primaria,
  },
  tituloEscopo: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.primariaEscura,
    marginBottom: espacamento.xs,
  },
  textoEscopo: {
    fontSize: 13,
    color: cores.primariaEscura,
    lineHeight: 19,
  },
});
