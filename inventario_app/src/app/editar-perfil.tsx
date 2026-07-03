import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import api from '../services/api';

/**
 * =====================================================
 * PANTALLA: EDITAR PERFIL
 * =====================================================
 * Esta pantalla permite modificar la información
 * de un usuario registrado en el sistema.
 *
 * Funcionalidades:
 * - Editar nombre.
 * - Editar correo.
 * - Cambiar contraseña (opcional).
 * - Editar rol.
 * - Mostrar mensajes amigables.
 * =====================================================
 */
export default function EditarPerfil() {

  /**
   * Obtener los parámetros enviados desde
   * la pantalla usuarios.tsx
   */
  const {
    id,
    nombre,
    correo,
    rol
  } = useLocalSearchParams();

  /**
   * Estados del formulario.
   */
  const [nuevoNombre, setNuevoNombre] = useState(
    nombre?.toString() || ''
  );

  const [nuevoCorreo, setNuevoCorreo] = useState(
    correo?.toString() || ''
  );

  const [nuevaPassword, setNuevaPassword] =
    useState('');

  const [nuevoRol, setNuevoRol] = useState(
    rol?.toString() || ''
  );

  /**
   * Estado para mostrar u ocultar contraseña.
   */
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /**
   * =====================================================
   * GUARDAR CAMBIOS
   * =====================================================
   * Actualiza la información del usuario.
   * =====================================================
   */
  const guardarCambios = async () => {

    /**
     * Eliminar espacios innecesarios.
     */
    const nombreLimpio = nuevoNombre.trim();
    const correoLimpio = nuevoCorreo.trim();

    /**
     * Validar campos obligatorios.
     */
    if (
      !nombreLimpio ||
      !correoLimpio ||
      !nuevoRol
    ) {

      mostrarMensaje(
        'Campos incompletos',
        'Todos los campos son obligatorios.'
      );

      return;
    }

    /**
     * Validar longitud mínima del nombre.
     */
    if (nombreLimpio.length < 3) {

      mostrarMensaje(
        'Nombre inválido',
        'El nombre debe contener al menos 3 caracteres.'
      );

      return;
    }

    /**
     * Validar formato del correo.
     */
    const expresionCorreo =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !expresionCorreo.test(correoLimpio)
    ) {

      mostrarMensaje(
        'Correo inválido',
        'Debe ingresar un correo electrónico válido.'
      );

      return;
    }

    /**
     * Validar contraseña únicamente
     * si el usuario ingresó una nueva.
     */
    if (
      nuevaPassword &&
      nuevaPassword.length < 6
    ) {

      mostrarMensaje(
        'Contraseña inválida',
        'La contraseña debe contener al menos 6 caracteres.'
      );

      return;
    }

    try {

      /**
       * Petición PUT al backend.
       */
      const response = await api.put(
        `/usuarios/${id}`,
        {
          nombre: nombreLimpio,
          correo: correoLimpio,
          password: nuevaPassword,
          rol: nuevoRol
        }
      );

      /**
       * Mostrar mensaje de éxito.
       */
      mostrarMensaje(
        'Éxito',
        response.data.mensaje ||
        'Los cambios se guardaron correctamente.'
      );

      /**
       * Regresar a la pantalla anterior.
       */
      router.back();

    } catch (error: any) {

      console.log(
        'Error:',
        error.response?.data
      );

      mostrarMensaje(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo actualizar el perfil.'
      );
    }
  };

  /**
   * =====================================================
   * MOSTRAR MENSAJES
   * =====================================================
   * En Web utiliza window.alert.
   * En Android/iOS utiliza Alert.alert.
   * =====================================================
   */
  const mostrarMensaje = (
    titulo: string,
    mensaje: string
  ) => {

    if (typeof window !== 'undefined') {

      window.alert(
        `${titulo}\n\n${mensaje}`
      );

    } else {

      Alert.alert(
        titulo,
        mensaje
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      {/* Botón volver */}
      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      {/* Título principal */}
      <Text style={styles.titulo}>
        Editar Perfil
      </Text>

      {/* Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nuevoNombre}
        onChangeText={setNuevoNombre}
      />

      {/* Correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={nuevoCorreo}
        onChangeText={setNuevoCorreo}
      />

      {/* Contraseña */}
      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Nueva Contraseña (Opcional)"
          secureTextEntry={!mostrarPassword}
          value={nuevaPassword}
          onChangeText={setNuevaPassword}
        />

        <TouchableOpacity
          onPress={() =>
            setMostrarPassword(!mostrarPassword)
          }
        >
          <Text style={styles.icono}>
            {mostrarPassword ? '🙈' : '👁️'}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Rol */}
      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={nuevoRol}
        onChangeText={setNuevoRol}
      />

      {/* Botón guardar */}
      <TouchableOpacity
        style={styles.boton}
        onPress={guardarCambios}
      >
        <Text style={styles.textoBoton}>
          Guardar Cambios
        </Text>
      </TouchableOpacity>

    </ScrollView>

  );
}

/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 15
  },

  icono: {
    fontSize: 24
  },

  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30
  },

  botonVolver: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});