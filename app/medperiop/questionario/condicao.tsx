import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { cores, espacamento } from "@/theme";

export default function TelaCondicao() {
  const { respostas, atualizar } = useQuestionario();

  const farmaco = useMemo(
    () => buscarFarmaco(respostas.classe, respostas.farmacoId),
    [respostas.farmacoId]
  );

  function avancar() {
    router.push("/medperiop/questionario/cirurgia");
  }

  if (!farmaco?.condicaoClinica) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>{farmaco.condicaoClinica.pergunta}</Text>
      <SeletorOpcoes
        opcoes={[
          { valor: "sim", rotulo: "Sim" },
          { valor: "nao", rotulo: "Não" },
        ]}
        selecionado={respostas.condicaoAtendida}
        onSelecionar={(v) => atualizar({ condicaoAtendida: v })}
      />
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.condicaoAtendida} />
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
});
