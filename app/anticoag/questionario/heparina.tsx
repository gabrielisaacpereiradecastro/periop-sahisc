import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import {
  EXEMPLOS_HBPM_ALTA,
  EXEMPLOS_HBPM_BAIXA,
  OPCOES_VIA_HNF,
} from "@/anticoag/data/heparinas";
import { ViaHnf } from "@/anticoag/types";
import { cores, espacamento } from "@/theme";

export default function TelaHeparina() {
  const { respostas, atualizar } = useQuestionario();
  const ehHnf = respostas.classe === "hnf";

  const podeAvancar = ehHnf
    ? respostas.viaHnf !== null
    : respostas.doseHbpm !== null &&
      (respostas.doseHbpm === "alta" || respostas.frequenciaHbpm !== null);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      {ehHnf ? (
        <Cartao>
          <Text style={estilos.pergunta}>Qual a via e dose da heparina não fracionada?</Text>
          <SeletorOpcoes
            opcoes={OPCOES_VIA_HNF.map((o) => ({ valor: o.id as ViaHnf, rotulo: o.rotulo }))}
            selecionado={respostas.viaHnf}
            onSelecionar={(v) => atualizar({ viaHnf: v })}
          />
        </Cartao>
      ) : (
        <>
          <Cartao>
            <Text style={estilos.pergunta}>Qual a dose da HBPM?</Text>
            <SeletorOpcoes
              opcoes={[
                { valor: "baixa", rotulo: "Baixa / profilática" },
                { valor: "alta", rotulo: "Alta / terapêutica" },
              ]}
              selecionado={respostas.doseHbpm}
              onSelecionar={(v) =>
                atualizar({ doseHbpm: v, frequenciaHbpm: v === "alta" ? null : respostas.frequenciaHbpm })
              }
            />
            <Text style={estilos.ajuda}>
              {respostas.doseHbpm === "alta" ? EXEMPLOS_HBPM_ALTA : EXEMPLOS_HBPM_BAIXA}
            </Text>
          </Cartao>

          {respostas.doseHbpm === "baixa" && (
            <Cartao>
              <Text style={estilos.pergunta}>Com que frequência é administrada?</Text>
              <SeletorOpcoes
                opcoes={[
                  { valor: "uma_vez_dia", rotulo: "1x ao dia" },
                  { valor: "duas_vezes_dia", rotulo: "2x ao dia" },
                ]}
                selecionado={respostas.frequenciaHbpm}
                onSelecionar={(v) => atualizar({ frequenciaHbpm: v })}
              />
              <Text style={estilos.ajuda}>
                Isso muda o manejo do cateter no pós-operatório.
              </Text>
            </Cartao>
          )}
        </>
      )}

      <Botao
        titulo="Ver recomendação"
        onPress={() => router.push("/anticoag/resultado")}
        desabilitado={!podeAvancar}
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
  ajuda: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginTop: espacamento.sm,
    fontStyle: "italic",
  },
});
