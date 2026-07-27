import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { Cartao } from "@/components/Cartao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { cores, espacamento, raio } from "@/theme";

export default function TelaFrequencia() {
  const { respostas, atualizar } = useQuestionario();
  const [texto, setTexto] = useState(
    respostas.frequenciaDoseDias !== null ? String(respostas.frequenciaDoseDias) : ""
  );

  const farmaco = useMemo(
    () => buscarFarmaco(respostas.classe, respostas.farmacoId),
    [respostas.farmacoId]
  );

  function alterar(valor: string) {
    const limpo = valor.replace(/\D/g, "");
    setTexto(limpo);
    const numero = limpo ? Number(limpo) : null;
    atualizar({ frequenciaDoseDias: numero });
  }

  function avancar() {
    router.push("/medperiop/questionario/cirurgia");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>
        A cada quantos dias o paciente toma a dose de {farmaco?.nomeGenerico ?? "medicamento"}?
      </Text>
      <Cartao>
        <Text style={estilos.dica}>
          Ex.: dose semanal → 7; a cada 2 semanas → 14; dose mensal → 28. Esse número é
          usado para calcular a data de suspensão, porque o consensus statement recomenda
          suspender por 1 intervalo de dose completo — não um número fixo de dias igual
          para todo mundo.
        </Text>
        <TextInput
          value={texto}
          onChangeText={alterar}
          placeholder="Dias entre doses"
          placeholderTextColor={cores.textoSecundario}
          keyboardType="number-pad"
          style={estilos.input}
          accessibilityLabel="Dias entre doses"
        />
      </Cartao>
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.frequenciaDoseDias} />
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
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm,
    fontSize: 18,
    color: cores.texto,
    backgroundColor: cores.branco,
  },
});
