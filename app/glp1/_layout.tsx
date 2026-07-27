import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QuestionarioProvider } from "@/glp1/state/QuestionarioContext";
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
        <Stack.Screen name="index" options={{ title: "GLP-1 PeriOp — SAHISC" }} />
        <Stack.Screen
          name="questionario/medicamento"
          options={{ title: "Medicamento" }}
        />
        <Stack.Screen
          name="questionario/sintomas-risco"
          options={{ title: "Sintomas e fatores de risco" }}
        />
        <Stack.Screen name="questionario/cirurgia" options={{ title: "Cirurgia" }} />
        <Stack.Screen
          name="resultado"
          options={{ title: "Recomendação", headerBackVisible: false }}
        />
        <Stack.Screen name="bibliografia" options={{ title: "Bibliografia" }} />
      </Stack>
    </QuestionarioProvider>
  );
}
