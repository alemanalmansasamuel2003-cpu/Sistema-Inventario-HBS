import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import api from '../services/api';

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  stock_minimo: number;
  fecha_vencimiento: string;
}

export default function VerProductos() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {

    try {

      const response = await api.get('/productos');

      console.log(response.data);

      setProductos(response.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVolver}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Lista de Productos
      </Text>

      <FlatList
        data={productos}
        keyExtractor={(item) =>
          item.id_producto.toString()
        }
        renderItem={({ item }) => (

          <View style={styles.tarjeta}>

            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

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
              Vence: {item.fecha_vencimiento?.substring(0, 10)}
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
    padding: 15
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

  textoVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }

});