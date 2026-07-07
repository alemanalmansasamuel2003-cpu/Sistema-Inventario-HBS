import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import api from '../services/api';

/**
 * =====================================================
 * PANTALLA: EDITAR PERFIL
 * =====================================================
 *
 * Funcionalidades
 * ✔ Editar nombre.
 * ✔ Editar correo.
 * ✔ Cambiar contraseña.
 * ✔ Mostrar/Ocultar contraseña.
 * ✔ Administrador puede cambiar el rol.
 * ✔ Encargado solamente visualiza su rol.
 * ✔ Actualizar datos del usuario.
 *
 * =====================================================
 */

export default function EditarPerfil() {

  /**
   * =====================================================
   * DATOS RECIBIDOS
   * =====================================================
   *
   * id           -> Usuario que se editará.
   * nombre       -> Nombre actual.
   * correo       -> Correo actual.
   * rol          -> Rol del usuario editado.
   * rolUsuario   -> Rol del usuario que inició sesión.
   *
   * =====================================================
   */

  const {

    id,

    nombre,

    correo,

    rol,

    rolUsuario

  } = useLocalSearchParams();

  /**
   * =====================================================
   * ESTADOS
   * =====================================================
   */

  /**
   * Nombre.
   */

  const [nuevoNombre, setNuevoNombre] =
    useState(
      nombre?.toString() || ''
    );

  /**
   * Correo.
   */

  const [nuevoCorreo, setNuevoCorreo] =
    useState(
      correo?.toString() || ''
    );

  /**
   * Rol.
   */

  const [nuevoRol, setNuevoRol] =
    useState(
      rol?.toString() || ''
    );

  /**
   * Contraseña.
   */

  const [nuevoPassword, setNuevoPassword] =
    useState('');

  /**
   * Mostrar contraseña.
   */

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /**
   * =====================================================
   * MOSTRAR MENSAJES
   * =====================================================
   */

  const mostrarMensaje = (
    titulo: string,
    mensaje: string
  ) => {

    Alert.alert(
      titulo,
      mensaje
    );

  };

  /**
   * =====================================================
   * VALIDAR CORREO
   * =====================================================
   */

  const validarCorreo = (
    email: string
  ) => {

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

  };  /**
   * =====================================================
   * GUARDAR CAMBIOS
   * =====================================================
   */

  const guardarCambios = async () => {

    /**
     * Limpiar espacios.
     */

    const nombreLimpio = nuevoNombre.trim();

    const correoLimpio = nuevoCorreo.trim();

    /**
     * Validar campos obligatorios.
     */

    if (!nombreLimpio || !correoLimpio) {

      mostrarMensaje(
        'Campos incompletos',
        'Debe completar todos los campos.'
      );

      return;

    }

    /**
     * Validar correo.
     */

    if (!validarCorreo(correoLimpio)) {

      mostrarMensaje(
        'Correo inválido',
        'Ingrese un correo válido.'
      );

      return;

    }

    /**
     * Validar contraseña.
     */

    if (
      nuevoPassword !== '' &&
      nuevoPassword.length < 6
    ) {

      mostrarMensaje(
        'Contraseña inválida',
        'Debe contener al menos 6 caracteres.'
      );

      return;

    }

    /**
     * Verificar ID.
     */

    if (!id) {

      mostrarMensaje(
        'Error',
        'No se recibió el identificador del usuario.'
      );

      return;

    }

    /**
     * Si quien inició sesión es Administrador
     * puede modificar el rol.
     *
     * Si es Encargado, se conserva el rol.
     */

    const rolGuardar =
      rolUsuario === 'Administrador'
        ? nuevoRol
        : rol;

    try {

      console.log('========== ACTUALIZAR ==========');

      console.log({

        id,

        nombre: nombreLimpio,

        correo: correoLimpio,

        password: nuevoPassword,

        rol: rolGuardar

      });

      const response = await api.put(

        `/usuarios/${id}`,

        {

          nombre: nombreLimpio,

          correo: correoLimpio,

          password: nuevoPassword,

          rol: rolGuardar

        }

      );

      mostrarMensaje(

        'Éxito',

        response.data.mensaje ||
        'Perfil actualizado correctamente.'

      );

      router.back();

    } catch (error: any) {

      console.log(error.response?.data);

      mostrarMensaje(

        'Error',

        error.response?.data?.mensaje ||
        'No fue posible actualizar el perfil.'

      );

    }

  };

  /**
   * =====================================================
   * INTERFAZ
   * =====================================================
   */

  return (   
     <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

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
        Editar Perfil
      </Text>

      {/* Nombre */}

      <Text style={styles.label}>
        Nombre Completo
      </Text>

      <TextInput
        style={styles.input}
        value={nuevoNombre}
        onChangeText={setNuevoNombre}
        placeholder="Nombre completo"
      />

      {/* Correo */}

      <Text style={styles.label}>
        Correo Electrónico
      </Text>

      <TextInput
        style={styles.input}
        value={nuevoCorreo}
        onChangeText={setNuevoCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
      />

      {/* Contraseña */}

      <Text style={styles.label}>
        Nueva Contraseña
      </Text>

      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Dejar en blanco para conservar la contraseña"
          secureTextEntry={!mostrarPassword}
          value={nuevoPassword}
          onChangeText={setNuevoPassword}
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

      <Text style={styles.label}>
        Rol
      </Text>

      {
        rolUsuario === 'Administrador'

        ? (

          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={nuevoRol}
              onValueChange={(itemValue) =>
                setNuevoRol(itemValue)
              }
              style={styles.picker}
            >

              <Picker.Item
                label="Administrador"
                value="Administrador"
              />

              <Picker.Item
                label="Encargado"
                value="Encargado"
              />

            </Picker>

          </View>

        )

        : (

          <View style={styles.rolContainer}>

            <Text style={styles.rolTexto}>
              {nuevoRol}
            </Text>

          </View>

        )

      }

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

}/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */

const styles = StyleSheet.create({

  /**
   * Contenedor principal
   */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  /**
   * Botón volver
   */
  botonVolver: {
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'flex-start',
    backgroundColor: '#0D6EFD',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  /**
   * Título principal
   */
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D3B66',
    textAlign: 'center',
    marginBottom: 30,
  },

  /**
   * Etiquetas
   */
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D3B66',
    marginBottom: 8,
    marginTop: 10,
  },

  /**
   * Campos de texto
   */
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  /**
   * Contenedor contraseña
   */
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  /**
   * Campo contraseña
   */
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },

  /**
   * Icono mostrar contraseña
   */
  icono: {
    fontSize: 24,
  },

  /**
   * Contenedor Picker
   */
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    marginBottom: 25,
    overflow: 'hidden',
  },

  /**
   * Picker
   */
  picker: {
    width: '100%',
    height: 55,
  },

  /**
   * Contenedor rol de solo lectura
   */
  rolContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  /**
   * Texto del rol
   */
  rolTexto: {
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
  },

  /**
   * Botón guardar
   */
  boton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },

  /**
   * Texto botones
   */
  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

});