import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Cartao } from "@/components/Cartao";
import { REFERENCIAS } from "@/anticoag/data/referencias";
import { cores, espacamento } from "@/theme";

export default function TelaBibliografia() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      {REFERENCIAS.map((ref) => (
        <Cartao key={ref.numero}>
          <Text style={estilos.tituloProtocolo}>
            {ref.numero}. {ref.citacao}
          </Text>
          <Pressable onPress={() => Linking.openURL(ref.url)}>
            <Text style={estilos.link}>{ref.url}</Text>
          </Pressable>
          <Text style={estilos.tituloEscopo}>Escopo coberto por esta fonte</Text>
          <Text style={estilos.textoEscopo}>{ref.escopo}</Text>
        </Cartao>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.md,
  },
  tituloProtocolo: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.texto,
    lineHeight: 21,
  },
  link: {
    fontSize: 13,
    color: cores.primaria,
    marginTop: espacamento.sm,
    textDecorationLine: "underline",
  },
  tituloEscopo: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.primariaEscura,
    marginTop: espacamento.md,
    marginBottom: espacamento.xs,
  },
  textoEscopo: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
  },
});
