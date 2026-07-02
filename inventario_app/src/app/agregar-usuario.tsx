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
 * Pantalla para registrar nuevos usuarios en el sistema.
 *
 * Permite:
 * - Ingresar nombre.
 * - Ingresar correo electrónico.
 * - Ingresar contraseña.
 * - Seleccionar el rol del usuario.
 * - Guardar el usuario en la base de datos.
 */
export default function AgregarUsuario() {

  /**
   * Estados para almacenar la información
   * ingresada en el formulario.
   */
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  /**
   * Estado para mostrar u ocultar
   * la contraseña.
   */
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /**
   * Función encargada de registrar
   * un nuevo usuario.
   */
  const guardarUsuario = async () => {

    /**
     * Verifica que todos los campos
     * estén completos.
     */
    if (!nombre || !correo || !password || !rol) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );

      return;
    }

    try {

      /**
       * Envía la información al backend
       * para registrar el usuario.
       */
      const response = await api.post(
        '/auth/register',
        {
          nombre,
          correo,
          password,
          rol
        }
      );

      /**
       * Muestra mensaje de éxito.
       */
      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      /**
       * Limpia los campos del formulario.
       */
      setNombre('');
      setCorreo('');
      setPassword('');
      setRol('');

    } catch (error: any) {

      console.log(error.response?.data);

      /**
       * Muestra el mensaje de error
       * enviado por el servidor.
       */
      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo registrar el usuario'
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      {/* Botón para regresar a la pantalla anterior */}
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
        Agregar Usuario
      </Text>

      {/* Campo para ingresar el nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Campo para ingresar el correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      {/* Campo de contraseña */}
      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!mostrarPassword}
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón para mostrar u ocultar contraseña */}
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

      {/* Selector de roles del usuario */}
      <View style={styles.pickerContainer}>

        <Picker
          style={styles.picker}
          selectedValue={rol}
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

      {/* Botón para guardar el usuario */}
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
 * Estilos de la pantalla.
 */
const styles = StyleSheet.create({

  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  /**
   * Botón para regresar.
   */
  botonVolver: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },

  /**
   * Título principal.
   */
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  /**
   * Estilo general de los campos.
   */
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },

  /**
   * Contenedor del campo contraseña.
   */
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },

  /**
   * Campo de texto de contraseña.
   */
  passwordInput: {
    flex: 1,
    paddingVertical: 15
  },

  /**
   * Icono para mostrar/ocultar contraseña.
   */
  icono: {
    fontSize: 24
  },

  /**
   * Contenedor del selector de roles.
   */
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    height: 55,
    justifyContent: 'center',
    overflow: 'hidden'
  },

  /**
   * Estilo del selector.
   */
  picker: {
    width: '100%',
    height: 55
  },

  /**
   * Botón para guardar el usuario.
   */
  boton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },

  /**
   * Texto utilizado en los botones.
   */
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});