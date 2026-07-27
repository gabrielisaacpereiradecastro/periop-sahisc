import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { cores, espacamento, raio } from "@/theme";
import { dataEhFutura, montarISO } from "@/medperiop/utils/data";

export default function TelaCirurgia() {
  const { respostas, atualizar } = useQuestionario();
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  const dataInvalida = useMemo(() => {
    if (!dia || !mes || !ano) return false;
    return montarISO(Number(dia), Number(mes), Number(ano)) === null;
  }, [dia, mes, ano]);

  function aoMudar(novoDia: string, novoMes: string, novoAno: string) {
    setDia(novoDia);
    setMes(novoMes);
    setAno(novoAno);
    const dataISO =
      novoDia && novoMes && novoAno.length === 4
        ? montarISO(Number(novoDia), Number(novoMes), Number(novoAno))
        : null;
    atualizar({ dataCirurgia: dataISO });
  }

  const dataForaDoIntervalo =
    respostas.dataCirurgia !== null && !dataEhFutura(respostas.dataCirurgia);

  const podeVerResultado = respostas.dataCirurgia !== null && !dataForaDoIntervalo;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>Data prevista da cirurgia</Text>
        <View style={estilos.linhaData}>
          <TextInput
            style={estilos.campoData}
            placeholder="DD"
            accessibilityLabel="Dia da cirurgia"
            keyboardType="number-pad"
            maxLength={2}
            value={dia}
            onChangeText={(v) => aoMudar(v.replace(/\D/g, ""), mes, ano)}
          />
          <Text style={estilos.separador}>/</Text>
          <TextInput
            style={estilos.campoData}
            placeholder="MM"
            accessibilityLabel="Mês da cirurgia"
            keyboardType="number-pad"
            maxLength={2}
            value={mes}
            onChangeText={(v) => aoMudar(dia, v.replace(/\D/g, ""), ano)}
          />
          <Text style={estilos.separador}>/</Text>
          <TextInput
            style={[estilos.campoData, estilos.campoAno]}
            placeholder="AAAA"
            accessibilityLabel="Ano da cirurgia"
            keyboardType="number-pad"
            maxLength={4}
            value={ano}
            onChangeText={(v) => aoMudar(dia, mes, v.replace(/\D/g, ""))}
          />
        </View>
        {dataInvalida && <Text style={estilos.erro}>Data inválida.</Text>}
        {dataForaDoIntervalo && <Text style={estilos.erro}>A data deve estar no futuro.</Text>}
      </Cartao>

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/medperiop/resultado")}
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
  linhaData: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.xs,
  },
  campoData: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 16,
    width: 56,
    textAlign: "center",
    color: cores.texto,
  },
  campoAno: {
    width: 84,
  },
  separador: {
    fontSize: 16,
    color: cores.textoSecundario,
  },
  erro: {
    color: cores.perigo,
    fontSize: 13,
    marginTop: espacamento.sm,
  },
});
