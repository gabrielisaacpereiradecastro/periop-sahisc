import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QuestionarioProvider } from "@/medperiop/state/QuestionarioContext";
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
        <Stack.Screen name="index" options={{ title: "MedPeriOp — SAHISC" }} />
        <Stack.Screen name="questionario/classe" options={{ title: "Classe do medicamento" }} />
        <Stack.Screen name="questionario/farmaco" options={{ title: "Medicamento" }} />
        <Stack.Screen name="questionario/indicacao" options={{ title: "Indicação de uso" }} />
        <Stack.Screen name="questionario/condicao" options={{ title: "Condição clínica" }} />
        <Stack.Screen name="questionario/frequencia" options={{ title: "Posologia" }} />
        <Stack.Screen name="questionario/cirurgia" options={{ title: "Data da cirurgia" }} />
        <Stack.Screen
          name="resultado"
          options={{ title: "Recomendação", headerBackVisible: false }}
        />
        <Stack.Screen name="bibliografia" options={{ title: "Bibliografia" }} />
      </Stack>
    </QuestionarioProvider>
  );
}
