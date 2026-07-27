import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { DOACS, buscarDoac, rotuloDoac } from "@/anticoag/data/doacs";
import { cores, espacamento, raio } from "@/theme";

export default function TelaMedicamento() {
  const { respostas, atualizar } = useQuestionario();
  const doacSelecionado = buscarDoac(respostas.medicamentoId);

  function selecionarMedicamento(id: string) {
    atualizar({ medicamentoId: id, indicacaoId: null });
  }

  const podeAvancar = respostas.medicamentoId !== null && respostas.indicacaoId !== null;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual anticoagulante oral direto (DOAC) o paciente usa?</Text>
      <View style={estilos.lista} accessibilityRole="radiogroup">
        {DOACS.map((d) => {
          const ativo = respostas.medicamentoId === d.id;
          const rotulo = rotuloDoac(d);
          return (
            <Pressable
              key={d.id}
              onPress={() => selecionarMedicamento(d.id)}
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

      {doacSelecionado && (
        <Cartao>
          <Text style={estilos.perguntaCartao}>
            Por que o paciente usa {doacSelecionado.nomeGenerico}? (indicação e dose)
          </Text>
          <View style={estilos.listaIndicacoes} accessibilityRole="radiogroup">
            {doacSelecionado.indicacoes.map((ind) => {
              const ativo = respostas.indicacaoId === ind.id;
              return (
                <Pressable
                  key={ind.id}
                  onPress={() => atualizar({ indicacaoId: ind.id })}
                  style={[estilos.itemIndicacao, ativo && estilos.itemIndicacaoAtivo]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: ativo }}
                  accessibilityLabel={ind.descricao}
                >
                  <Text
                    style={[
                      estilos.textoIndicacao,
                      ativo && estilos.textoIndicacaoAtivo,
                    ]}
                  >
                    {ind.descricao}
                  </Text>
                  <Text style={estilos.textoDose}>{ind.dose}</Text>
                </Pressable>
              );
            })}
          </View>
        </Cartao>
      )}

      <Botao
        titulo="Próximo"
        onPress={() => router.push("/anticoag/questionario/funcao-renal")}
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
  },
  listaIndicacoes: {
    gap: espacamento.sm,
  },
  itemIndicacao: {
    padding: espacamento.md,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
  },
  itemIndicacaoAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  textoIndicacao: {
    color: cores.texto,
    fontSize: 13,
    lineHeight: 19,
  },
  textoIndicacaoAtivo: {
    color: cores.primariaEscura,
    fontWeight: "600",
  },
  textoDose: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: espacamento.xs,
    fontStyle: "italic",
  },
});
