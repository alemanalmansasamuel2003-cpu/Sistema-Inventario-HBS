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

/**
 * Pantalla de inicio de sesión.
 * Permite al usuario autenticarse en el sistema
 * mediante el correo electrónico y la contraseña.
 */
export default function LoginScreen() {

  // Hook utilizado para la navegación entre pantallas
  const router = useRouter();

  // Estados para almacenar los datos ingresados por el usuario
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  // Estado para controlar el botón mientras se realiza el login
  const [cargando, setCargando] = useState(false);

  // Estado para mostrar u ocultar la contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);

  /**
   * Función encargada de autenticar al usuario.
   * Verifica que los campos estén completos, envía
   * las credenciales al servidor y redirige a la
   * pantalla principal si el inicio de sesión es exitoso.
   */
  const iniciarSesion = async () => {

    // Validar que todos los campos estén completos
    if (!correo || !password) {
      Alert.alert(
        'Error',
        'Complete todos los campos'
      );
      return;
    }

    try {

      // Activa el estado de carga
      setCargando(true);

      /**
       * Envía las credenciales al servidor
       * para validar el inicio de sesión.
       */
      const response = await api.post('/auth/login', {
        correo,
        password
      });

      // Muestra la respuesta del servidor en consola
      console.log('Respuesta del servidor:', response.data);

      /**
       * Verifica que la autenticación haya sido exitosa.
       */
      if (response.data.success) {

        console.log('Redirigiendo a Inventario...');

        /**
         * Redirige al usuario a la pantalla principal
         * del sistema de inventario enviando la
         * información del usuario autenticado.
         *
         * Se utiliza replace para impedir que el usuario
         * regrese al login mediante el botón Atrás.
         */
        router.replace({
          pathname: '/inventario',
          params: {
            nombre: response.data.usuario.nombre,
            correo: response.data.usuario.correo,
            rol: response.data.usuario.rol
          }
        });

      }

    } catch (error: any) {

      // Muestra el error en consola para depuración
      console.log('Error al iniciar sesión:', error);

      /**
       * Muestra el mensaje de error recibido
       * desde el servidor o uno genérico.
       */
      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'Error al iniciar sesión'
      );

    } finally {

      // Desactiva el estado de carga
      setCargando(false);

    }
  };

  return (

    <View style={styles.container}>

      {/* Título principal de la pantalla */}
      <Animated.Text
        entering={FadeInDown.duration(1000)}
        style={styles.titulo}
      >
        Sistema Inventario
      </Animated.Text>

      {/* Campo para ingresar el correo electrónico */}
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

      {/* Campo para ingresar la contraseña */}
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

          {/* Botón para mostrar u ocultar la contraseña */}
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

      {/* Botón para iniciar sesión */}
      <Animated.View
        entering={BounceIn.delay(800)}
      >

        <TouchableOpacity
          style={styles.boton}
          onPress={iniciarSesion}
          disabled={cargando}
        >

          <Text style={styles.textoBoton}>
            {cargando
              ? 'Ingresando...'
              : 'Iniciar Sesión'}
          </Text>

        </TouchableOpacity>

      </Animated.View>

    </View>
  );
}

/**
 * Estilos utilizados en la pantalla de inicio de sesión.
 */
const styles = StyleSheet.create({

  // Contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#fff'
  },

  // Título principal
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },

  // Campo de texto para el correo
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },

  // Contenedor del campo contraseña
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },

  // Campo de texto de la contraseña
  passwordInput: {
    flex: 1,
    paddingVertical: 15
  },

  // Icono para mostrar u ocultar contraseña
  icono: {
    fontSize: 24
  },

  // Botón de inicio de sesión
  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10
  },

  // Texto mostrado dentro del botón
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});