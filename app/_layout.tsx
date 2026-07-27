import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cores } from "@/theme";

/**
 * Layout raiz do app unificado. Só cuida de `index` (termo de aceite geral) e
 * `categoria` (escolha entre anticoag/glp1/medperiop) — cada sub-app tem seu
 * próprio `_layout.tsx` aninhado (`app/anticoag/_layout.tsx` etc.), com seu
 * próprio Stack e seu próprio `QuestionarioProvider`, então os cabeçalhos e o
 * estado de cada área não se misturam. `headerShown: false` aqui evita
 * cabeçalho duplicado quando entra numa sub-árvore que já tem o seu.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.primaria },
          headerTintColor: cores.branco,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: "PeriOp SAHISC" }} />
        <Stack.Screen name="categoria" options={{ title: "Qual medicamento?" }} />
        <Stack.Screen name="anticoag" options={{ headerShown: false }} />
        <Stack.Screen name="glp1" options={{ headerShown: false }} />
        <Stack.Screen name="medperiop" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
