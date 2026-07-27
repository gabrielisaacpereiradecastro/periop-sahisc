import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { cores, espacamento, raio } from "@/theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Cartao({ children, style }: Props) {
  return <View style={[estilos.cartao, style]}>{children}</View>;
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.fundoCartao,
    borderRadius: raio.lg,
    padding: espacamento.lg,
    borderWidth: 1,
    borderColor: cores.borda,
  },
});
