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

import api from '../services/api';

export default function AgregarUsuario() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  // Mostrar/Ocultar contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const guardarUsuario = async () => {

    if (!nombre || !correo || !password || !rol) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );
      return;
    }

    try {

      const response = await api.post('/auth/register', {
        nombre,
        correo,
        password,
        rol
      });

      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setPassword('');
      setRol('');

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo registrar el usuario'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Agregar Usuario
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={rol}
        onChangeText={setRol}
      />

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

  boton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});