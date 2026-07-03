/**
 * =====================================================
 * LAYOUT PRINCIPAL DE LA APLICACIÓN
 * =====================================================
 * Este archivo define todas las pantallas
 * disponibles dentro de la aplicación.
 *
 * Se utiliza Expo Router para gestionar
 * la navegación entre pantallas.
 *
 * Todas las pantallas se muestran sin
 * encabezado (header).
 * =====================================================
 */

import { Stack } from 'expo-router';

/**
 * =====================================================
 * COMPONENTE PRINCIPAL DE NAVEGACIÓN
 * =====================================================
 */
export default function RootLayout() {

  return (

    <Stack>

      {/* Pantalla de inicio o login */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />

      {/* Menú principal del inventario */}
      <Stack.Screen
        name="inventario"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para agregar productos */}
      <Stack.Screen
        name="agregar-producto"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para visualizar productos */}
      <Stack.Screen
        name="ver-productos"
        options={{
          headerShown: false
        }}
      />

      {/* =====================================================
          NUEVA PANTALLA PARA EDITAR PRODUCTOS
         ===================================================== */}
      <Stack.Screen
        name="editar-producto"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para buscar productos */}
      <Stack.Screen
        name="buscar-producto"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla de reportes */}
      <Stack.Screen
        name="reportes"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla de perfil */}
      <Stack.Screen
        name="perfil"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para administrar usuarios */}
      <Stack.Screen
        name="usuarios"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para agregar usuarios */}
      <Stack.Screen
        name="agregar-usuario"
        options={{
          headerShown: false
        }}
      />

      {/* Pantalla para editar usuarios */}
      <Stack.Screen
        name="editar-perfil"
        options={{
          headerShown: false
        }}
      />

    </Stack>

  );
}