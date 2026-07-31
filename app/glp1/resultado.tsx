import React, { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { useQuestionario } from "@/glp1/state/QuestionarioContext";
import { gerarRecomendacao } from "@/glp1/logic/regras";
import { gerarHtmlResumo } from "@/glp1/logic/resumoPdf";
import { rotuloMedicamento } from "@/glp1/data/medicamentos";
import { cores, espacamento, raio } from "@/theme";

const LIQUIDOS_SEM_RESIDUO = [
  "Água",
  "Café preto (sem leite)",
  "Chá",
  "Água de coco sem resíduos",
  "Sucos coados, sem polpa ou pedaços",
  "Bebidas com carboidratos sem resíduos (glicose, frutose, maltodextrina, soluções de reidratação oral)",
];

export default function TelaResultado() {
  const { respostas, reiniciar } = useQuestionario();
  const recomendacao = useMemo(() => gerarRecomendacao(respostas), [respostas]);
  const [nomePaciente, setNomePaciente] = useState("");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  function refazer() {
    reiniciar();
    router.dismissAll();
    router.replace("/glp1");
  }

  async function baixarPdf() {
    setGerandoPdf(true);
    try {
      const html = gerarHtmlResumo(respostas, recomendacao, nomePaciente);

      if (Platform.OS === "web") {
        // Na web não há "compartilhar" nativo nem geração de arquivo local:
        // abrimos o diálogo de impressão do navegador, de onde a pessoa
        // escolhe "Salvar como PDF" (ou "Salvar em Arquivos", no Safari).
        await Print.printAsync({ html });
        return;
      }

      const { uri } = await Print.printToFileAsync({ html, base64: false });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Resumo GLP-1 perioperatório",
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

  if (recomendacao.decisao === "indeterminado") {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Cartao style={estilos.cartaoPerigo}>
          <Text style={estilos.tituloPerigo}>Não foi possível gerar uma recomendação</Text>
          <Text style={estilos.textoPerigo}>{recomendacao.motivoIndeterminado}</Text>
        </Cartao>
        <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
        <Botao titulo="Ver bibliografia" onPress={() => router.push("/glp1/bibliografia")} />
      </ScrollView>
    );
  }

  const manter = recomendacao.decisao === "manter";

  const estiloCartaoDecisao = manter ? estilos.cartaoSucesso : estilos.cartaoAlerta;
  const estiloTituloDecisao = manter ? estilos.tituloSucesso : estilos.tituloAlerta;
  const tituloDecisao = manter ? "Manter a dose habitual" : "Suspender o medicamento";

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cartao style={estiloCartaoDecisao}>
        <Text style={estiloTituloDecisao}>{tituloDecisao}</Text>
        {recomendacao.medicamento && (
          <Text style={estilos.textoDecisao}>
            Medicamento: {rotuloMedicamento(recomendacao.medicamento)}
          </Text>
        )}
        {manter ? (
          <Text style={estilos.textoDecisao}>
            Uso estável há 12 semanas ou mais, sem sintomas gastrointestinais e sem outros
            fatores de risco identificados, em serviço com disponibilidade de
            ultrassonografia gástrica (POCUS). Pode manter a dose habitual do medicamento.
          </Text>
        ) : (
          <Text style={estilos.textoDecisao}>
            Suspender{" "}
            <Text style={estilos.destaque}>
              {recomendacao.diasSuspensao} dia{recomendacao.diasSuspensao === 1 ? "" : "s"}{" "}
              antes
            </Text>{" "}
            da cirurgia ou procedimento.
          </Text>
        )}
        {!manter && (
          <>
            <Text style={estilos.textoDecisao}>
              {respostas.pocusDisponivel !== "sim"
                ? "Motivo: o serviço não tem disponibilidade confirmada de ultrassonografia gástrica (POCUS) no dia da cirurgia, então a conduta mais segura é suspender o medicamento."
                : "Motivo: foram identificados fatores de risco (veja abaixo) que indicam suspensão do medicamento antes da cirurgia."}
            </Text>
            <View style={estilos.avisoEndocrino}>
              <Text style={estilos.avisoEndocrinoTexto}>
                Envolva a equipe de Endocrinologia para ajuste do tratamento (antidiabético
                ou de controle de peso) durante o período de suspensão, prevenindo
                hiperglicemia.
              </Text>
            </View>
          </>
        )}
      </Cartao>

      {recomendacao.fatoresIdentificados.length > 0 && (
        <Cartao>
          <Text style={estilos.tituloCartao}>Fatores identificados nas suas respostas</Text>
          {recomendacao.fatoresIdentificados.map((f, i) => (
            <Text key={i} style={estilos.itemLista}>
              • {f}
            </Text>
          ))}
        </Cartao>
      )}

      <Cartao>
        <Text style={estilos.tituloCartao}>
          Preparo pré-operatório (vale para todos os pacientes)
        </Text>
        <Text style={estilos.subtituloCartao}>
          Dieta líquida sem resíduos nas 24 horas antes do procedimento:
        </Text>
        {LIQUIDOS_SEM_RESIDUO.map((l, i) => (
          <Text key={i} style={estilos.itemLista}>
            • {l}
          </Text>
        ))}
        <Text style={[estilos.subtituloCartao, { marginTop: espacamento.md }]}>
          Jejum absoluto de 8 a 12 horas antes do procedimento (sem líquidos e sem sólidos).
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.tituloCartao}>No dia da cirurgia</Text>
        <Text style={estilos.textoInformativo}>
          {respostas.pocusDisponivel === "sim"
            ? "A equipe de anestesia pode realizar uma ultrassonografia gástrica (POCUS) para confirmar se o estômago está vazio antes da indução anestésica. Caso seja identificado risco aumentado, a equipe pode adotar medidas adicionais de segurança ou considerar adiar a cirurgia. Essa avaliação é feita pela equipe médica no momento do procedimento e não é calculada por este aplicativo."
            : "Como este serviço não tem disponibilidade confirmada de POCUS gástrico, a equipe de anestesia deve presumir risco aumentado de conteúdo gástrico residual, sem contar com essa confirmação por imagem. A decisão sobre medidas adicionais de segurança ou adiamento é tomada pela equipe médica no momento do procedimento e não é calculada por este aplicativo."}
        </Text>
      </Cartao>

      <Cartao style={estilos.cartaoAlerta}>
        <Text style={estilos.tituloAlerta}>Se o estômago for de alto risco</Text>
        <Text style={[estilos.textoInformativo, { marginBottom: espacamento.sm }]}>
          {respostas.pocusDisponivel === "sim"
            ? "Referência rápida do fluxograma para a equipe, caso o POCUS mostre estômago cheio ou o preparo pré-operatório não tenha sido cumprido. Não é calculado a partir das suas respostas — depende do achado do dia."
            : "Referência rápida do fluxograma para a equipe. Como este serviço não tem POCUS disponível, vale presumir estômago cheio caso haja qualquer suspeita clínica ou o preparo pré-operatório não tenha sido cumprido. Não é calculado a partir das suas respostas — depende da avaliação clínica do dia."}
        </Text>
        <Text style={estilos.subtituloCartao}>Intraoperatório</Text>
        <Text style={estilos.itemLista}>
          • Considerar procinético (eritromicina 3 mg/kg EV, máx. 250 mg, infusão lenta de
          20-30 min, 1-2h antes da indução) e reavaliar
        </Text>
        <Text style={estilos.itemLista}>
          • Intubação em sequência rápida (ISR) com manobra de Sellick
        </Text>
        <Text style={estilos.itemLista}>• Tubo traqueal — evitar máscara laríngea</Text>
        <Text style={estilos.itemLista}>• Cabeceira elevada</Text>
        <Text style={[estilos.subtituloCartao, { marginTop: espacamento.md }]}>
          Pós-operatório imediato (SRPA)
        </Text>
        <Text style={estilos.itemLista}>
          • Extubação acordada, preferencialmente em decúbito lateral
        </Text>
        <Text style={estilos.itemLista}>
          • Manter vigilância para regurgitação, incluindo na sala de recuperação
          pós-anestésica
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.tituloCartao}>Referência da conduta</Text>
        <Text style={estilos.textoInformativo}>
          {manter
            ? "Corresponde à recomendação R9 do consenso SBA/SBD/ABESO 2026."
            : "Corresponde à recomendação R10 do consenso SBA/SBD/ABESO 2026."}{" "}
          Fluxograma completo (Passos 1–5) na Nota SBA C.SBA-01744/2026, de 15/05/2026.
        </Text>
      </Cartao>

      <Cartao style={estilos.cartaoAviso}>
        <Text style={estilos.avisoTexto}>
          Esta recomendação segue exclusivamente o protocolo carregado neste aplicativo e
          não substitui o julgamento do médico anestesiologista responsável, que deve
          avaliar cada caso de forma individualizada e multifatorial.
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.tituloCartao}>Enviar resumo para interessados</Text>
        <Text style={[estilos.textoInformativo, { marginBottom: espacamento.sm }]}>
          Gera um PDF curto, só com o essencial, para enviar ao cirurgião, à equipe de
          endocrinologia ou a quem precisar.
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

      <Botao titulo="Ver bibliografia completa" onPress={() => router.push("/glp1/bibliografia")} />
      <Botao titulo="Refazer questionário" onPress={refazer} variante="secundario" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: espacamento.lg,
    gap: espacamento.lg,
  },
  cartaoSucesso: {
    backgroundColor: cores.sucessoFundo,
    borderColor: cores.sucesso,
  },
  cartaoAlerta: {
    backgroundColor: cores.alertaFundo,
    borderColor: cores.alerta,
  },
  cartaoPerigo: {
    backgroundColor: cores.perigoFundo,
    borderColor: cores.perigo,
  },
  cartaoAviso: {
    backgroundColor: cores.fundo,
  },
  tituloSucesso: {
    fontSize: 20,
    fontWeight: "800",
    color: cores.sucesso,
    marginBottom: espacamento.sm,
  },
  tituloAlerta: {
    fontSize: 20,
    fontWeight: "800",
    color: cores.alerta,
    marginBottom: espacamento.sm,
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
  avisoEndocrino: {
    marginTop: espacamento.md,
    padding: espacamento.sm,
    borderRadius: raio.sm,
    backgroundColor: "rgba(180,83,9,0.12)",
  },
  avisoEndocrinoTexto: {
    fontSize: 13,
    color: "#78350F",
    lineHeight: 19,
  },
  tituloCartao: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.sm,
  },
  subtituloCartao: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  itemLista: {
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 21,
  },
  textoInformativo: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 20,
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
