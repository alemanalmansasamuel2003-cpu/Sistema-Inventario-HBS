import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="inventario"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="agregar-producto"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ver-productos"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="buscar-producto"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="reportes"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="perfil"
        options={{
          headerShown: false
        }}
      />

    </Stack>
  );
}