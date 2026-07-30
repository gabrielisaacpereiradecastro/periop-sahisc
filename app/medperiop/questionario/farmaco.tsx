import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { SeletorFarmaco } from "@/components/SeletorFarmaco";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { farmacosPorClasse, TODOS_FARMACOS } from "@/medperiop/data/farmacos";
import { Farmaco, FarmacoPendente } from "@/medperiop/types";
import { espacamento } from "@/theme";

export default function TelaFarmaco() {
  const { respostas, processarSelecaoFarmacos } = useQuestionario();
  const [selecionados, setSelecionados] = useState<FarmacoPendente[]>([]);

  const farmacos = useMemo(() => {
    if (respostas.classeAtual === "todas") return TODOS_FARMACOS;
    if (respostas.classeAtual) return farmacosPorClasse(respostas.classeAtual);
    return [];
  }, [respostas.classeAtual]);

  function estaSelecionado(farmaco: Farmaco) {
    return selecionados.some((s) => s.classe === farmaco.classe && s.farmacoId === farmaco.id);
  }

  function alternar(farmaco: Farmaco) {
    setSelecionados((atual) =>
      estaSelecionado(farmaco)
        ? atual.filter((s) => !(s.classe === farmaco.classe && s.farmacoId === farmaco.id))
        : [...atual, { classe: farmaco.classe, farmacoId: farmaco.id }]
    );
  }

  function concluir() {
    const proximo = processarSelecaoFarmacos(selecionados);
    router.push(`/medperiop/questionario/${proximo}`);
  }

  function trocarClasse() {
    router.replace("/medperiop/questionario/classe");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <SeletorFarmaco farmacos={farmacos} isSelecionado={estaSelecionado} onAlternar={alternar} />
      <Botao
        titulo={
          selecionados.length > 1 ? `Concluir seleção (${selecionados.length})` : "Concluir seleção"
        }
        onPress={concluir}
        desabilitado={selecionados.length === 0}
      />
      <Botao titulo="Trocar classe" variante="secundario" onPress={trocarClasse} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
});
