import React, { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/anticoag/state/QuestionarioContext";
import { gerarRecomendacoesAntiCoag } from "@/anticoag/logic/regrasConsolidado";
import { gerarHtmlResumoConsolidado } from "@/anticoag/logic/resumoPdf";
import { CalculadoraCateter } from "@/anticoag/components/CalculadoraCateter";
import { Recomendacao } from "@/anticoag/types";
import { horasComDias } from "@/anticoag/utils/formato";
import { cores, espacamento, raio } from "@/theme";

const ORIGEM_CRCL_TEXTO: Record<string, string> = {
  exata: "valor informado",
  normal: "estimativa para função renal normal (não é o valor real do paciente)",
  reduzida_desconhecida:
    "estimativa conservadora para função renal reduzida (não é o valor real do paciente)",
};

function CartaoDecisao({ recomendacao }: { recomendacao: Recomendacao }) {
  if (recomendacao.decisao === "indeterminado") {
    return (
      <Cartao style={estilos.cartaoPerigo}>
        <Text style={estilos.tituloPerigo}>Não foi possível gerar uma recomendação</Text>
        <Text style={estilos.textoPerigo}>{recomendacao.motivoIndeterminado}</Text>
      </Cartao>
    );
  }

  if (recomendacao.classe === "fitoterapico") {
    const individualizado = recomendacao.diasSuspensao == null && !!recomendacao.motivoIndividualizado;
    return (
      <Cartao style={estilos.cartaoMedicamento}>
        <Text style={estilos.tituloCartao}>{recomendacao.medicamentoNome}</Text>
        {recomendacao.detalhe && <Text style={estilos.textoInformativo}>{recomendacao.detalhe}</Text>}

        {individualizado ? (
          <View style={[estilos.subCartao, estilos.subCartaoIndividualizado]}>
            <Text style={estilos.tituloIndividualizado}>Decisão individualizada</Text>
            <Text style={estilos.textoIndividualizado}>{recomendacao.motivoIndividualizado}</Text>
          </View>
        ) : (
          <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
            <Text style={estilos.tituloAlerta}>Suspender antes da cirurgia</Text>
            <Text style={estilos.textoDecisao}>
              Suspender <Text style={estilos.destaque}>{recomendacao.diasSuspensao} dias antes</Text> de
              cirurgia eletiva.
            </Text>
          </View>
        )}

        {recomendacao.racional && (
          <View style={estilos.blocoTexto}>
            <Text style={estilos.subtituloBloco}>Racional</Text>
            <Text style={estilos.textoInformativo}>{recomendacao.racional}</Text>
          </View>
        )}

        {recomendacao.situacoesEspeciais && (
          <View style={[estilos.blocoTexto, estilos.blocoAtencao]}>
            <Text style={estilos.tituloAtencao}>Interações e recomendação completa</Text>
            <Text style={estilos.textoAtencao}>{recomendacao.situacoesEspeciais}</Text>
          </View>
        )}

        <Text style={estilos.fonteFito}>
          Fonte: Elvir Lazo OL, White PF, et al. J Clin Anesth. 2024;95:111473 — risco de
          sangramento cirúrgico geral, não específico de bloqueio neuraxial.
        </Text>
      </Cartao>
    );
  }

  return (
    <Cartao style={estilos.cartaoMedicamento}>
      <Text style={estilos.tituloCartao}>{recomendacao.medicamentoNome}</Text>
      {recomendacao.detalhe && <Text style={estilos.textoInformativo}>{recomendacao.detalhe}</Text>}
      {recomendacao.crClUsada !== null && recomendacao.crClOrigem && (
        <Text style={estilos.textoInformativo}>
          CrCl usada no cálculo: {recomendacao.crClUsada} mL/min (
          {ORIGEM_CRCL_TEXTO[recomendacao.crClOrigem]})
        </Text>
      )}

      {recomendacao.contraindicado && (
        <View style={[estilos.subCartao, estilos.subCartaoPerigo]}>
          <Text style={estilos.tituloPerigo}>⚠️ Bloqueio não recomendado nessa função renal</Text>
          <Text style={estilos.textoPerigo}>
            O guideline sugere não realizar o bloqueio neuraxial ou de plexo profundo/periférico
            nessa faixa de função renal, a menos que um nível plasmático do medicamento seja
            dosado e esteja {recomendacao.nivelResidualAceitavel}.
          </Text>
        </View>
      )}

      {recomendacao.semRestricao ? (
        <View style={[estilos.subCartao, estilos.subCartaoSucesso]}>
          <Text style={estilos.tituloSucesso}>Não é necessário suspender</Text>
          <Text style={estilos.textoDecisao}>
            O guideline não identifica risco adicional relevante de sangramento com este
            medicamento, e não restringe a técnica (dose única ou cateter), a monitorização, ou
            o momento de retirada do cateter.
          </Text>
        </View>
      ) : (
        <View style={[estilos.subCartao, estilos.subCartaoAlerta]}>
          <Text style={estilos.tituloAlerta}>Suspender antes do procedimento</Text>
          <Text style={estilos.textoDecisao}>
            Não usar o medicamento nas{" "}
            <Text style={estilos.destaque}>
              {recomendacao.horasSuspensao !== null ? horasComDias(recomendacao.horasSuspensao) : "—"}
            </Text>{" "}
            antes do bloqueio (agulha ou colocação de cateter).
          </Text>
          {recomendacao.nivelResidualAceitavel && (
            <Text style={estilos.textoDecisao}>
              Nível residual aceitável, se o tempo não puder ser cumprido:{" "}
              {recomendacao.nivelResidualAceitavel}.
            </Text>
          )}
        </View>
      )}

      {!recomendacao.semRestricao && (
        <View style={estilos.blocoTexto}>
          <Text style={estilos.subtituloBloco}>Retomar após o procedimento</Text>
          {recomendacao.horasAteRetomar !== null ? (
            <Text style={estilos.textoInformativo}>
              Aguarde pelo menos{" "}
              <Text style={estilos.destaque}>{horasComDias(recomendacao.horasAteRetomar)}</Text> após
              a colocação da agulha (bloqueio único) — ou, no caso de cateter, após a{" "}
              <Text style={estilos.destaque}>retirada do cateter</Text> — antes da próxima dose do
              medicamento.
            </Text>
          ) : (
            <Text style={estilos.textoInformativo}>
              O guideline não define um número fixo de horas para retomada — veja a observação
              abaixo.
            </Text>
          )}
          {recomendacao.observacaoRetomada && (
            <Text style={[estilos.textoInformativo, { marginTop: espacamento.sm }]}>
              {recomendacao.observacaoRetomada}
            </Text>
          )}
        </View>
      )}

      <CalculadoraCateter
        horasSuspensao={recomendacao.horasSuspensao}
        nivelResidualAceitavel={recomendacao.nivelResidualAceitavel}
        contraindicado={recomendacao.contraindicado}
      />
    </Cartao>
  );
}

export default function TelaResultado() {
  const { respostas, reiniciar } = useQuestionario();
  const recomendacoes = useMemo(() => gerarRecomendacoesAntiCoag(respostas), [respostas]);
  const [nomePaciente, setNomePaciente] = useState("");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  function refazer() {
    reiniciar();
    router.dismissAll();
    router.replace("/anticoag");
  }

  async function baixarPdf() {
    setGerandoPdf(true);
    try {
      const html = gerarHtmlResumoConsolidado(recomendacoes, nomePaciente);

      if (Platform.OS === "web") {
        await Print.printAsync({ html });
        return;
      }

      const { uri } = await Print.printToFileAsync({ html, base64: false });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Resumo AntiCoag perioperatório",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("PDF gerado", `Arquivo salvo em: ${uri}`);
      }
    } catch {
      Alert.alert(
        "Não foi possível gerar o PDF",
        "Tente novamente. Se o problema continuar, feche e reabra o aplicativo."
      );
    } finally {
      setGerandoPdf(false);
    }
  }

  if (recomendacoes.length === 0) {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>Nenhum medicamento adicionado</Text>
          <Text style={estilos.textoPerigo}>
            Volte e adicione ao menos um medicamento antes de ver a recomendação.
          </Text>
        </Cartao>
        <Botao titulo="Voltar" onPress={() => router.back()} variante="secundario" />
        <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estilos.cartaoInfo}>
        <Text style={estilos.tituloCartao}>Resumo do caso</Text>
        <Text style={estilos.textoDecisao}>
          {recomendacoes.length} medicamento{recomendacoes.length !== 1 ? "s" : ""} avaliado
          {recomendacoes.length !== 1 ? "s" : ""}
        </Text>
      </Cartao>

      {recomendacoes.map((recomendacao, i) => (
        <CartaoDecisao key={respostas.medicamentos[i]?.id ?? i} recomendacao={recomendacao} />
      ))}

      <Cartao style={estilos.cartaoAviso}>
        <Text style={estilos.avisoTexto}>
          As recomendações de DOAC, heparina e antiplaquetários seguem exclusivamente o
          guideline ASRA Pain Medicine (5ª edição, 2025). As de fitoterápicos seguem uma fonte
          separada (ver cada cartão) sobre risco de sangramento cirúrgico geral, não específico
          de bloqueio neuraxial. Nada aqui substitui o julgamento do médico anestesiologista
          responsável, que deve avaliar cada caso de forma individualizada.
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.tituloCartao}>Enviar resumo para interessados</Text>
        <Text style={[estilos.textoInformativo, { marginBottom: espacamento.sm }]}>
          Gera um PDF curto, só com o essencial, para enviar ao cirurgião, ao paciente ou a quem
          precisar.
        </Text>
        <TextInput
          style={estilos.campoNome}
          placeholder="Nome do paciente (opcional)"
          accessibilityLabel="Nome do paciente, opcional"
          value={nomePaciente}
          onChangeText={setNomePaciente}
        />
        <Botao
          titulo={gerandoPdf ? "Gerando PDF…" : "Baixar PDF resumo"}
          onPress={baixarPdf}
          desabilitado={gerandoPdf}
        />
        {Platform.OS === "web" && (
          <Text style={[estilos.textoInformativo, { marginTop: espacamento.sm }]}>
            Vai abrir o diálogo de impressão do navegador — escolha "Salvar como PDF".
          </Text>
        )}
      </Cartao>

      <Botao titulo="Ver bibliografia completa" onPress={() => router.push("/anticoag/bibliografia")} />
      <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  cartaoInfo: {
    backgroundColor: cores.fundoCartao,
  },
  cartaoMedicamento: {
    gap: 0,
  },
  cartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
  },
  cartaoAviso: {
    backgroundColor: cores.fundo,
  },
  subCartao: {
    marginTop: espacamento.md,
    padding: espacamento.md,
    borderRadius: raio.md,
    borderWidth: 1,
  },
  subCartaoSucesso: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  tituloSucesso: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.sucesso,
    marginBottom: espacamento.xs,
  },
  subCartaoAlerta: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  subCartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
  },
  subCartaoIndividualizado: {
    backgroundColor: "#F3F4F6",
    borderColor: cores.textoSecundario,
  },
  tituloIndividualizado: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.textoSecundario,
    marginBottom: espacamento.xs,
  },
  textoIndividualizado: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 20,
  },
  blocoTexto: {
    marginTop: espacamento.md,
  },
  blocoAtencao: {
    padding: espacamento.md,
    borderRadius: raio.md,
    borderWidth: 1,
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  subtituloBloco: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  tituloAtencao: {
    fontSize: 13,
    fontWeight: "700",
    color: "#78350F",
    marginBottom: espacamento.xs,
  },
  textoAtencao: {
    fontSize: 13,
    color: "#78350F",
    lineHeight: 19,
  },
  tituloAlerta: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.alerta,
    marginBottom: espacamento.xs,
  },
  tituloPerigo: {
    fontSize: 18,
    fontWeight: "800",
    color: cores.perigo,
    marginBottom: espacamento.sm,
  },
  textoPerigo: {
    color: "#7F1D1D",
    fontSize: 14,
    lineHeight: 20,
    marginTop: espacamento.xs,
  },
  textoDecisao: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 21,
    marginTop: espacamento.xs,
  },
  destaque: {
    fontWeight: "800",
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
    marginTop: espacamento.xs,
  },
  fonteFito: {
    fontSize: 11,
    color: cores.textoSecundario,
    lineHeight: 16,
    fontStyle: "italic",
    marginTop: espacamento.md,
  },
  avisoTexto: {
    fontSize: 12,
    color: cores.textoSecundario,
    lineHeight: 18,
    fontStyle: "italic",
  },
  campoNome: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingVertical: espacamento.sm,
    paddingHorizontal: espacamento.md,
    fontSize: 15,
    color: cores.texto,
    marginBottom: espacamento.md,
  },
});
