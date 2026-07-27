import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { ANTIPLAQUETARIOS, rotuloAntiplaquetario } from "@/anticoag/data/antiplaquetarios";
import { cores, espacamento, raio } from "@/theme";

const PRECISA_DOSE_ATAQUE = ["clopidogrel", "prasugrel", "ticagrelor"];

export default function TelaAntiplaquetario() {
  const { respostas, atualizar } = useQuestionario();
  const precisaDoseAtaque = PRECISA_DOSE_ATAQUE.includes(respostas.antiplaquetarioId ?? "");

  const podeAvancar =
    respostas.antiplaquetarioId !== null &&
    (!precisaDoseAtaque || respostas.doseAtaquePosOp !== null);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual antiplaquetário o paciente usa?</Text>
      <View style={estilos.lista} accessibilityRole="radiogroup">
        {ANTIPLAQUETARIOS.map((a) => {
          const ativo = respostas.antiplaquetarioId === a.id;
          const rotulo = rotuloAntiplaquetario(a);
          return (
            <Pressable
              key={a.id}
              onPress={() =>
                atualizar({
                  antiplaquetarioId: a.id,
                  doseAtaquePosOp: PRECISA_DOSE_ATAQUE.includes(a.id)
                    ? respostas.doseAtaquePosOp
                    : null,
                })
              }
              style={[estilos.item, ativo && estilos.itemAtivo]}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={rotulo}
            >
              <Text style={[estilos.textoItem, ativo && estilos.textoItemAtivo]}>{rotulo}</Text>
            </Pressable>
          );
        })}
      </View>

      {precisaDoseAtaque && (
        <Cartao>
          <Text style={estilos.perguntaCartao}>
            Está prevista uma dose de ataque (loading dose) desse medicamento no
            pós-operatório?
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
      )}

      <Botao
        titulo="Próximo"
        onPress={() => router.push("/anticoag/questionario/procedimento")}
        desabilitado={!podeAvancar}
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
  },
  textoItemAtivo: {
    color: cores.primariaEscura,
    fontWeight: "700",
  },
  perguntaCartao: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.sm,
    lineHeight: 21,
  },
});
