import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { Checklist } from "@/components/Checklist";
import { useQuestionario } from "@/glp1/state/QuestionarioContext";
import { FATORES_PACIENTE, FATORES_TECNICA_ANESTESICA } from "@/glp1/data/fatoresRisco";
import { MEDICAMENTO_OUTRO_ID } from "@/glp1/data/medicamentos";
import { cores, espacamento } from "@/theme";

export default function TelaSintomasRisco() {
  const { respostas, atualizar } = useQuestionario();

  function alternarFatorPaciente(id: string) {
    const atual = respostas.fatoresPaciente;
    atualizar({
      fatoresPaciente: atual.includes(id)
        ? atual.filter((x) => x !== id)
        : [...atual, id],
    });
  }

  function alternarFatorTecnica(id: string) {
    const atual = respostas.fatoresTecnicaAnestesica;
    atualizar({
      fatoresTecnicaAnestesica: atual.includes(id)
        ? atual.filter((x) => x !== id)
        : [...atual, id],
    });
  }

  const podeAvancar = respostas.sintomasGI !== null;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>
          O paciente tem atualmente algum destes sintomas: náusea, vômito, refluxo,
          sensação de estômago cheio (empachamento), distensão abdominal ou dispepsia?
        </Text>
        <SeletorOpcoes
          opcoes={[
            { valor: "sim", rotulo: "Sim" },
            { valor: "nao", rotulo: "Não" },
          ]}
          selecionado={respostas.sintomasGI}
          onSelecionar={(v) => atualizar({ sintomasGI: v })}
        />
      </Cartao>

      <Text style={estilos.secao}>Fatores de risco adicionais</Text>
      <Text style={estilos.ajuda}>Marque tudo o que se aplica. Se nada se aplicar, deixe em branco.</Text>
      <Checklist
        itens={FATORES_PACIENTE}
        selecionados={respostas.fatoresPaciente}
        onAlternar={alternarFatorPaciente}
      />

      <Text style={estilos.secao}>Sobre a técnica da cirurgia/anestesia</Text>
      <Text style={estilos.ajuda}>
        Se você não souber responder, pode deixar em branco — o anestesiologista vai
        confirmar isso na consulta pré-anestésica.
      </Text>
      <Checklist
        itens={FATORES_TECNICA_ANESTESICA}
        selecionados={respostas.fatoresTecnicaAnestesica}
        onAlternar={alternarFatorTecnica}
      />

      <Botao
        titulo="Próximo"
        onPress={() => router.push("/glp1/questionario/cirurgia")}
        desabilitado={
          respostas.medicamentoId !== MEDICAMENTO_OUTRO_ID && !podeAvancar
        }
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.md,
  },
  pergunta: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.sm,
    lineHeight: 21,
  },
  secao: {
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
    marginTop: espacamento.sm,
  },
  ajuda: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginTop: -espacamento.sm,
  },
});
