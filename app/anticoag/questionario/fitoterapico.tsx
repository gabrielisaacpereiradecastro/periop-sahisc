import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { FITOTERAPICOS } from "@/anticoag/data/fitoterapicos";
import { cores, espacamento, raio } from "@/theme";

export default function TelaFitoterapico() {
  const { respostas, atualizar } = useQuestionario();

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual fitoterápico o paciente usa?</Text>
      <View style={estilos.lista} accessibilityRole="radiogroup">
        {FITOTERAPICOS.map((f) => {
          const ativo = respostas.fitoterapicoId === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => atualizar({ fitoterapicoId: f.id })}
              style={[estilos.item, ativo && estilos.itemAtivo]}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={f.nomeGenerico}
            >
              <Text style={[estilos.textoItem, ativo && estilos.textoItemAtivo]}>
                {f.nomeGenerico}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/anticoag/resultado")}
        desabilitado={respostas.fitoterapicoId === null}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  pergunta: {
    fontSize: 18,
    fontWeight: "700",
    color: cores.texto,
  },
  lista: {
    gap: espacamento.sm,
  },
  item: {
    padding: espacamento.md,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
  },
  itemAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  textoItem: {
    color: cores.texto,
    fontSize: 15,
    fontWeight: "600",
  },
  textoItemAtivo: {
    color: cores.primariaEscura,
  },
});
