import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { ClasseMedicamento } from "@/anticoag/types";
import { cores, espacamento, raio } from "@/theme";

const OPCOES: { id: ClasseMedicamento; rotulo: string; descricao: string }[] = [
  {
    id: "doac",
    rotulo: "Anticoagulante oral direto (DOAC)",
    descricao: "Apixaban, edoxaban, rivaroxaban ou dabigatran",
  },
  {
    id: "hnf",
    rotulo: "Heparina não fracionada (HNF)",
    descricao: "Intravenosa ou subcutânea",
  },
  {
    id: "hbpm",
    rotulo: "Heparina de baixo peso molecular (HBPM)",
    descricao: "Ex.: enoxaparina, dalteparina, tinzaparina",
  },
  {
    id: "antiplaquetario",
    rotulo: "Antiplaquetário",
    descricao:
      "AAS/AINEs, clopidogrel, prasugrel, ticagrelor, cilostazol, cangrelor, inibidores IIb/IIIa",
  },
];

export default function TelaClasse() {
  const { respostas, atualizar } = useQuestionario();

  function selecionar(id: ClasseMedicamento) {
    atualizar({ classe: id });
  }

  function avancar() {
    if (respostas.classe === "doac") {
      router.push("/anticoag/questionario/medicamento");
    } else if (respostas.classe === "antiplaquetario") {
      router.push("/anticoag/questionario/antiplaquetario");
    } else {
      router.push("/anticoag/questionario/heparina");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual classe de medicamento o paciente usa?</Text>
      <View style={estilos.lista} accessibilityRole="radiogroup">
        {OPCOES.map((op) => {
          const ativo = respostas.classe === op.id;
          return (
            <Pressable
              key={op.id}
              onPress={() => selecionar(op.id)}
              style={[estilos.item, ativo && estilos.itemAtivo]}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={op.rotulo}
            >
              <Text style={[estilos.textoItem, ativo && estilos.textoItemAtivo]}>
                {op.rotulo}
              </Text>
              <Text style={estilos.textoDescricao}>{op.descricao}</Text>
            </Pressable>
          );
        })}
      </View>

      <Botao titulo="Próximo" onPress={avancar} desabilitado={respostas.classe === null} />
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
    fontWeight: "600",
  },
  textoItemAtivo: {
    color: cores.primariaEscura,
  },
  textoDescricao: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: espacamento.xs,
  },
});
