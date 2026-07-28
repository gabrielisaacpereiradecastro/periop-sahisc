import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/medperiop/state/QuestionarioContext";
import { buscarFarmaco } from "@/medperiop/data/farmacos";
import { cores, espacamento } from "@/theme";

export default function TelaIndicacao() {
  const { respostas, atualizar, confirmarMedicamentoAtual } = useQuestionario();

  const farmaco = useMemo(
    () => buscarFarmaco(respostas.classeAtual, respostas.farmacoIdAtual),
    [respostas.classeAtual, respostas.farmacoIdAtual]
  );

  function selecionar(indicacaoId: string) {
    atualizar({ indicacaoIdAtual: indicacaoId, frequenciaDoseDiasAtual: null });
  }

  function avancar() {
    if (!farmaco?.indicacoes || !respostas.indicacaoIdAtual) return;
    const indicacao = farmaco.indicacoes.find((i) => i.id === respostas.indicacaoIdAtual);
    if (indicacao?.regra.tipo === "suspender_intervalo_dose") {
      router.push("/medperiop/questionario/frequencia");
    } else {
      confirmarMedicamentoAtual();
      router.push("/medperiop/questionario/mais-medicamentos");
    }
  }

  if (!farmaco?.indicacoes) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>
        Para qual indicação o paciente usa {farmaco.nomeGenerico}?
      </Text>
      {farmaco.indicacoes.map((indicacao) => (
        <Cartao
          key={indicacao.id}
          style={respostas.indicacaoIdAtual === indicacao.id ? estilos.cartaoAtivo : undefined}
        >
          <Botao
            titulo={indicacao.descricao}
            variante="secundario"
            onPress={() => selecionar(indicacao.id)}
          />
        </Cartao>
      ))}
      <Botao titulo="Próximo" onPress={avancar} desabilitado={!respostas.indicacaoIdAtual} />
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
  cartaoAtivo: {
    borderColor: cores.primaria,
  },
});
