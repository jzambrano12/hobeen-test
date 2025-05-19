import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Personajes",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalles del Personaje",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="episode/[episodeId]"
        options={{
          title: "Detalles del Episodio",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
