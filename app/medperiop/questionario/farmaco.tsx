import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { SeletorFarmaco } from "@/components/SeletorFarmaco";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { farmacosPorClasse, buscarFarmaco } from "@/medperiop/data/farmacos";
import { espacamento } from "@/theme";

export default function TelaFarmaco() {
  const { respostas, atualizar, confirmarMedicamentoAtual } = useQuestionario();

  const farmacos = useMemo(
    () => (respostas.classeAtual ? farmacosPorClasse(respostas.classeAtual) : []),
    [respostas.classeAtual]
  );

  function selecionar(id: string) {
    atualizar({
      farmacoIdAtual: id,
      indicacaoIdAtual: null,
      condicaoAtendidaAtual: null,
      frequenciaDoseDiasAtual: null,
    });
  }

  function avancar() {
    const farmaco = buscarFarmaco(respostas.classeAtual, respostas.farmacoIdAtual);
    if (!farmaco) return;

    if (farmaco.indicacoes) {
      router.push("/medperiop/questionario/indicacao");
    } else if (farmaco.condicaoClinica) {
      router.push("/medperiop/questionario/condicao");
    } else if (farmaco.regra?.tipo === "suspender_intervalo_dose") {
      router.push("/medperiop/questionario/frequencia");
    } else {
      confirmarMedicamentoAtual();
      router.push("/medperiop/questionario/mais-medicamentos");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <SeletorFarmaco
        farmacos={farmacos}
        selecionadoId={respostas.farmacoIdAtual}
        onSelecionar={selecionar}
      />
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.farmacoIdAtual} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
});
