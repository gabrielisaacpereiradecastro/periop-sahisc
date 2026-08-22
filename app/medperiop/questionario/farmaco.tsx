import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Botao } from "@/components/Botao";
import { Cartao } from "@/components/Cartao";
import { SeletorFarmaco } from "@/components/SeletorFarmaco";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { farmacosPorClasse, TODOS_FARMACOS } from "@/medperiop/data/farmacos";
import { Farmaco, FarmacoPendente } from "@/medperiop/types";
import { FITOTERAPICOS } from "@/anticoag/data/fitoterapicos";
import { cores, espacamento } from "@/theme";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function TelaFarmaco() {
  const { respostas, processarSelecaoFarmacos } = useQuestionario();
  const [selecionados, setSelecionados] = useState<FarmacoPendente[]>([]);
  const [busca, setBusca] = useState("");

  const farmacos = useMemo(() => {
    if (respostas.classeAtual === "todas") return TODOS_FARMACOS;
    if (respostas.classeAtual) return farmacosPorClasse(respostas.classeAtual);
    return [];
  }, [respostas.classeAtual]);

  /** Fitoterápicos (alho, ginkgo, valeriana etc.) vêm de uma fonte e uma
   * tela totalmente separadas (Anticoagulante > Fitoterápico), então não
   * aparecem nesta busca. Se o termo digitado bater com um deles, avisa —
   * senão a pessoa acha que o app "não tem" o medicamento. */
  const fitoterapicosSugeridos = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (termo.length < 3) return [];
    return FITOTERAPICOS.filter(
      (f) => normalizar(f.nomeGenerico).includes(termo) || normalizar(f.sinonimos).includes(termo)
    );
  }, [busca]);

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
    <View style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.container}>
        <SeletorFarmaco
          farmacos={farmacos}
          isSelecionado={estaSelecionado}
          onAlternar={alternar}
          busca={busca}
          onBuscaChange={setBusca}
        />
        {fitoterapicosSugeridos.length > 0 && (
          <Cartao style={estilos.cartaoSugestao}>
            <Text style={estilos.tituloSugestao}>
              {fitoterapicosSugeridos.map((f) => f.nomeGenerico).join(", ")}{" "}
              {fitoterapicosSugeridos.length > 1 ? "são fitoterápicos" : "é fitoterápico"}
            </Text>
            <Text style={estilos.textoSugestao}>
              Fitoterápicos ficam numa categoria separada, com fonte própria — não aparecem
              nesta busca. Toque abaixo para avaliar por lá.
            </Text>
            <Botao
              titulo="Ir para Fitoterápico"
              variante="secundario"
              onPress={() => router.push("/anticoag/questionario/fitoterapico")}
            />
          </Cartao>
        )}
      </ScrollView>
      <View style={estilos.rodapeFixo}>
        <Botao
          titulo={
            selecionados.length > 1
              ? `Concluir seleção (${selecionados.length})`
              : "Concluir seleção"
          }
          onPress={concluir}
          desabilitado={selecionados.length === 0}
        />
        <Botao titulo="Trocar classe" variante="secundario" onPress={trocarClasse} />
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
    paddingBottom: espacamento.lg,
    gap: espacamento.lg,
  },
  rodapeFixo: {
    padding: espacamento.lg,
    gap: espacamento.sm,
    backgroundColor: cores.fundo,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  cartaoSugestao: {
    backgroundColor: cores.primariaClara,
    borderColor: cores.primaria,
    gap: espacamento.sm,
  },
  tituloSugestao: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.primariaEscura,
  },
  textoSugestao: {
    fontSize: 13,
    color: cores.primariaEscura,
    lineHeight: 19,
  },
});
