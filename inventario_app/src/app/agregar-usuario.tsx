import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import api from '../services/api';

/**
 * =====================================================
 * PANTALLA: AGREGAR USUARIO
 * =====================================================
 * Permite registrar nuevos usuarios en el sistema.
 *
 * Validaciones:
 * - Campos obligatorios.
 * - Nombre mínimo de 3 caracteres.
 * - Correo electrónico válido.
 * - Contraseña mínima de 6 caracteres.
 * - Correos duplicados.
 * =====================================================
 */
export default function AgregarUsuario() {

  /**
   * Estados del formulario.
   */
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  /**
   * Mostrar u ocultar contraseña.
   */
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /**
   * =====================================================
   * FUNCIÓN GUARDAR USUARIO
   * =====================================================
   */
  const guardarUsuario = async () => {

    /**
     * Eliminar espacios innecesarios.
     */
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();

    /**
     * Validar campos vacíos.
     */
    if (
      !nombreLimpio ||
      !correoLimpio ||
      !password ||
      !rol
    ) {

      mostrarMensaje(
        'Campos incompletos',
        'Debe completar todos los campos.'
      );

      return;
    }

    /**
     * Validar longitud del nombre.
     */
    if (nombreLimpio.length < 3) {

      mostrarMensaje(
        'Nombre inválido',
        'El nombre debe contener al menos 3 caracteres.'
      );

      return;
    }

    /**
     * Validar correo electrónico.
     */
    const expresionCorreo =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correoLimpio)) {

      mostrarMensaje(
        'Correo inválido',
        'Debe ingresar un correo electrónico válido.'
      );

      return;
    }

    /**
     * Validar contraseña.
     */
    if (password.length < 6) {

      mostrarMensaje(
        'Contraseña inválida',
        'La contraseña debe tener al menos 6 caracteres.'
      );

      return;
    }

    try {

      /**
       * Petición POST al backend.
       */
      const response = await api.post(
        '/auth/register',
        {
          nombre: nombreLimpio,
          correo: correoLimpio,
          password,
          rol
        }
      );

      /**
       * Mostrar mensaje de éxito.
       */
      mostrarMensaje(
        'Usuario registrado',
        response.data.mensaje
      );

      /**
       * Limpiar formulario.
       */
      setNombre('');
      setCorreo('');
      setPassword('');
      setRol('');

    } catch (error: any) {

      console.log(
        'Error completo:',
        error.response?.data
      );

      /**
       * Obtener mensaje del backend.
       */
      const mensaje =
        error.response?.data?.mensaje ||
        'No fue posible registrar el usuario.';

      mostrarMensaje(
        'Error al registrar usuario',
        mensaje
      );
    }
  };

  /**
   * =====================================================
   * FUNCIÓN PARA MOSTRAR MENSAJES
   * =====================================================
   * En Web utiliza window.alert().
   * En móvil utiliza Alert.alert().
   * =====================================================
   */
  const mostrarMensaje = (
    titulo: string,
    mensaje: string
  ) => {

    if (typeof window !== 'undefined') {

      window.alert(`${titulo}\n\n${mensaje}`);

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

      {/* Título */}
      <Text style={styles.titulo}>
        Agregar Usuario
      </Text>

      {/* Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      {/* Contraseña */}
      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!mostrarPassword}
          value={password}
          onChangeText={setPassword}
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

      {/* Roles */}
      <View style={styles.pickerContainer}>

        <Picker
          selectedValue={rol}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setRol(itemValue)
          }
        >

          <Picker.Item
            label="Seleccione un rol"
            value=""
          />

          <Picker.Item
            label="Administrador"
            value="Administrador"
          />

          <Picker.Item
            label="Encargado"
            value="Encargado"
          />

          <Picker.Item
            label="Consulta"
            value="Consulta"
          />

        </Picker>

      </View>

      {/* Botón Guardar */}
      <TouchableOpacity
        style={styles.boton}
        onPress={guardarUsuario}
      >
        <Text style={styles.textoBoton}>
          Guardar Usuario
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
    backgroundColor: '#fff',
    padding: 20
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    height: 55,
    justifyContent: 'center',
    overflow: 'hidden'
  },

  picker: {
    width: '100%',
    height: 55
  },

  boton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});