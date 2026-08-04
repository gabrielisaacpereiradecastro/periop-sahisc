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
  const [selecionados, setSelecionados] = useState<string[]>(respostas.fitoterapicoIds);

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (!termo) return FITOTERAPICOS;
    return FITOTERAPICOS.filter(
      (f) => normalizar(f.nomeGenerico).includes(termo) || normalizar(f.sinonimos).includes(termo)
    );
  }, [busca]);

  function alternar(id: string) {
    setSelecionados((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));
  }

  function concluir() {
    atualizar({ fitoterapicoIds: selecionados });
    router.push("/anticoag/resultado");
  }

  return (
    <View style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.pergunta}>Quais fitoterápicos o paciente usa?</Text>
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por nome ou sinônimo..."
          placeholderTextColor={cores.textoSecundario}
          style={estilos.busca}
          accessibilityLabel="Buscar fitoterápico"
        />
        {filtrados.length === 0 && (
          <Text style={estilos.semResultado}>Nenhum fitoterápico encontrado para "{busca}".</Text>
        )}
        <View style={estilos.lista}>
          {filtrados.map((f) => {
            const marcado = selecionados.includes(f.id);
            return (
              <Pressable
                key={f.id}
                onPress={() => alternar(f.id)}
                style={[estilos.item, marcado && estilos.itemAtivo]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: marcado }}
                accessibilityLabel={f.nomeGenerico}
              >
                <View style={[estilos.caixa, marcado && estilos.caixaMarcada]}>
                  {marcado && <Text style={estilos.check}>✓</Text>}
                </View>
                <View style={estilos.itemTexto}>
                  <Text style={[estilos.nomeGenerico, marcado && estilos.textoAtivo]}>
                    {f.nomeGenerico}
                  </Text>
                  <Text style={[estilos.sinonimos, marcado && estilos.textoAtivo]}>{f.sinonimos}</Text>
                </View>
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
  semResultado: {
    fontSize: 14,
    color: cores.textoSecundario,
    fontStyle: "italic",
  },
  lista: {
    gap: espacamento.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    marginTop: 1,
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
  itemTexto: {
    flex: 1,
  },
  nomeGenerico: {
    color: cores.texto,
    fontSize: 15,
    fontWeight: "600",
  },
  sinonimos: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: 2,
  },
  textoAtivo: {
    color: cores.primariaEscura,
  },
  rodapeFixo: {
    padding: espacamento.lg,
    backgroundColor: cores.fundo,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
});
