import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { SeletorFarmaco } from "@/components/SeletorFarmaco";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { farmacosPorClasse, buscarFarmaco } from "@/medperiop/data/farmacos";
import { espacamento } from "@/theme";

export default function TelaFarmaco() {
  const { respostas, atualizar } = useQuestionario();

  const farmacos = useMemo(
    () => (respostas.classe ? farmacosPorClasse(respostas.classe) : []),
    [respostas.classe]
  );

  function selecionar(id: string) {
    atualizar({ farmacoId: id, indicacaoId: null, condicaoAtendida: null, frequenciaDoseDias: null });
  }

  function avancar() {
    const farmaco = buscarFarmaco(respostas.classe, respostas.farmacoId);
    if (!farmaco) return;

    if (farmaco.indicacoes) {
      router.push("/medperiop/questionario/indicacao");
    } else if (farmaco.condicaoClinica) {
      router.push("/medperiop/questionario/condicao");
    } else if (farmaco.regra?.tipo === "suspender_intervalo_dose") {
      router.push("/medperiop/questionario/frequencia");
    } else {
      router.push("/medperiop/questionario/cirurgia");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <SeletorFarmaco
        farmacos={farmacos}
        selecionadoId={respostas.farmacoId}
        onSelecionar={selecionar}
      />
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.farmacoId} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
});
