import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { ANTIPLAQUETARIOS, rotuloAntiplaquetario } from "@/anticoag/data/antiplaquetarios";
import { cores, espacamento, raio } from "@/theme";

export default function TelaAntiplaquetario() {
  const { processarSelecaoAntiplaquetarios } = useQuestionario();
  const [selecionados, setSelecionados] = useState<string[]>([]);

  function alternar(id: string) {
    setSelecionados((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));
  }

  function concluir() {
    const proximo = processarSelecaoAntiplaquetarios(selecionados);
    router.push(
      proximo === "dose_ataque"
        ? "/anticoag/questionario/dose-ataque"
        : "/anticoag/questionario/mais-medicamentos"
    );
  }

  return (
    <View style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.pergunta}>Quais antiplaquetários o paciente usa?</Text>
        <View style={estilos.lista} accessibilityRole="radiogroup">
          {ANTIPLAQUETARIOS.map((a) => {
            const marcado = selecionados.includes(a.id);
            const rotulo = rotuloAntiplaquetario(a);
            return (
              <Pressable
                key={a.id}
                onPress={() => alternar(a.id)}
                style={[estilos.item, marcado && estilos.itemAtivo]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: marcado }}
                accessibilityLabel={rotulo}
              >
                <View style={[estilos.caixa, marcado && estilos.caixaMarcada]}>
                  {marcado && <Text style={estilos.check}>✓</Text>}
                </View>
                <Text style={[estilos.textoItem, marcado && estilos.textoItemAtivo]}>{rotulo}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={estilos.rodapeFixo}>
        <Botao
          titulo={
            selecionados.length > 1 ? `Concluir seleção (${selecionados.length})` : "Concluir seleção"
          }
          onPress={concluir}
          desabilitado={selecionados.length === 0}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
  },
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
    flexDirection: "row",
    alignItems: "center",
    padding: espacamento.md,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    gap: espacamento.sm,
  },
  itemAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: cores.textoSecundario,
    alignItems: "center",
    justifyContent: "center",
  },
  caixaMarcada: {
    borderColor: cores.primaria,
    backgroundColor: cores.primaria,
  },
  check: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: "700",
  },
  textoItem: {
    color: cores.texto,
    fontSize: 15,
    flexShrink: 1,
  },
  textoItemAtivo: {
    color: cores.primariaEscura,
    fontWeight: "700",
  },
  rodapeFixo: {
    padding: espacamento.lg,
    backgroundColor: cores.fundo,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
});
