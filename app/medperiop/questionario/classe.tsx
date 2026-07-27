import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { CLASSES_TERAPEUTICAS, ClasseTerapeutica } from "@/medperiop/types";
import { cores, espacamento } from "@/theme";

export default function TelaClasse() {
  const { respostas, atualizar } = useQuestionario();

  function selecionar(classe: ClasseTerapeutica) {
    atualizar({ classe, farmacoId: null, indicacaoId: null, condicaoAtendida: null, frequenciaDoseDias: null });
    router.push("/medperiop/questionario/farmaco");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual a classe terapêutica da medicação?</Text>
      {CLASSES_TERAPEUTICAS.map((c) => (
        <Cartao key={c.valor} style={respostas.classe === c.valor ? estilos.cartaoAtivo : undefined}>
          <Botao titulo={c.rotulo} variante="secundario" onPress={() => selecionar(c.valor)} />
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
  pergunta: {
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  cartaoAtivo: {
    borderColor: cores.primaria,
  },
});
