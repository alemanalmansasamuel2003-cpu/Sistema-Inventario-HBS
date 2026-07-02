import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import api from '../services/api';

interface Producto {
  id_producto: number;
  nombre: string;
  cantidad: number;
  fecha_vencimiento: string;
}

export default function ProximosVencer() {

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    try {

      const response = await api.get('/productos');

      const hoy = new Date();

      const productosFiltrados = response.data.data.filter(
        (producto: Producto) => {

          const fechaVencimiento = new Date(
            producto.fecha_vencimiento
          );

          const diferenciaDias =
            (fechaVencimiento.getTime() - hoy.getTime()) /
            (1000 * 60 * 60 * 24);

          return diferenciaDias >= 0 && diferenciaDias <= 30;
        }
      );

      setProductos(productosFiltrados);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Productos Próximos a Vencer
      </Text>

      <FlatList
        data={productos}
        keyExtractor={(item) =>
          item.id_producto.toString()
        }

        ListEmptyComponent={
          <Text style={styles.sinDatos}>
            No existen productos próximos a vencer.
          </Text>
        }

        renderItem={({ item }) => (

          <View style={styles.tarjeta}>

            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

            <Text style={styles.texto}>
              Cantidad: {item.cantidad}
            </Text>

            <Text style={styles.vencimiento}>
              Vence: {item.fecha_vencimiento}
            </Text>

          </View>

        )}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  botonVolver: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  tarjeta: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  texto: {
    fontSize: 16,
    marginBottom: 5
  },

  vencimiento: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold'
  },

  sinDatos: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18
  }

});