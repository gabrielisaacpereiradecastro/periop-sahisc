import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { cores, espacamento, raio } from "@/theme";
import { combinarDataHora, dataHoraEhFutura, montarDataISO } from "@/anticoag/utils/data";

export default function TelaProcedimento() {
  const { respostas, atualizar } = useQuestionario();
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [hora, setHora] = useState("");

  const dataInvalida = useMemo(() => {
    if (!dia || !mes || !ano) return false;
    return montarDataISO(Number(dia), Number(mes), Number(ano)) === null;
  }, [dia, mes, ano]);

  function aoMudar(novoDia: string, novoMes: string, novoAno: string, novaHora: string) {
    setDia(novoDia);
    setMes(novoMes);
    setAno(novoAno);
    setHora(novaHora);
    const dataISO =
      novoDia && novoMes && novoAno.length === 4
        ? montarDataISO(Number(novoDia), Number(novoMes), Number(novoAno))
        : null;
    const horaNum = novaHora !== "" ? Number(novaHora) : null;
    atualizar({
      dataProcedimento: dataISO,
      horaProcedimento: horaNum !== null && horaNum <= 23 ? horaNum : null,
    });
  }

  const dataHoraForaDoIntervalo =
    respostas.dataProcedimento !== null &&
    respostas.horaProcedimento !== null &&
    !dataHoraEhFutura(combinarDataHora(respostas.dataProcedimento, respostas.horaProcedimento));

  const podeVerResultado =
    respostas.dataProcedimento !== null &&
    respostas.horaProcedimento !== null &&
    !dataHoraForaDoIntervalo;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>
          Data e horário previstos do procedimento (bloqueio neuraxial ou de plexo
          profundo/periférico)
        </Text>
        <View style={estilos.linhaData}>
          <TextInput
            style={estilos.campoData}
            placeholder="DD"
            accessibilityLabel="Dia do procedimento"
            keyboardType="number-pad"
            maxLength={2}
            value={dia}
            onChangeText={(v) => aoMudar(v.replace(/\D/g, ""), mes, ano, hora)}
          />
          <Text style={estilos.separador}>/</Text>
          <TextInput
            style={estilos.campoData}
            placeholder="MM"
            accessibilityLabel="Mês do procedimento"
            keyboardType="number-pad"
            maxLength={2}
            value={mes}
            onChangeText={(v) => aoMudar(dia, v.replace(/\D/g, ""), ano, hora)}
          />
          <Text style={estilos.separador}>/</Text>
          <TextInput
            style={[estilos.campoData, estilos.campoAno]}
            placeholder="AAAA"
            accessibilityLabel="Ano do procedimento"
            keyboardType="number-pad"
            maxLength={4}
            value={ano}
            onChangeText={(v) => aoMudar(dia, mes, v.replace(/\D/g, ""), hora)}
          />
        </View>

        <View style={estilos.linhaHora}>
          <Text style={estilos.rotuloHora}>Horário aproximado (0-23h)</Text>
          <TextInput
            style={estilos.campoHora}
            placeholder="HH"
            accessibilityLabel="Hora prevista do procedimento, formato 24 horas"
            keyboardType="number-pad"
            maxLength={2}
            value={hora}
            onChangeText={(v) => aoMudar(dia, mes, ano, v.replace(/\D/g, ""))}
          />
          <Text style={estilos.separador}>h</Text>
        </View>
        {dataInvalida && <Text style={estilos.erro}>Data inválida.</Text>}
        {dataHoraForaDoIntervalo && (
          <Text style={estilos.erro}>A data e hora devem estar no futuro.</Text>
        )}
        <Text style={estilos.ajuda}>
          Horário aproximado já ajuda — os intervalos do guideline são em horas, então a
          hora do procedimento muda o resultado.
        </Text>
      </Cartao>

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/anticoag/resultado")}
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
  linhaHora: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.sm,
    marginTop: espacamento.md,
  },
  rotuloHora: {
    fontSize: 14,
    color: cores.texto,
    flexShrink: 1,
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
  campoHora: {
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
  separador: {
    fontSize: 16,
    color: cores.textoSecundario,
  },
  erro: {
    color: cores.perigo,
    fontSize: 13,
    marginTop: espacamento.sm,
  },
  ajuda: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginTop: espacamento.md,
  },
});
