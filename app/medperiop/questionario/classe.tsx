import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { CLASSES_TERAPEUTICAS, ClasseTerapeutica } from "@/medperiop/types";
import { cores, espacamento } from "@/theme";

export default function TelaClasse() {
  const { respostas, atualizar } = useQuestionario();

  function irParaFarmaco() {
    router.push("/medperiop/questionario/farmaco");
  }

  function selecionar(classe: ClasseTerapeutica) {
    atualizar({
      classeAtual: classe,
      farmacoIdAtual: null,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    });
    irParaFarmaco();
  }

  function selecionarTodas() {
    atualizar({
      classeAtual: "todas",
      farmacoIdAtual: null,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    });
    irParaFarmaco();
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>
        {respostas.medicamentos.length > 0
          ? `Qual a classe do próximo medicamento? (${respostas.medicamentos.length} já adicionado${respostas.medicamentos.length > 1 ? "s" : ""})`
          : "Qual a classe terapêutica da medicação?"}
      </Text>
      {CLASSES_TERAPEUTICAS.map((c) => (
        <Cartao key={c.valor} style={respostas.classeAtual === c.valor ? estilos.cartaoAtivo : undefined}>
          <Botao titulo={c.rotulo} variante="secundario" onPress={() => selecionar(c.valor)} />
        </Cartao>
      ))}

      <View style={estilos.separador}>
        <View style={estilos.linha} />
        <Text style={estilos.separadorTexto}>ou</Text>
        <View style={estilos.linha} />
      </View>

      <Cartao style={respostas.classeAtual === "todas" ? estilos.cartaoAtivo : undefined}>
        <Botao titulo="Todos os medicamentos" onPress={selecionarTodas} />
      </Cartao>
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
  separador: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.sm,
    marginVertical: espacamento.xs,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: cores.borda,
  },
  separadorTexto: {
    fontSize: 12,
    color: cores.textoSecundario,
    fontWeight: "600",
  },
});
