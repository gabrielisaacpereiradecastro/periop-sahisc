import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { FITOTERAPICOS } from "@/anticoag/data/fitoterapicos";
import { cores, espacamento, raio } from "@/theme";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function TelaFitoterapico() {
  const { respostas, atualizar } = useQuestionario();
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (!termo) return FITOTERAPICOS;
    return FITOTERAPICOS.filter(
      (f) => normalizar(f.nomeGenerico).includes(termo) || normalizar(f.sinonimos).includes(termo)
    );
  }, [busca]);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual fitoterápico o paciente usa?</Text>
      <TextInput
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por nome ou sinônimo..."
        placeholderTextColor={cores.textoSecundario}
        style={estilos.busca}
        accessibilityLabel="Buscar fitoterápico"
      />
      <View style={estilos.lista} accessibilityRole="radiogroup">
        {filtrados.map((f) => {
          const ativo = respostas.fitoterapicoId === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => atualizar({ fitoterapicoId: f.id })}
              style={[estilos.item, ativo && estilos.itemAtivo]}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={f.nomeGenerico}
            >
              <Text style={[estilos.textoItem, ativo && estilos.textoItemAtivo]}>
                {f.nomeGenerico}
              </Text>
              <Text style={estilos.textoSinonimos}>{f.sinonimos}</Text>
            </Pressable>
          );
        })}
      </View>

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/anticoag/resultado")}
        desabilitado={respostas.fitoterapicoId === null}
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
  busca: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm,
    fontSize: 15,
    color: cores.texto,
    backgroundColor: cores.branco,
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
    fontWeight: "600",
  },
  textoItemAtivo: {
    color: cores.primariaEscura,
  },
  textoSinonimos: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: espacamento.xs,
  },
});
