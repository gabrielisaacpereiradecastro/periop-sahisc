import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/glp1/state/QuestionarioContext";
import { MEDICAMENTOS, MEDICAMENTO_OUTRO_ID, rotuloMedicamento } from "@/glp1/data/medicamentos";
import { cores, espacamento, raio } from "@/theme";

export default function TelaMedicamento() {
  const { respostas, atualizar } = useQuestionario();

  const podeAvancar =
    respostas.medicamentoId !== null &&
    (respostas.medicamentoId === MEDICAMENTO_OUTRO_ID ||
      (respostas.usoMenosDe12Semanas !== null &&
        respostas.aumentoDoseUltimos3Meses !== null &&
        respostas.usoIrregular !== null));

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual medicamento o paciente utiliza?</Text>
      <View style={estilos.listaMedicamentos} accessibilityRole="radiogroup">
        {MEDICAMENTOS.map((m) => {
          const ativo = respostas.medicamentoId === m.id;
          const rotulo = rotuloMedicamento(m);
          return (
            <Pressable
              key={m.id}
              onPress={() => atualizar({ medicamentoId: m.id })}
              style={[estilos.itemMedicamento, ativo && estilos.itemMedicamentoAtivo]}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={rotulo}
            >
              <Text style={[estilos.textoMedicamento, ativo && estilos.textoMedicamentoAtivo]}>
                {rotulo}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => atualizar({ medicamentoId: MEDICAMENTO_OUTRO_ID })}
          style={[
            estilos.itemMedicamento,
            respostas.medicamentoId === MEDICAMENTO_OUTRO_ID && estilos.itemMedicamentoAtivo,
          ]}
          accessibilityRole="radio"
          accessibilityState={{ selected: respostas.medicamentoId === MEDICAMENTO_OUTRO_ID }}
          accessibilityLabel="Outro ou não sei o nome exato"
        >
          <Text
            style={[
              estilos.textoMedicamento,
              respostas.medicamentoId === MEDICAMENTO_OUTRO_ID && estilos.textoMedicamentoAtivo,
            ]}
          >
            Outro / não sei o nome exato
          </Text>
        </Pressable>
      </View>

      {respostas.medicamentoId && respostas.medicamentoId !== MEDICAMENTO_OUTRO_ID && (
        <>
          <Cartao>
            <Text style={estilos.perguntaCartao}>
              Há quanto tempo o paciente usa esse medicamento?
            </Text>
            <SeletorOpcoes
              opcoes={[
                { valor: "sim", rotulo: "Menos de 12 semanas" },
                { valor: "nao", rotulo: "12 semanas ou mais" },
              ]}
              selecionado={respostas.usoMenosDe12Semanas}
              onSelecionar={(v) => atualizar({ usoMenosDe12Semanas: v })}
            />
          </Cartao>

          <Cartao>
            <Text style={estilos.perguntaCartao}>
              Houve aumento de dose ou início de escalonamento da dose nos últimos 3 meses?
            </Text>
            <SeletorOpcoes
              opcoes={[
                { valor: "sim", rotulo: "Sim" },
                { valor: "nao", rotulo: "Não" },
              ]}
              selecionado={respostas.aumentoDoseUltimos3Meses}
              onSelecionar={(v) => atualizar({ aumentoDoseUltimos3Meses: v })}
            />
          </Cartao>

          <Cartao>
            <Text style={estilos.perguntaCartao}>
              O uso é irregular, sem acompanhamento médico adequado?
            </Text>
            <SeletorOpcoes
              opcoes={[
                { valor: "sim", rotulo: "Sim, uso irregular" },
                { valor: "nao", rotulo: "Não, uso regular e acompanhado" },
              ]}
              selecionado={respostas.usoIrregular}
              onSelecionar={(v) => atualizar({ usoIrregular: v })}
            />
          </Cartao>
        </>
      )}

      {respostas.medicamentoId === MEDICAMENTO_OUTRO_ID && (
        <Cartao style={estilos.avisoCartao}>
          <Text style={estilos.avisoTexto}>
            A Nota SBA C.SBA-01744/2026 não classifica explicitamente esse medicamento por
            tempo de duração. Ao final, você será orientado(a) a consultar diretamente o
            médico anestesiologista responsável.
          </Text>
        </Cartao>
      )}

      <Botao
        titulo="Próximo"
        onPress={() => router.push("/glp1/questionario/sintomas-risco")}
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
    fontSize: 18,
    fontWeight: "700",
    color: cores.texto,
  },
  listaMedicamentos: {
    gap: espacamento.sm,
  },
  itemMedicamento: {
    padding: espacamento.md,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
  },
  itemMedicamentoAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  textoMedicamento: {
    color: cores.texto,
    fontSize: 15,
  },
  textoMedicamentoAtivo: {
    color: cores.primariaEscura,
    fontWeight: "700",
  },
  perguntaCartao: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.sm,
  },
  avisoCartao: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  avisoTexto: {
    color: "#78350F",
    fontSize: 13,
    lineHeight: 19,
  },
});
