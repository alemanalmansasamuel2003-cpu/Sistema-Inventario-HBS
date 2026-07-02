import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
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
   * todos los usuarios registrados
   * en la base de datos.
   */
  const obtenerUsuarios = async () => {

    try {

      /**
       * Petición GET al backend.
       *
       * Ruta:
       * http://localhost:3000/api/usuarios
       */
      const response = await api.get('/usuarios');

      console.log(
        'Usuarios obtenidos:',
        response.data
      );

      /**
       * Guarda los usuarios obtenidos
       * en el estado de la aplicación.
       */
      setUsuarios(response.data.data);

    } catch (error) {

      console.log(
        'Error al obtener usuarios:',
        error
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

        /**
         * Identificador único de cada usuario.
         */
        keyExtractor={(item) =>
          item.id_usuario.toString()
        }

        /**
         * Renderiza cada usuario de la lista.
         */
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

            {/* Botón para editar */}
            <TouchableOpacity
              style={styles.botonEditar}

              onPress={() =>
                router.push({
                  pathname: '/editar-perfil',
                  params: {
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

          </View>

        )}

        /**
         * Mensaje mostrado cuando no existen usuarios.
         */
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

  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  /**
   * Botón para volver.
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
   * Texto utilizado en los botones.
   */
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
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
   * Tarjeta de cada usuario.
   */
  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15
  },

  /**
   * Nombre del usuario.
   */
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  /**
   * Información general.
   */
  informacion: {
    fontSize: 16,
    marginBottom: 5
  },

  /**
   * Botón para editar usuario.
   */
  botonEditar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },

  /**
   * Texto mostrado cuando no existen registros.
   */
  sinDatos: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#666'
  }

});