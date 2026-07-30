import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Farmaco } from "@/medperiop/types";
import { cores, espacamento, raio } from "@/theme";

interface Props {
  farmacos: Farmaco[];
  /** Delega ao chamador decidir se um fármaco está marcado — evita que este
   * componente precise conhecer o formato da chave de seleção (importa
   * porque o mesmo `id` pode existir em mais de uma `classe`, ex.: guanfacina
   * em cardiovascular e em psiquiátrico — a identidade real é classe+id). */
  isSelecionado: (farmaco: Farmaco) => boolean;
  onAlternar: (farmaco: Farmaco) => void;
}

/**
 * Lista de fármacos agrupada por subclasse, com busca e seleção múltipla
 * (checkbox) — diferente do `SeletorOpcoes` (pills, seleção única),
 * necessário aqui porque algumas classes chegam a ter ~40 fármacos
 * (inviável como grade de botões) e o usuário pode marcar vários de uma vez.
 */
export function SeletorFarmaco({ farmacos, isSelecionado, onAlternar }: Props) {
  const [busca, setBusca] = useState("");

  const grupos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtrados = termo
      ? farmacos.filter(
          (f) =>
            f.nomeGenerico.toLowerCase().includes(termo) ||
            f.nomesComerciais.some((n) => n.toLowerCase().includes(termo)) ||
            f.subclasse.toLowerCase().includes(termo)
        )
      : farmacos;

    const mapa = new Map<string, Farmaco[]>();
    for (const f of filtrados) {
      const lista = mapa.get(f.subclasse) ?? [];
      lista.push(f);
      mapa.set(f.subclasse, lista);
    }
    return Array.from(mapa.entries());
  }, [farmacos, busca]);

  return (
    <View style={estilos.container}>
      <TextInput
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por nome genérico, comercial ou subclasse..."
        placeholderTextColor={cores.textoSecundario}
        style={estilos.busca}
        accessibilityLabel="Buscar medicamento"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {grupos.length === 0 && (
        <Text style={estilos.semResultado}>Nenhum medicamento encontrado para "{busca}".</Text>
      )}

      {grupos.map(([subclasse, itens]) => (
        <View key={subclasse} style={estilos.grupo}>
          <Text style={estilos.tituloGrupo}>{subclasse}</Text>
          {itens.map((f) => {
            const marcado = isSelecionado(f);
            return (
              <Pressable
                key={`${f.classe}:${f.id}`}
                onPress={() => onAlternar(f)}
                style={[estilos.item, marcado && estilos.itemAtivo]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: marcado }}
                accessibilityLabel={f.nomeGenerico}
              >
                <View style={[estilos.caixa, marcado && estilos.caixaMarcada]}>
                  {marcado && <Text style={estilos.check}>✓</Text>}
                </View>
                <View style={estilos.itemTexto}>
                  <Text style={[estilos.nomeGenerico, marcado && estilos.textoAtivo]}>
                    {f.nomeGenerico}
                  </Text>
                  {f.nomesComerciais.length > 0 && (
                    <Text style={[estilos.nomesComerciais, marcado && estilos.textoAtivo]}>
                      {f.nomesComerciais.join(", ")}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: espacamento.md,
  },
  busca: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm,
    fontSize: 15,
    color: cores.texto,
    backgroundColor: cores.branco,
  },
  semResultado: {
    fontSize: 14,
    color: cores.textoSecundario,
    fontStyle: "italic",
  },
  grupo: {
    gap: espacamento.xs,
  },
  tituloGrupo: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.textoSecundario,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: espacamento.xs,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: espacamento.sm,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    marginBottom: espacamento.xs,
    gap: espacamento.sm,
  },
  itemAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: cores.textoSecundario,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  caixaMarcada: {
    borderColor: cores.primaria,
    backgroundColor: cores.primaria,
  },
  check: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: "700",
  },
  itemTexto: {
    flex: 1,
  },
  nomeGenerico: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.texto,
  },
  nomesComerciais: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginTop: 2,
  },
  textoAtivo: {
    color: cores.primariaEscura,
  },
});
