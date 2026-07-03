import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../services/api';

/**
 * Interfaz que define la estructura
 * de un producto obtenido desde la API.
 */
interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  stock_minimo: number;
  fecha_vencimiento: string;
  id_categoria?: number;
}

/**
 * Pantalla encargada de mostrar
 * todos los productos registrados.
 */
export default function VerProductos() {

  /**
   * Estado que almacena la lista
   * de productos obtenidos del servidor.
   */
  const [productos, setProductos] = useState<Producto[]>([]);

  /**
   * Estado utilizado para mostrar
   * el indicador de carga.
   */
  const [cargando, setCargando] = useState(true);

  /**
   * Al cargar la pantalla se consultan
   * todos los productos registrados.
   */
  useEffect(() => {
    obtenerProductos();
  }, []);

  /**
   * Función encargada de consultar
   * todos los productos desde la API.
   */
  const obtenerProductos = async () => {

    try {

      /**
       * Solicitud GET al backend.
       */
      const response = await api.get('/productos');

      console.log(
        'Productos obtenidos:',
        response.data
      );

      /**
       * Guarda los productos en el estado.
       */
      setProductos(response.data.data);

    } catch (error) {

      console.log(
        'Error al obtener productos:',
        error
      );

      Alert.alert(
        'Error',
        'No se pudieron cargar los productos'
      );

    } finally {

      /**
       * Finaliza la carga.
       */
      setCargando(false);
    }
  };

  /**
   * Función encargada de eliminar
   * un producto del sistema.
   */
  const eliminarProducto = async (
    id: number
  ) => {

    Alert.alert(
      'Confirmación',
      '¿Desea eliminar este producto?',
      [

        {
          text: 'Cancelar',
          style: 'cancel'
        },

        {
          text: 'Eliminar',

          onPress: async () => {

            try {

              /**
               * Solicitud DELETE al backend.
               */
              await api.delete(
                `/productos/${id}`
              );

              Alert.alert(
                'Éxito',
                'Producto eliminado correctamente'
              );

              /**
               * Actualiza la lista.
               */
              obtenerProductos();

            } catch (error) {

              console.log(error);

              Alert.alert(
                'Error',
                'No se pudo eliminar el producto'
              );
            }
          }
        }
      ]
    );
  };

  /**
   * Muestra indicador de carga mientras
   * se consultan los productos.
   */
  if (cargando) {

    return (

      <View style={styles.cargando}>

        <ActivityIndicator
          size="large"
          color="#007AFF"
        />

        <Text>
          Cargando productos...
        </Text>

      </View>

    );
  }

  return (

    <View style={styles.container}>

      {/* Botón para regresar */}
      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVolver}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      {/* Título principal */}
      <Text style={styles.titulo}>
        Lista de Productos
      </Text>

      {/* Lista de productos */}
      <FlatList

        data={productos}

        keyExtractor={(item) =>
          item.id_producto.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.tarjeta}>

            {/* Nombre */}
            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

            {/* Información del producto */}
            <Text>
              Descripción: {item.descripcion}
            </Text>

            <Text>
              Cantidad: {item.cantidad}
            </Text>

            <Text>
              Unidad: {item.unidad_medida}
            </Text>

            <Text>
              Stock mínimo: {item.stock_minimo}
            </Text>

            <Text>
              Vence: {
                item.fecha_vencimiento?.substring(0, 10)
              }
            </Text>

            {/* Botón Editar */}
            <TouchableOpacity

              style={styles.botonEditar}

              onPress={() =>
                router.push({
                  pathname: '/editar-producto',

                  params: {
                    id: item.id_producto,
                    nombre: item.nombre,
                    descripcion: item.descripcion,
                    cantidad: item.cantidad,
                    unidad_medida: item.unidad_medida,
                    stock_minimo: item.stock_minimo,
                    fecha_vencimiento:
                      item.fecha_vencimiento
                  }
                })
              }
            >

              <Text style={styles.textoBoton}>
                ✏️ Editar Producto
              </Text>

            </TouchableOpacity>

            {/* Botón Eliminar */}
            <TouchableOpacity

              style={styles.botonEliminar}

              onPress={() =>
                eliminarProducto(
                  item.id_producto
                )
              }
            >

              <Text style={styles.textoBoton}>
                🗑️ Eliminar Producto
              </Text>

            </TouchableOpacity>

          </View>

        )}

        /**
         * Mensaje mostrado cuando
         * no existen productos.
         */
        ListEmptyComponent={

          <Text style={styles.sinDatos}>
            No hay productos registrados.
          </Text>

        }

      />

    </View>

  );
}

/**
 * Estilos de la pantalla.
 */
const styles = StyleSheet.create({

  /**
   * Contenedor principal.
   */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },

  /**
   * Contenedor de carga.
   */
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
   * Texto del botón volver.
   */
  textoVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  /**
   * Título principal.
   */
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  /**
   * Tarjeta del producto.
   */
  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },

  /**
   * Nombre del producto.
   */
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  /**
   * Botón editar.
   */
  botonEditar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },

  /**
   * Botón eliminar.
   */
  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  /**
   * Texto de los botones.
   */
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  /**
   * Mensaje cuando no hay productos.
   */
  sinDatos: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#666'
  }

});