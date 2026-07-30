import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { cores, espacamento } from "@/theme";

export default function TelaMaisMedicamentos() {
  const { respostas, removerMedicamento } = useQuestionario();

  function adicionarOutro() {
    // replace (não push) pra pilha de navegação não crescer sem limite a
    // cada rodada — mantém "voltar" previsível mesmo depois de várias
    // classes adicionadas.
    router.replace("/medperiop/questionario/classe");
  }

  function continuar() {
    router.push("/medperiop/questionario/data");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>
        {respostas.medicamentos.length === 1
          ? "1 medicamento adicionado"
          : `${respostas.medicamentos.length} medicamentos adicionados`}
      </Text>

      {respostas.medicamentos.map((item) => {
        const farmaco = buscarFarmaco(item.classe, item.farmacoId);
        return (
          <Cartao key={item.id} style={estilos.itemLista}>
            <View style={estilos.itemTexto}>
              <Text style={estilos.itemNome}>{farmaco?.nomeGenerico ?? "Medicamento"}</Text>
              <Text style={estilos.itemSubclasse}>{farmaco?.subclasse}</Text>
            </View>
            <Botao
              titulo="Remover"
              variante="secundario"
              onPress={() => removerMedicamento(item.id)}
            />
          </Cartao>
        );
      })}

      <Text style={estilos.perguntaSecundaria}>Deseja adicionar medicamentos de outra classe?</Text>
      <Botao titulo="Sim, adicionar mais" onPress={adicionarOutro} />
      <Botao
        titulo="Não, ver recomendação"
        variante="secundario"
        onPress={continuar}
        desabilitado={respostas.medicamentos.length === 0}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.md,
  },
  pergunta: {
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: espacamento.md,
  },
  itemTexto: {
    flex: 1,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
  },
  itemSubclasse: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginTop: 2,
  },
  perguntaSecundaria: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
    marginTop: espacamento.md,
  },
});
