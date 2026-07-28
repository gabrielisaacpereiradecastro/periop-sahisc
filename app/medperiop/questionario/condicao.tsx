import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { cores, espacamento } from "@/theme";

export default function TelaCondicao() {
  const { respostas, atualizar, confirmarMedicamentoAtual } = useQuestionario();

  const farmaco = useMemo(
    () => buscarFarmaco(respostas.classeAtual, respostas.farmacoIdAtual),
    [respostas.classeAtual, respostas.farmacoIdAtual]
  );

  function avancar() {
    if (!farmaco?.condicaoClinica || !respostas.condicaoAtendidaAtual) return;
    const regra =
      respostas.condicaoAtendidaAtual === "sim"
        ? farmaco.condicaoClinica.regraSeSim
        : farmaco.condicaoClinica.regraSeNao;
    if (regra.tipo === "suspender_intervalo_dose") {
      router.push("/medperiop/questionario/frequencia");
    } else {
      confirmarMedicamentoAtual();
      router.push("/medperiop/questionario/mais-medicamentos");
    }
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
        selecionado={respostas.condicaoAtendidaAtual}
        onSelecionar={(v) => atualizar({ condicaoAtendidaAtual: v })}
      />
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.condicaoAtendidaAtual} />
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
