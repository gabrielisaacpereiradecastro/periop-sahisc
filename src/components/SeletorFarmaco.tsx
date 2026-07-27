import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Farmaco } from "@/medperiop/types";
import { cores, espacamento, raio } from "@/theme";

interface Props {
  farmacos: Farmaco[];
  selecionadoId: string | null;
  onSelecionar: (id: string) => void;
}

/**
 * Lista de fármacos agrupada por subclasse, com busca — diferente do
 * `SeletorOpcoes` (pills), necessário aqui porque algumas classes chegam a
 * ter ~40 fármacos, inviável como grade de botões.
 */
export function SeletorFarmaco({ farmacos, selecionadoId, onSelecionar }: Props) {
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
            const ativo = f.id === selecionadoId;
            return (
              <Pressable
                key={f.id}
                onPress={() => onSelecionar(f.id)}
                style={[estilos.item, ativo && estilos.itemAtivo]}
                accessibilityRole="radio"
                accessibilityState={{ selected: ativo }}
                accessibilityLabel={f.nomeGenerico}
              >
                <Text style={[estilos.nomeGenerico, ativo && estilos.textoAtivo]}>
                  {f.nomeGenerico}
                </Text>
                {f.nomesComerciais.length > 0 && (
                  <Text style={[estilos.nomesComerciais, ativo && estilos.textoAtivo]}>
                    {f.nomesComerciais.join(", ")}
                  </Text>
                )}
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
    padding: espacamento.sm,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    marginBottom: espacamento.xs,
  },
  itemAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
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
