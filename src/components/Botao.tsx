import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { cores, espacamento, raio } from "@/theme";

interface Props {
  titulo: string;
  onPress: () => void;
  variante?: "primario" | "secundario";
  desabilitado?: boolean;
}

export function Botao({ titulo, onPress, variante = "primario", desabilitado }: Props) {
  const primario = variante === "primario";
  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: !!desabilitado }}
      style={({ pressed }) => [
        estilos.base,
        primario ? estilos.primario : estilos.secundario,
        desabilitado && estilos.desabilitado,
        pressed && !desabilitado && estilos.pressionado,
      ]}
    >
      <Text style={[estilos.texto, primario ? estilos.textoPrimario : estilos.textoSecundario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    paddingVertical: espacamento.md,
    paddingHorizontal: espacamento.lg,
    borderRadius: raio.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primario: {
    backgroundColor: cores.primaria,
  },
  secundario: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.primaria,
  },
  desabilitado: {
    opacity: 0.4,
  },
  pressionado: {
    opacity: 0.85,
  },
  texto: {
    fontSize: 16,
    fontWeight: "600",
  },
  textoPrimario: {
    color: cores.branco,
  },
  textoSecundario: {
    color: cores.primaria,
  },
});
