import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

import Animated, {
  FadeInDown,
  BounceIn
} from 'react-native-reanimated';

import api from '../services/api';

export default function LoginScreen() {

  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // Mostrar/Ocultar contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const iniciarSesion = async () => {

    if (!correo || !password) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    try {

      setCargando(true);

      const response = await api.post('/auth/login', {
        correo,
        password
      });

      console.log(response.data);

      router.push({
        pathname: '/inventario',
        params: {
          nombre: response.data.usuario.nombre,
          correo: response.data.usuario.correo,
          rol: response.data.usuario.rol
        }
      });

    } catch (error: any) {

      console.log(error);

      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'Error al iniciar sesión'
      );

    } finally {

      setCargando(false);

    }
  };

  return (

    <View style={styles.container}>

      <Animated.Text
        entering={FadeInDown.duration(1000)}
        style={styles.titulo}
      >
        Sistema Inventario
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(300).duration(1000)}
      >

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(500).duration(1000)}
      >

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

      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(800)}
      >

        <TouchableOpacity
          style={styles.boton}
          onPress={iniciarSesion}
          disabled={cargando}
        >

          <Text style={styles.textoBoton}>
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </Text>

        </TouchableOpacity>

      </Animated.View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
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
    borderRadius: 10
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});