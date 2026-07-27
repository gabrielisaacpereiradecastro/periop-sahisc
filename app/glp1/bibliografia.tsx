import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Cartao } from "@/components/Cartao";
import { PROTOCOLO_META, REFERENCIAS } from "@/glp1/data/referencias";
import { cores, espacamento } from "@/theme";

export default function TelaBibliografia() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.tituloProtocolo}>{PROTOCOLO_META.titulo}</Text>
        <Text style={estilos.metaTexto}>
          {PROTOCOLO_META.numero} — {PROTOCOLO_META.data}
        </Text>
        <Text style={[estilos.metaTexto, estilos.espacoTopo]}>{PROTOCOLO_META.autores}</Text>
        <Text style={[estilos.metaTexto, estilos.espacoTopo]}>{PROTOCOLO_META.chancela}</Text>
      </Cartao>

      <Text style={estilos.secao}>Referências</Text>
      {REFERENCIAS.map((ref) => (
        <Cartao key={ref.numero} style={estilos.cartaoRef}>
          <Text style={estilos.textoRef}>
            <Text style={estilos.numeroRef}>{ref.numero}. </Text>
            {ref.citacao}
          </Text>
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
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    lineHeight: 22,
  },
  metaTexto: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
  },
  espacoTopo: {
    marginTop: espacamento.sm,
  },
  secao: {
    fontSize: 18,
    fontWeight: "700",
    color: cores.texto,
    marginTop: espacamento.sm,
  },
  cartaoRef: {
    padding: espacamento.md,
  },
  textoRef: {
    fontSize: 13,
    color: cores.texto,
    lineHeight: 20,
  },
  numeroRef: {
    fontWeight: "700",
  },
  link: {
    fontSize: 12,
    color: cores.primaria,
    marginTop: espacamento.xs,
    textDecorationLine: "underline",
  },
});
