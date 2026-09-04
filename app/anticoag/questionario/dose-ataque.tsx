import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { buscarAntiplaquetario, rotuloAntiplaquetario } from "@/anticoag/data/antiplaquetarios";
import { cores, espacamento } from "@/theme";

/**
 * Pergunta extra só para clopidogrel/prasugrel/ticagrelor (muda o intervalo
 * de retomada) — resolvida um de cada vez para cada antiplaquetário marcado
 * que precisa dela, via `filaAntiplaquetarioPendente`.
 */
export default function TelaDoseAtaque() {
  const { respostas, atualizar, confirmarAntiplaquetarioAtual } = useQuestionario();
  const medicamento = buscarAntiplaquetario(respostas.antiplaquetarioIdAtual);

  function avancar() {
    const proximo = confirmarAntiplaquetarioAtual();
    router.replace(
      proximo === "dose_ataque"
        ? "/anticoag/questionario/dose-ataque"
        : "/anticoag/questionario/mais-medicamentos"
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>
          Está prevista uma dose de ataque (loading dose) de{" "}
          {medicamento ? rotuloAntiplaquetario(medicamento) : "medicamento"} no pós-operatório?
        </Text>
        <SeletorOpcoes
          opcoes={[
            { valor: "sim", rotulo: "Sim" },
            { valor: "nao", rotulo: "Não" },
          ]}
          selecionado={respostas.doseAtaquePosOp}
          onSelecionar={(v) => atualizar({ doseAtaquePosOp: v })}
        />
      </Cartao>

      <Botao titulo="Próximo" onPress={avancar} desabilitado={respostas.doseAtaquePosOp === null} />
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
    lineHeight: 21,
    marginBottom: espacamento.sm,
  },
});
