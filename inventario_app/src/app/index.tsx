import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

import api from '../services/api';

import logoHBS from '../../assets/images/logo-hbs.jpg';

/**
 * ============================================================
 * LOGIN DEL SISTEMA
 * ============================================================
 *
 * Permite autenticar un usuario dentro del
 * Sistema de Inventario del Hogar El Buen Samaritano.
 *
 * Funcionalidades:
 *
 * ✔ Validación de campos.
 * ✔ Inicio de sesión.
 * ✔ Consumo de la API.
 * ✔ Mostrar mensajes.
 * ✔ Envío del ID, nombre, correo y rol
 *   a la pantalla principal.
 *
 * ============================================================
 */

export default function LoginScreen() {

  /**
   * ============================================================
   * ROUTER
   * ============================================================
   */

  const router = useRouter();

  /**
   * ============================================================
   * ESTADOS
   * ============================================================
   */

  const [correo, setCorreo] = useState('');

  const [password, setPassword] = useState('');

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  /**
   * ============================================================
   * MOSTRAR MENSAJES
   * ============================================================
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
   * ============================================================
   * INICIAR SESIÓN
   * ============================================================
   */

  const iniciarSesion = async () => {

    /**
     * Eliminar espacios en blanco.
     */

    const email = correo.trim();

    /**
     * Validar campos obligatorios.
     */

    if (

      !email ||

      !password

    ) {

      mostrarMensaje(

        'Campos incompletos',

        'Debe ingresar el correo y la contraseña.'

      );

      return;

    }

    try {

      setLoading(true);

      /**
       * Consumir API.
       */

      const response = await api.post(

        '/auth/login',

        {

          correo: email,

          password

        }

      );

      /**
       * Si el login fue exitoso.
       */

      if (response.data.success) {

        /**
         * Información del usuario.
         */

        const usuario =
          response.data.usuario;

        /**
         * Mostrar datos en consola.
         */

        console.log('========== LOGIN ==========');

        console.log(usuario);

        /**
         * Navegar al menú principal.
         */

        router.replace({

          pathname: '/inventario',

          params: {

            /**
             * Identificador del usuario.
             */

            id: String(usuario.id_usuario),

            /**
             * Nombre completo.
             */

            nombre: String(usuario.nombre),

            /**
             * Correo electrónico.
             */

            correo: String(usuario.correo),

            /**
             * Rol.
             */

            rol: String(usuario.rol)

          }

        });

      }

    } catch (error: any) {

      mostrarMensaje(

        'Error',

        error.response?.data?.mensaje ??

        'No fue posible iniciar sesión.'

      );

    } finally {

      setLoading(false);

    }

  };

  /**
   * ============================================================
   * INTERFAZ
   * ============================================================
   */

  return (
        <View style={styles.container}>

      <Animated.View
        entering={FadeInUp.duration(700)}
        style={styles.card}
      >

        {/* ============================================================ */}
        {/* LOGO */}
        {/* ============================================================ */}

        <Image
          source={logoHBS}
          style={styles.logo}
        />

        {/* ============================================================ */}
        {/* ICONO */}
        {/* ============================================================ */}

        <Text style={styles.lock}>
          🔒
        </Text>

        {/* ============================================================ */}
        {/* TÍTULO */}
        {/* ============================================================ */}

        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.title}
        >
          Iniciar Sesión
        </Animated.Text>

        {/* ============================================================ */}
        {/* CORREO */}
        {/* ============================================================ */}

        <Text style={styles.label}>
          Correo electrónico
        </Text>

        <TextInput
          style={styles.input}
          placeholder="correo@hogar.org"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        {/* ============================================================ */}
        {/* CONTRASEÑA */}
        {/* ============================================================ */}

        <Text style={styles.label}>
          Contraseña
        </Text>

        <View style={styles.passwordContainer}>

          <TextInput
            style={styles.passwordInput}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!mostrarPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setMostrarPassword(!mostrarPassword)
            }
          >

            <Text style={styles.eye}>
              {mostrarPassword ? '🙈' : '👁️'}
            </Text>

          </TouchableOpacity>

        </View>

        {/* ============================================================ */}
        {/* BOTÓN INICIAR SESIÓN */}
        {/* ============================================================ */}

        <TouchableOpacity
          style={styles.button}
          onPress={iniciarSesion}
          disabled={loading}
        >

          <Text style={styles.buttonText}>

            {
              loading
                ? 'Ingresando...'
                : 'Iniciar Sesión'
            }

          </Text>

        </TouchableOpacity>

      </Animated.View>

    </View>

  );

}

/**
 * ============================================================
 * ESTILOS
 * ============================================================
 */

const styles = StyleSheet.create({  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EFE6',
    padding: 20,
  },

  /**
   * Tarjeta del formulario.
   */
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 30,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,

    elevation: 8,
  },

  /**
   * Logo del Hogar.
   */
  logo: {
    width: 170,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },

  /**
   * Icono del candado.
   */
  lock: {
    fontSize: 38,
    textAlign: 'center',
    marginBottom: 10,
  },

  /**
   * Título principal.
   */
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D3B66',
    marginBottom: 35,
  },

  /**
   * Etiquetas.
   */
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D3B66',
    marginBottom: 8,
    marginTop: 10,
  },

  /**
   * Campo de texto.
   */
  input: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
  },

  /**
   * Contenedor de contraseña.
   */
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
  },

  /**
   * Campo contraseña.
   */
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
  },

  /**
   * Icono mostrar contraseña.
   */
  eye: {
    fontSize: 22,
  },

  /**
   * Botón iniciar sesión.
   */
  button: {
    marginTop: 30,
    backgroundColor: '#C8A96A',
    borderRadius: 14,
    paddingVertical: 18,
  },

  /**
   * Texto del botón.
   */
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});