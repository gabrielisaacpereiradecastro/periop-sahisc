import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { cores, espacamento, raio } from "@/theme";
import {
  combinarDataHora,
  dataHoraEhFutura,
  formatarDataHoraExtenso,
  montarDataISO,
  somarHoras,
} from "@/anticoag/utils/data";

interface Props {
  horasSuspensao: number | null;
  nivelResidualAceitavel: string | null;
  contraindicado: boolean;
}

/**
 * Calculadora à parte, para o cenário muito comum na prática: o cateter já
 * está instalado (colocado na cirurgia, mantido para analgesia pós-operatória)
 * e o cirurgião iniciou/manteve o anticoagulante no pós-operatório. A pergunta
 * não é "quando suspender antes de um bloqueio futuro", mas "quanto tempo
 * depois da ÚLTIMA DOSE já administrada é seguro retirar o cateter".
 *
 * Usa o mesmo número de horas da suspensão pré-bloqueio (horasSuspensao):
 * o guideline ASRA, nas seções "with the unanticipated administration of
 * [dose] with a neuraxial catheter in situ", recomenda o mesmo intervalo
 * antes de retirar o cateter — verificado para os 4 DOACs (ex.: apixaban
 * dose alta = 72h para suspender antes do bloqueio E 72h se o cateter já
 * estiver instalado e uma dose foi administrada).
 */
export function CalculadoraCateter({
  horasSuspensao,
  nivelResidualAceitavel,
  contraindicado,
}: Props) {
  const [mostrar, setMostrar] = useState(false);
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [hora, setHora] = useState("");

  if (horasSuspensao === null) return null;

  if (horasSuspensao === 0) {
    return (
      <Cartao style={estilos.cartaoSucesso}>
        <Text style={estilos.tituloCartao}>Cateter já instalado?</Text>
        <Text style={estilos.textoInformativo}>
          Este medicamento não exige tempo de espera — o cateter pode ser retirado a
          qualquer momento, independentemente da última dose.
        </Text>
      </Cartao>
    );
  }

  const dataISO =
    dia && mes && ano.length === 4 ? montarDataISO(Number(dia), Number(mes), Number(ano)) : null;
  const horaNum = hora !== "" ? Number(hora) : null;
  const dataHoraUltimaDose =
    dataISO && horaNum !== null && horaNum <= 23 ? combinarDataHora(dataISO, horaNum) : null;
  const dataHoraLiberado = dataHoraUltimaDose
    ? somarHoras(dataHoraUltimaDose, horasSuspensao)
    : null;
  const precisaEsperar = dataHoraLiberado !== null && dataHoraEhFutura(dataHoraLiberado);

  return (
    <Cartao>
      <Text style={estilos.tituloCartao}>Cateter já instalado?</Text>
      <Text style={estilos.textoInformativo}>
        Se o cateter foi colocado na cirurgia e o anticoagulante já foi administrado (ou
        retomado) no pós-operatório, use isto para saber quando é seguro retirar —
        contando {horasSuspensao} horas a partir da última dose (mesmo intervalo exigido
        antes do bloqueio).
      </Text>

      {!mostrar ? (
        <Botao
          titulo="Calcular a partir da última dose"
          variante="secundario"
          onPress={() => setMostrar(true)}
        />
      ) : (
        <>
          <Text style={estilos.rotuloCampo}>Data da última dose administrada</Text>
          <View style={estilos.linhaData}>
            <TextInput
              style={estilos.campoData}
              placeholder="DD"
              accessibilityLabel="Dia da última dose"
              keyboardType="number-pad"
              maxLength={2}
              value={dia}
              onChangeText={(v) => setDia(v.replace(/\D/g, ""))}
            />
            <Text style={estilos.separador}>/</Text>
            <TextInput
              style={estilos.campoData}
              placeholder="MM"
              accessibilityLabel="Mês da última dose"
              keyboardType="number-pad"
              maxLength={2}
              value={mes}
              onChangeText={(v) => setMes(v.replace(/\D/g, ""))}
            />
            <Text style={estilos.separador}>/</Text>
            <TextInput
              style={[estilos.campoData, estilos.campoAno]}
              placeholder="AAAA"
              accessibilityLabel="Ano da última dose"
              keyboardType="number-pad"
              maxLength={4}
              value={ano}
              onChangeText={(v) => setAno(v.replace(/\D/g, ""))}
            />
          </View>
          <View style={estilos.linhaHora}>
            <Text style={estilos.rotuloCampoInline}>Horário (0-23h)</Text>
            <TextInput
              style={estilos.campoHora}
              placeholder="HH"
              accessibilityLabel="Hora da última dose, formato 24 horas"
              keyboardType="number-pad"
              maxLength={2}
              value={hora}
              onChangeText={(v) => setHora(v.replace(/\D/g, ""))}
            />
            <Text style={estilos.separador}>h</Text>
          </View>

          {dataHoraLiberado && (
            <View
              style={[
                estilos.resultadoCaixa,
                precisaEsperar ? estilos.resultadoAguardar : estilos.resultadoLiberado,
              ]}
            >
              {precisaEsperar ? (
                <Text style={estilos.textoAguardar}>
                  Aguarde até {formatarDataHoraExtenso(dataHoraLiberado)} para retirar o
                  cateter com segurança.
                </Text>
              ) : (
                <Text style={estilos.textoLiberado}>
                  Já se passaram {horasSuspensao}h desde a última dose informada — o
                  cateter já pode ser retirado com segurança (desde{" "}
                  {formatarDataHoraExtenso(dataHoraLiberado)}).
                </Text>
              )}
              {nivelResidualAceitavel && (
                <Text style={estilos.textoObs}>
                  Alternativa, se não for possível aguardar: nível residual{" "}
                  {nivelResidualAceitavel}.
                </Text>
              )}
              {contraindicado && (
                <Text style={estilos.textoObs}>
                  Atenção: a função renal informada anteriormente está na faixa em que o
                  guideline sugere não prosseguir sem confirmar o nível plasmático do
                  medicamento.
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </Cartao>
  );
}

const estilos = StyleSheet.create({
  cartaoSucesso: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  tituloCartao: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.sm,
  },
  textoInformativo: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 20,
    marginBottom: espacamento.md,
  },
  rotuloCampo: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  rotuloCampoInline: {
    fontSize: 14,
    color: cores.texto,
  },
  linhaData: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.xs,
  },
  linhaHora: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.sm,
    marginTop: espacamento.md,
  },
  campoData: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 16,
    width: 56,
    textAlign: "center",
    color: cores.texto,
  },
  campoAno: {
    width: 84,
  },
  campoHora: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 16,
    width: 56,
    textAlign: "center",
    color: cores.texto,
  },
  separador: {
    fontSize: 16,
    color: cores.textoSecundario,
  },
  resultadoCaixa: {
    marginTop: espacamento.md,
    padding: espacamento.sm,
    borderRadius: raio.sm,
    borderWidth: 1,
  },
  resultadoAguardar: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  resultadoLiberado: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  textoAguardar: {
    color: "#78350F",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  textoLiberado: {
    color: "#14532D",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  textoObs: {
    color: cores.textoSecundario,
    fontSize: 12,
    lineHeight: 17,
    marginTop: espacamento.xs,
  },
});
