import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * =====================================================
 * PANTALLA: MI PERFIL
 * =====================================================
 *
 * Muestra la información del usuario que inició sesión.
 *
 * Funcionalidades:
 *
 * ✔ Mostrar nombre.
 * ✔ Mostrar correo.
 * ✔ Mostrar rol.
 * ✔ Editar el propio perfil.
 * ✔ Acceso a administración (Administrador).
 *
 * =====================================================
 */

export default function Perfil() {

  /**
   * =====================================================
   * DATOS DEL USUARIO AUTENTICADO
   * =====================================================
   */

  const {

    id,

    nombre,

    correo,

    rol

  } = useLocalSearchParams();

  /**
   * =====================================================
   * EDITAR PERFIL
   * =====================================================
   *
   * Se envían todos los datos del usuario autenticado.
   *
   * =====================================================
   */

  const editarPerfil = () => {

    router.push({

      pathname: '/editar-perfil',

      params: {

        id: String(id),

        nombre: String(nombre),

        correo: String(correo),

        /**
         * Rol del usuario que se edita.
         */

        rol: String(rol),

        /**
         * Rol del usuario autenticado.
         */

        rolUsuario: String(rol)

      }

    });

  };

  /**
   * =====================================================
   * INTERFAZ
   * =====================================================
   */

  return (

    <View style={styles.container}>

    {/* ===================================================== */}
    {/* BOTÓN VOLVER */}
    {/* ===================================================== */}

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >

        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>

      </TouchableOpacity>

      {/* ===================================================== */}
      {/* TÍTULO */}
      {/* ===================================================== */}

      <Text style={styles.titulo}>
        Mi Perfil
      </Text>

      {/* ===================================================== */}
      {/* TARJETA */}
      {/* ===================================================== */}

      <View style={styles.tarjeta}>

        <Text style={styles.etiqueta}>
          Nombre
        </Text>

        <Text style={styles.valor}>
          {nombre || 'No disponible'}
        </Text>

        <Text style={styles.etiqueta}>
          Correo
        </Text>

        <Text style={styles.valor}>
          {correo || 'No disponible'}
        </Text>

        <Text style={styles.etiqueta}>
          Rol
        </Text>

        <Text style={styles.valor}>
          {rol || 'No disponible'}
        </Text>

      </View>

      {/* ===================================================== */}
      {/* BOTÓN EDITAR PERFIL */}
      {/* ===================================================== */}

      <TouchableOpacity
        style={styles.boton}
        onPress={editarPerfil}
      >

        <Text style={styles.textoBoton}>
          ✏️ Editar Perfil
        </Text>

      </TouchableOpacity>      

      {/* ===================================================== */}
      {/* OPCIONES EXCLUSIVAS DEL ADMINISTRADOR */}
      {/* ===================================================== */}

      {rol === 'Administrador' && (

        <>

          {/* Administrar Usuarios */}

          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              router.push({

                pathname: '/usuarios',

                params: {

                  /**
                   * Se envía el rol del usuario autenticado
                   * para que Editar Perfil sepa que quien
                   * está editando es un Administrador.
                   */
                  rol: String(rol)

                }

              })
            }
          >

            <Text style={styles.textoBoton}>
              👥 Administrar Usuarios
            </Text>

          </TouchableOpacity>

          {/* Agregar Usuario */}

          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              router.push({

                pathname: '/agregar-usuario',

                params: {

                  /**
                   * También se envía el rol del
                   * usuario autenticado.
                   */
                  rol: String(rol)

                }

              })
            }
          >

            <Text style={styles.textoBoton}>
              ➕ Agregar Usuario
            </Text>

          </TouchableOpacity>

        </>

      )}

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
   * =====================================================
   * CONTENEDOR PRINCIPAL
   * =====================================================
   */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  /**
   * =====================================================
   * BOTÓN VOLVER
   * =====================================================
   */
  botonVolver: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  /**
   * =====================================================
   * TÍTULO
   * =====================================================
   */
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D3B66',
    marginBottom: 30,
  },

  /**
   * =====================================================
   * TARJETA DEL PERFIL
   * =====================================================
   */
  tarjeta: {
    backgroundColor: '#F8F8F8',
    padding: 25,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,

    marginBottom: 25,
  },

  /**
   * =====================================================
   * ETIQUETAS
   * =====================================================
   */
  etiqueta: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0D3B66',
    marginTop: 15,
  },

  /**
   * =====================================================
   * VALORES
   * =====================================================
   */
  valor: {
    fontSize: 17,
    color: '#444',
    marginTop: 5,
  },

  /**
   * =====================================================
   * BOTONES
   * =====================================================
   */
  boton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  /**
   * =====================================================
   * TEXTO BOTONES
   * =====================================================
   */
  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

});