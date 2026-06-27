import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';

import api from '../services/api';

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  stock_minimo: number;
}

export default function BuscarProducto() {

  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);

  const buscarProducto = async () => {

    if (!busqueda) {
      Alert.alert(
        'Error',
        'Ingrese un nombre para buscar'
      );
      return;
    }

    try {

      const response = await api.get('/productos');

      const resultados = response.data.data.filter(
        (producto: Producto) =>
          producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
      );

      setProductos(resultados);

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudieron obtener los productos'
      );
    }
  };

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
        Buscar Producto
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del producto"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={buscarProducto}
      >
        <Text style={styles.textoBoton}>
          Buscar
        </Text>
      </TouchableOpacity>

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

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
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

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },

  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },

  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }

});