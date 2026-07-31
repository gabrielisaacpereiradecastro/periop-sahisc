import React from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { SeletorOpcoes } from "@/components/SeletorOpcoes";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { OpcaoFuncaoRenal } from "@/anticoag/types";
import { cores, espacamento, raio } from "@/theme";

export default function TelaFuncaoRenal() {
  const { respostas, atualizar } = useQuestionario();

  function selecionarOpcao(opcao: OpcaoFuncaoRenal) {
    atualizar({
      funcaoRenalOpcao: opcao,
      crClExata: opcao === "exata" ? respostas.crClExata : null,
    });
  }

  const podeAvancar =
    respostas.funcaoRenalOpcao !== null &&
    (respostas.funcaoRenalOpcao !== "exata" ||
      (respostas.crClExata !== null && respostas.crClExata > 0));

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao>
        <Text style={estilos.pergunta}>
          Qual a função renal do paciente (clearance de creatinina — CrCl)?
        </Text>
        <Text style={estilos.ajuda}>
          Os intervalos de suspensão dos DOACs dependem bastante disso, especialmente para
          dabigatran.
        </Text>

        <SeletorOpcoes
          opcoes={[
            { valor: "exata", rotulo: "Tenho o valor exato" },
            { valor: "normal", rotulo: "Função renal normal" },
            { valor: "reduzida_desconhecida", rotulo: "Reduzida, mas não sei o valor" },
          ]}
          selecionado={respostas.funcaoRenalOpcao}
          onSelecionar={selecionarOpcao}
        />

        {respostas.funcaoRenalOpcao === "exata" && (
          <>
            <Text style={estilos.rotuloCampo}>CrCl (mL/min)</Text>
            <TextInput
              style={estilos.campo}
              placeholder="Ex.: 65"
              accessibilityLabel="Clearance de creatinina em mL por minuto"
              keyboardType="number-pad"
              value={respostas.crClExata !== null ? String(respostas.crClExata) : ""}
              onChangeText={(v) => {
                const numero = v.replace(/\D/g, "");
                atualizar({ crClExata: numero ? Number(numero) : null });
              }}
            />
          </>
        )}

        {respostas.funcaoRenalOpcao === "reduzida_desconhecida" && (
          <Cartao style={estilos.avisoCartao}>
            <Text style={estilos.avisoTexto}>
              Sem o valor exato, o app vai aplicar um intervalo conservador (assumindo
              redução moderada da função renal). Assim que possível, confirme a CrCl real —
              alguns DOACs têm contraindicação abaixo de determinado valor que só pode ser
              descartada com o número exato ou dosagem do fármaco.
            </Text>
          </Cartao>
        )}
      </Cartao>

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
    lineHeight: 21,
  },
  ajuda: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginTop: espacamento.xs,
    marginBottom: espacamento.md,
  },
  rotuloCampo: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.texto,
    marginTop: espacamento.md,
    marginBottom: espacamento.xs,
  },
  campo: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 16,
    color: cores.texto,
    width: 120,
  },
  avisoCartao: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
    marginTop: espacamento.md,
  },
  avisoTexto: {
    color: "#78350F",
    fontSize: 13,
    lineHeight: 19,
  },
});
