import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { cores, espacamento } from "@/theme";

export default function TelaData() {
  function comData() {
    router.push("/medperiop/questionario/cirurgia");
  }

  function semData() {
    router.push("/medperiop/resultado");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Você já sabe a data prevista da cirurgia?</Text>
      <Cartao>
        <Text style={estilos.dica}>
          Se for só para consultar a conduta (sem cirurgia marcada ainda), pode pular esta
          etapa — a recomendação mostra quantos dias antes suspender, sem uma data exata.
        </Text>
        <SeletorOpcoes
          opcoes={[
            { valor: "sim", rotulo: "Sim, tenho a data" },
            { valor: "nao", rotulo: "Não, só quero consultar" },
          ]}
          selecionado={null}
          onSelecionar={(v) => (v === "sim" ? comData() : semData())}
        />
      </Cartao>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  pergunta: {
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
  },
  dica: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
    marginBottom: espacamento.md,
  },
});
