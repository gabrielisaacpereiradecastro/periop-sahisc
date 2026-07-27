import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { cores, espacamento, raio } from "@/theme";

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
}

interface Props<T extends string> {
  opcoes: Opcao<T>[];
  selecionado: T | null;
  onSelecionar: (valor: T) => void;
}

export function SeletorOpcoes<T extends string>({ opcoes, selecionado, onSelecionar }: Props<T>) {
  return (
    <View style={estilos.linha} accessibilityRole="radiogroup">
      {opcoes.map((op) => {
        const ativo = op.valor === selecionado;
        return (
          <Pressable
            key={op.valor}
            onPress={() => onSelecionar(op.valor)}
            style={[estilos.opcao, ativo && estilos.opcaoAtiva]}
            accessibilityRole="radio"
            accessibilityState={{ selected: ativo }}
            accessibilityLabel={op.rotulo}
          >
            <Text style={[estilos.texto, ativo && estilos.textoAtivo]}>{op.rotulo}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: espacamento.sm,
  },
  opcao: {
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
  },
  opcaoAtiva: {
    backgroundColor: cores.primariaClara,
    borderColor: cores.primaria,
  },
  texto: {
    color: cores.texto,
    fontSize: 15,
  },
  textoAtivo: {
    color: cores.primariaEscura,
    fontWeight: "700",
  },
});
