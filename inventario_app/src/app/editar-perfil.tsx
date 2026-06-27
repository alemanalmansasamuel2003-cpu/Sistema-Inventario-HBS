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

export default function EditarPerfil() {

  const { nombre, correo, rol } = useLocalSearchParams();

  const [nuevoNombre, setNuevoNombre] = useState(
    nombre?.toString() || ''
  );

  const [nuevoCorreo, setNuevoCorreo] = useState(
    correo?.toString() || ''
  );

  const [nuevaPassword, setNuevaPassword] = useState('');

  const [nuevoRol, setNuevoRol] = useState(
    rol?.toString() || ''
  );

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const guardarCambios = async () => {

    if (!nuevoNombre || !nuevoCorreo || !nuevoRol) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );

      return;
    }

    try {

      const response = await api.put('/usuarios/1', {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        password: nuevaPassword,
        rol: nuevoRol
      });

      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      router.back();

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo actualizar el perfil'
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
        Editar Perfil
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nuevoNombre}
        onChangeText={setNuevoNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={nuevoCorreo}
        onChangeText={setNuevoCorreo}
      />

      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Nueva Contraseña"
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

      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={nuevoRol}
        onChangeText={setNuevoRol}
      />

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