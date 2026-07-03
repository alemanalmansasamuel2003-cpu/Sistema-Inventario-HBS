import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';

import api from '../services/api';

/**
 * Interfaz que representa la estructura
 * de un usuario obtenido desde la API.
 */
interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

/**
 * Pantalla encargada de mostrar y administrar
 * todos los usuarios registrados en el sistema.
 */
export default function Usuarios() {

  /**
   * Estado que almacena la lista
   * de usuarios obtenidos desde la API.
   */
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  /**
   * Al cargar la pantalla se obtienen
   * automáticamente todos los usuarios.
   */
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  /**
   * Función encargada de consultar
   * todos los usuarios registrados.
   */
  const obtenerUsuarios = async () => {

    try {

      const response = await api.get('/usuarios');

      console.log(
        'Usuarios obtenidos:',
        response.data
      );

      setUsuarios(response.data.data);

    } catch (error) {

      console.log(
        'Error al obtener usuarios:',
        error
      );
    }
  };

  /**
   * Función encargada de eliminar
   * un usuario del sistema.
   */
  const eliminarUsuario = async (id: number) => {

    console.log(
      'Intentando eliminar usuario:',
      id
    );

    try {

      /**
       * Petición DELETE al backend.
       */
      const response = await api.delete(
        `/usuarios/${id}`
      );

      console.log(
        'Respuesta del servidor:',
        response.data
      );

      /**
       * Mostrar mensaje de éxito.
       */
      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      /**
       * Actualizar la lista de usuarios.
       */
      obtenerUsuarios();

    } catch (error: any) {

      console.log(
        'ERROR AL ELIMINAR:',
        error.response?.data
      );

      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo eliminar el usuario'
      );
    }
  };

  return (

    <View style={styles.container}>

      {/* Botón para regresar */}
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
        Administrar Usuarios
      </Text>

      {/* Lista de usuarios */}
      <FlatList
        data={usuarios}

        keyExtractor={(item) =>
          item.id_usuario.toString()
        }

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
              onPress={() =>
                router.push({
                  pathname: '/editar-perfil',
                  params: {
                    id: item.id_usuario,
                    nombre: item.nombre,
                    correo: item.correo,
                    rol: item.rol
                  }
                })
              }
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
            No hay usuarios registrados.
          </Text>
        }

      />

    </View>

  );
}

/**
 * Estilos utilizados en la pantalla.
 */
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

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15
  },

  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  informacion: {
    fontSize: 16,
    marginBottom: 5
  },

  botonEditar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },

  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  sinDatos: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#666'
  }

});