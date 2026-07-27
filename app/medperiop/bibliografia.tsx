import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Cartao } from "@/components/Cartao";
import { REFERENCIAS, ESCOPO_ATUAL } from "@/medperiop/data/referencias";
import { cores, espacamento } from "@/theme";

export default function TelaBibliografia() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estilos.cartaoEscopo}>
        <Text style={estilos.tituloEscopo}>Escopo coberto pelo aplicativo</Text>
        <Text style={estilos.textoEscopo}>{ESCOPO_ATUAL}</Text>
      </Cartao>

      {REFERENCIAS.map((ref) => (
        <Cartao key={ref.numero}>
          <Text style={estilos.tituloProtocolo}>{ref.numero}. {ref.citacao}</Text>
          {ref.url && (
            <Pressable onPress={() => Linking.openURL(ref.url!)}>
              <Text style={estilos.link}>{ref.url}</Text>
            </Pressable>
          )}
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
    fontSize: 14,
    fontWeight: "600",
    color: cores.texto,
    lineHeight: 20,
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
