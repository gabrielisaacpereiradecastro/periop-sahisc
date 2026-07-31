import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/glp1/state/QuestionarioContext";
import { cores, espacamento } from "@/theme";

export default function TelaCirurgia() {
  const { respostas, atualizar } = useQuestionario();

  const podeVerResultado = respostas.pocusDisponivel !== null;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>
          O hospital/serviço onde a cirurgia será realizada tem disponibilidade para fazer
          uma ultrassonografia gástrica (POCUS gástrico) no dia da cirurgia?
        </Text>
        <SeletorOpcoes
          opcoes={[
            { valor: "sim", rotulo: "Sim" },
            { valor: "nao", rotulo: "Não" },
            { valor: "nao_sei", rotulo: "Não sei" },
          ]}
          selecionado={respostas.pocusDisponivel}
          onSelecionar={(v) => atualizar({ pocusDisponivel: v })}
        />
      </Cartao>

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/glp1/resultado")}
        desabilitado={!podeVerResultado}
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
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.sm,
    lineHeight: 21,
  },
});
