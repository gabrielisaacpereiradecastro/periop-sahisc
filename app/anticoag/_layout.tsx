import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QuestionarioProvider } from "@/anticoag/state/QuestionarioContext";
import { cores } from "@/theme";

export default function RootLayout() {
  return (
    <QuestionarioProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.primaria },
          headerTintColor: cores.branco,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: "AntiCoag PeriOp — SAHISC" }} />
        <Stack.Screen name="questionario/classe" options={{ title: "Classe do medicamento" }} />
        <Stack.Screen
          name="questionario/medicamento"
          options={{ title: "Medicamento" }}
        />
        <Stack.Screen
          name="questionario/heparina"
          options={{ title: "Heparina" }}
        />
        <Stack.Screen
          name="questionario/antiplaquetario"
          options={{ title: "Antiplaquetário" }}
        />
        <Stack.Screen
          name="questionario/funcao-renal"
          options={{ title: "Função renal" }}
        />
        <Stack.Screen
          name="resultado"
          options={{ title: "Recomendação", headerBackVisible: false }}
        />
        <Stack.Screen name="bibliografia" options={{ title: "Bibliografia" }} />
      </Stack>
    </QuestionarioProvider>
  );
}
