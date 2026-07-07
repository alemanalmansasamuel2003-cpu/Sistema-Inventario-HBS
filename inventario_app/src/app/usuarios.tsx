import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import api from '../services/api';

/**
 * =====================================================
 * INTERFAZ USUARIO
 * =====================================================
 * Representa un usuario obtenido desde la API.
 * =====================================================
 */
interface Usuario {

  id_usuario: number;

  nombre: string;

  correo: string;

  rol: string;

}

/**
 * =====================================================
 * PANTALLA ADMINISTRAR USUARIOS
 * =====================================================
 *
 * Funcionalidades:
 *
 * ✔ Obtener usuarios.
 * ✔ Editar usuarios.
 * ✔ Eliminar usuarios.
 * ✔ Enviar el rol del usuario autenticado.
 *
 * =====================================================
 */

export default function Usuarios() {

  /**
   * =====================================================
   * DATOS DEL USUARIO AUTENTICADO
   * =====================================================
   */

  const {

    rol

  } = useLocalSearchParams();

  /**
   * =====================================================
   * LISTA DE USUARIOS
   * =====================================================
   */

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  /**
   * =====================================================
   * CARGAR USUARIOS
   * =====================================================
   */

  useEffect(() => {

    obtenerUsuarios();

  }, []);

  /**
   * =====================================================
   * OBTENER USUARIOS
   * =====================================================
   */

  const obtenerUsuarios = async () => {

    try {

      const response =
        await api.get('/usuarios');

      console.log(
        'Usuarios obtenidos:',
        response.data
      );

      if (response.data.success) {

        setUsuarios(
          response.data.data
        );

      } else {

        setUsuarios([]);

      }

    } catch (error) {

      console.log(error);

      Alert.alert(

        'Error',

        'No fue posible cargar los usuarios.'

      );

    }

  };

  /**
   * =====================================================
   * ELIMINAR USUARIO
   * =====================================================
   */

  const eliminarUsuario = async (

    id: number

  ) => {    Alert.alert(

      'Eliminar usuario',

      '¿Desea eliminar este usuario?',

      [

        {

          text: 'Cancelar',

          style: 'cancel',

        },

        {

          text: 'Eliminar',

          style: 'destructive',

          onPress: async () => {

            try {

              const response = await api.delete(

                `/usuarios/${id}`

              );

              Alert.alert(

                'Éxito',

                response.data.mensaje

              );

              /**
               * Recargar la lista.
               */

              obtenerUsuarios();

            } catch (error: any) {

              console.log(error);

              Alert.alert(

                'Error',

                error.response?.data?.mensaje ??

                'No fue posible eliminar el usuario.'

              );

            }

          }

        }

      ]

    );

  };

  /**
   * =====================================================
   * EDITAR USUARIO
   * =====================================================
   *
   * Envía la información del usuario seleccionado
   * junto con el rol del usuario autenticado.
   *
   * =====================================================
   */

  const editarUsuario = (

    usuario: Usuario

  ) => {

    console.log('========== USUARIO ==========');

    console.log(usuario);

    /**
     * Validar ID.
     */

    if (!usuario.id_usuario) {

      Alert.alert(

        'Error',

        'El usuario seleccionado no tiene un ID válido.'

      );

      return;

    }

    /**
     * Abrir Editar Perfil.
     */

    router.push({

      pathname: '/editar-perfil',

      params: {

        /**
         * Usuario que será editado.
         */

        id: usuario.id_usuario.toString(),

        nombre: usuario.nombre,

        correo: usuario.correo,

        /**
         * Rol del usuario que será editado.
         */

        rol: usuario.rol,

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
        Administrar Usuarios
      </Text>

      {/* ===================================================== */}
      {/* LISTA DE USUARIOS */}
      {/* ===================================================== */}

      <FlatList

        data={usuarios}

        keyExtractor={(item) =>
          item.id_usuario.toString()
        }

        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (

          <View style={styles.tarjeta}>

            {/* Nombre */}

            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

            {/* Correo */}

            <Text style={styles.informacion}>
              {item.correo}
            </Text>

            {/* Rol */}

            <Text style={styles.informacion}>
              Rol: {item.rol}
            </Text>

            {/* Botón Editar */}

            <TouchableOpacity
              style={styles.botonEditar}
              onPress={() => editarUsuario(item)}
            >

              <Text style={styles.textoBoton}>
                ✏️ Editar
              </Text>

            </TouchableOpacity>

            {/* Botón Eliminar */}

            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() =>
                eliminarUsuario(item.id_usuario)
              }
            >

              <Text style={styles.textoBoton}>
                🗑️ Eliminar
              </Text>

            </TouchableOpacity>

          </View>

        )}

        ListEmptyComponent={

          <Text style={styles.sinDatos}>

            No existen usuarios registrados.

          </Text>

        }

      />

    </View>

  );

}

/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */

const styles = StyleSheet.create({  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  /**
   * Botón volver.
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
   * Texto de botones.
   */
  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /**
   * Título principal.
   */
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D3B66',
    marginBottom: 30,
  },

  /**
   * Tarjeta del usuario.
   */
  tarjeta: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 4,

    elevation: 4,
  },

  /**
   * Nombre del usuario.
   */
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D3B66',
    marginBottom: 8,
  },

  /**
   * Información.
   */
  informacion: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  /**
   * Botón Editar.
   */
  botonEditar: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
  },

  /**
   * Botón Eliminar.
   */
  botonEliminar: {
    backgroundColor: '#DC3545',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  /**
   * Mensaje cuando no existen usuarios.
   */
  sinDatos: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#666',
  },

});