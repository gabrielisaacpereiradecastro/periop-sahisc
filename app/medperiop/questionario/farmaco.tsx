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
import { DOACS } from "@/anticoag/data/doacs";
import { ANTIPLAQUETARIOS } from "@/anticoag/data/antiplaquetarios";
import { cores, espacamento } from "@/theme";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function bate(termo: string, nomes: string[]): boolean {
  return nomes.some((nome) => normalizar(nome).includes(termo));
}

/** HNF/HBPM não têm entradas por medicamento nos dados (o guideline trata
 * por via/dose, não por nome comercial) — só uma lista fixa dos nomes mais
 * usados na prática, pra pelo menos cobrir a busca. */
const HEPARINAS_EXEMPLOS: { nomes: string[]; rotulo: string }[] = [
  { nomes: ["enoxaparina", "clexane"], rotulo: "Enoxaparina (Clexane)" },
  { nomes: ["dalteparina", "fragmin"], rotulo: "Dalteparina (Fragmin)" },
  { nomes: ["tinzaparina", "innohep"], rotulo: "Tinzaparina (Innohep)" },
  { nomes: ["heparina", "liquemine"], rotulo: "Heparina não fracionada" },
];

interface SugestaoAntiCoag {
  nomes: string[];
  categoria: string;
  rota: string;
}

/** DOAC/HNF/HBPM/antiplaquetário vêm da mesma fonte separada que os
 * fitoterápicos (Anticoagulante > ...), então também somem desta busca. */
function buscarSugestaoAntiCoag(termo: string): SugestaoAntiCoag | null {
  const doacsBatidos = DOACS.filter((d) => bate(termo, [d.nomeGenerico, ...d.nomesComerciais]));
  if (doacsBatidos.length > 0) {
    return {
      nomes: doacsBatidos.map((d) => d.nomeGenerico),
      categoria: "anticoagulante oral direto (DOAC)",
      rota: "/anticoag/questionario/medicamento",
    };
  }

  const antiplaquetariosBatidos = ANTIPLAQUETARIOS.filter((a) =>
    bate(termo, [a.nomeGenerico, ...a.nomesComerciais])
  );
  if (antiplaquetariosBatidos.length > 0) {
    return {
      nomes: antiplaquetariosBatidos.map((a) => a.nomeGenerico),
      categoria: "antiplaquetário",
      rota: "/anticoag/questionario/antiplaquetario",
    };
  }

  const heparinaBatida = HEPARINAS_EXEMPLOS.find((h) => bate(termo, h.nomes));
  if (heparinaBatida) {
    return {
      nomes: [heparinaBatida.rotulo],
      categoria: "heparina",
      rota: "/anticoag/questionario/classe",
    };
  }

  return null;
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

  const sugestaoAntiCoag = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (termo.length < 3) return null;
    return buscarSugestaoAntiCoag(termo);
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
    // Se tiver checkbox marcado mas ainda não confirmado, confirma antes de
    // sair da tela — senão a seleção pendente é perdida silenciosamente (o
    // estado `selecionados` é só local). Fármacos simples vão direto pra
    // lista; os que precisam de pergunta extra (indicação/condição/
    // frequência) entram na fila e essa pergunta é respondida antes de
    // seguir pra troca de classe.
    if (selecionados.length === 0) {
      router.replace("/medperiop/questionario/classe");
      return;
    }
    const proximo = processarSelecaoFarmacos(selecionados);
    router.replace(
      proximo === "mais-medicamentos"
        ? "/medperiop/questionario/classe"
        : `/medperiop/questionario/${proximo}`
    );
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
        {sugestaoAntiCoag && (
          <Cartao style={estilos.cartaoSugestao}>
            <Text style={estilos.tituloSugestao}>
              {sugestaoAntiCoag.nomes.join(", ")}{" "}
              {sugestaoAntiCoag.nomes.length > 1 ? "são" : "é"} {sugestaoAntiCoag.categoria}
            </Text>
            <Text style={estilos.textoSugestao}>
              Fica numa categoria separada (Anticoagulantes), com fonte própria — não aparece
              nesta busca. Toque abaixo para avaliar por lá.
            </Text>
            <Botao
              titulo="Ir para Anticoagulantes"
              variante="secundario"
              onPress={() => router.push(sugestaoAntiCoag.rota as never)}
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
