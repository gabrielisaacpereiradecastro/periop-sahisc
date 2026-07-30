import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Cartao } from "@/components/Cartao";
import { Botao } from "@/components/Botao";
import { cores, espacamento } from "@/theme";

interface Categoria {
  rota: string;
  titulo: string;
  descricao: string;
}

const CATEGORIAS: Categoria[] = [
  {
    rota: "/anticoag/questionario/classe",
    titulo: "Anticoagulante / Antiagregante",
    descricao:
      "DOACs, heparina (não fracionada e de baixo peso molecular) e antiplaquetários — suspensão/retomada para bloqueio neuraxial ou de plexo profundo/periférico. Baseado no guideline ASRA Pain Medicine.",
  },
  {
    rota: "/glp1/questionario/medicamento",
    titulo: "Agonista do GLP-1",
    descricao:
      "Liraglutida, semaglutida, dulaglutida e outros — risco de estase gástrica e manejo pré-operatório. Baseado na Nota SBA.",
  },
  {
    rota: "/medperiop/questionario/classe",
    titulo: "Outro medicamento de uso crônico",
    descricao:
      "Cardiovascular, endócrino/diabetes, GI/pulmonar, neurológico, psiquiátrico, reumatológico/HIV (inclui AINEs) e analgésicos. Baseado na série de consensus statements SPAQI.",
  },
];

export default function TelaCategoria() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.pergunta}>Qual medicamento você precisa avaliar?</Text>
      {CATEGORIAS.map((cat) => (
        <Cartao key={cat.rota}>
          <Text style={estilos.tituloCategoria}>{cat.titulo}</Text>
          <Text style={estilos.descricaoCategoria}>{cat.descricao}</Text>
          <Botao
            titulo="Selecionar"
            variante="secundario"
            onPress={() => router.push(cat.rota as never)}
          />
        </Cartao>
      ))}
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
  tituloCategoria: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: espacamento.xs,
  },
  descricaoCategoria: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
    marginBottom: espacamento.md,
  },
});
