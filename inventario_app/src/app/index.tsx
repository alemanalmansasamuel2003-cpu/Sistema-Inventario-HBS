import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image
} from 'react-native';

import Animated, {
  FadeInDown,
  BounceIn
} from 'react-native-reanimated';

import api from '../services/api';

/**
 * =====================================================
 * IMPORTAR LOGO INSTITUCIONAL
 * =====================================================
 */
import logoHBS from '../../assets/images/logo-hbs.jpg';

/**
 * =====================================================
 * PANTALLA: INICIO DE SESIÓN
 * =====================================================
 * Permite a los usuarios autenticarse
 * en el sistema de inventario del
 * Hogar El Buen Samaritano.
 * =====================================================
 */
export default function LoginScreen() {

  /**
   * Hook utilizado para navegar
   * entre pantallas.
   */
  const router = useRouter();

  /**
   * Estados del formulario.
   */
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Estado para controlar la carga.
   */
  const [cargando, setCargando] = useState(false);

  /**
   * Estado para mostrar u ocultar
   * la contraseña.
   */
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /**
   * =====================================================
   * FUNCIÓN PARA MOSTRAR MENSAJES
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

  /**
   * =====================================================
   * FUNCIÓN PARA INICIAR SESIÓN
   * =====================================================
   */
  const iniciarSesion = async () => {

    /**
     * Elimina espacios en blanco.
     */
    const correoLimpio = correo.trim();

    /**
     * Validar campos vacíos.
     */
    if (!correoLimpio || !password) {

      mostrarMensaje(
        'Campos incompletos',
        'Debe completar todos los campos.'
      );

      return;
    }

    /**
     * Validar formato del correo.
     */
    const expresionCorreo =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correoLimpio)) {

      mostrarMensaje(
        'Correo inválido',
        'Ingrese un correo electrónico válido.'
      );

      return;
    }

    try {

      /**
       * Activar estado de carga.
       */
      setCargando(true);

      /**
       * Solicitud al backend.
       */
      const response = await api.post(
        '/auth/login',
        {
          correo: correoLimpio,
          password
        }
      );

      /**
       * Verificar autenticación.
       */
      if (response.data.success) {

        mostrarMensaje(
          'Bienvenido',
          `Hola ${response.data.usuario.nombre}, inicio de sesión exitoso.`
        );

        /**
         * Redireccionar al inventario.
         */
        router.replace({
          pathname: '/inventario',
          params: {
            nombre:
              response.data.usuario.nombre,

            correo:
              response.data.usuario.correo,

            rol:
              response.data.usuario.rol
          }
        });
      }

    } catch (error: any) {

      console.log(
        'Error de autenticación:',
        error.response?.data
      );

      mostrarMensaje(
        'Error',
        error.response?.data?.mensaje ||
        'No fue posible iniciar sesión.'
      );

    } finally {

      /**
       * Finalizar carga.
       */
      setCargando(false);
    }
  };

  return (

    <View style={styles.container}>

      {/* Tarjeta principal */}
      <View style={styles.card}>

        {/* Logo institucional */}
        <Image
          source={logoHBS}
          style={styles.logo}
        />

        {/* Icono de seguridad */}
        <Text style={styles.iconoSeguridad}>
          🔒
        </Text>

        {/* Título principal */}
        <Animated.Text
          entering={FadeInDown.duration(1000)}
          style={styles.titulo}
        >
          Iniciar Sesión
        </Animated.Text>

        {/* Subtítulo */}
        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.subtitulo}
        >
          Ingrese sus credenciales para acceder
          al sistema de gestión de inventario.
        </Animated.Text>

        {/* Etiqueta correo */}
        <Text style={styles.label}>
          📧 Correo electrónico
        </Text>

        {/* Campo correo */}
        <Animated.View
          entering={
            FadeInDown
              .delay(300)
              .duration(1000)
          }
        >

          <TextInput
            style={styles.input}
            placeholder="ejemplo@hogar.org"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

        </Animated.View>

        {/* Etiqueta contraseña */}
        <Text style={styles.label}>
          🔒 Contraseña
        </Text>

        {/* Campo contraseña */}
        <Animated.View
          entering={
            FadeInDown
              .delay(500)
              .duration(1000)
          }
        >

          <View style={styles.passwordContainer}>

            <TextInput
              style={styles.passwordInput}
              placeholder="Ingrese su contraseña"
              secureTextEntry={!mostrarPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }
            >
              <Text style={styles.icono}>
                {mostrarPassword
                  ? '🙈'
                  : '👁️'}
              </Text>
            </TouchableOpacity>

          </View>

        </Animated.View>

        {/* Botón iniciar sesión */}
        <Animated.View
          entering={BounceIn.delay(800)}
        >

          <TouchableOpacity
            style={styles.boton}
            onPress={iniciarSesion}
            disabled={cargando}
          >

            <Text style={styles.textoBoton}>
              {
                cargando
                  ? 'Ingresando...'
                  : 'Iniciar Sesión'
              }
            </Text>

          </TouchableOpacity>

        </Animated.View>

        {/* Información institucional */}
        <View style={styles.infoBox}>

          <Text style={styles.infoTitulo}>
            🛡️ Acceso autorizado
          </Text>

          <Text style={styles.infoTexto}>
            Este sistema es de uso exclusivo
            para el personal autorizado del
            Hogar El Buen Samaritano.
          </Text>

        </View>

      </View>

    </View>
  );
}

/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */
const styles = StyleSheet.create({

  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3EFE6'
  },

  /**
   * Tarjeta principal.
   */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,

    elevation: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4
    },

    shadowOpacity: 0.20,
    shadowRadius: 8
  },

  /**
   * Logo institucional.
   */
  logo: {
    width: 220,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10
  },

  /**
   * Icono de seguridad.
   */
  iconoSeguridad: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15
  },

  /**
   * Título principal.
   */
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D3B66',
    marginBottom: 10
  },

  /**
   * Subtítulo.
   */
  subtitulo: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25
  },

  /**
   * Etiquetas de campos.
   */
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D3B66',
    marginBottom: 8,
    marginTop: 10
  },

  /**
   * Campo correo.
   */
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F8F8F8'
  },

  /**
   * Contenedor contraseña.
   */
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8'
  },

  /**
   * Campo contraseña.
   */
  passwordInput: {
    flex: 1,
    paddingVertical: 15
  },

  /**
   * Icono mostrar contraseña.
   */
  icono: {
    fontSize: 24
  },

  /**
   * Botón iniciar sesión.
   */
  boton: {
    backgroundColor: '#C8A96A',
    padding: 18,
    borderRadius: 15,
    marginTop: 25
  },

  /**
   * Texto del botón.
   */
  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },

  /**
   * Caja informativa.
   */
  infoBox: {
    marginTop: 30,
    backgroundColor: '#F5F1E8',
    borderRadius: 15,
    padding: 18
  },

  /**
   * Título de la caja informativa.
   */
  infoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D3B66',
    textAlign: 'center',
    marginBottom: 10
  },

  /**
   * Texto de la caja informativa.
   */
  infoTexto: {
    textAlign: 'center',
    color: '#555',
    lineHeight: 22
  }

});