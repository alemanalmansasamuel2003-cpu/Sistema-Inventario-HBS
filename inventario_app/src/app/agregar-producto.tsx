import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';

import api from '../services/api';

export default function AgregarProducto() {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [idCategoria, setIdCategoria] = useState('');

  const guardarProducto = async () => {

    if (!nombre || !cantidad) {
      Alert.alert(
        'Error',
        'Nombre y cantidad son obligatorios'
      );
      return;
    }

    try {

      const response = await api.post('/productos', {
        nombre,
        descripcion,
        cantidad: Number(cantidad),
        unidad_medida: unidadMedida,
        stock_minimo: Number(stockMinimo),
        fecha_vencimiento: fechaVencimiento,
        id_categoria: Number(idCategoria)
      });

      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      setNombre('');
      setDescripcion('');
      setCantidad('');
      setUnidadMedida('');
      setStockMinimo('');
      setFechaVencimiento('');
      setIdCategoria('');

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo registrar el producto'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVolver}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Agregar Producto
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <TextInput
        style={styles.input}
        placeholder="Unidad de Medida"
        value={unidadMedida}
        onChangeText={setUnidadMedida}
      />

      <TextInput
        style={styles.input}
        placeholder="Stock Mínimo"
        keyboardType="numeric"
        value={stockMinimo}
        onChangeText={setStockMinimo}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha Vencimiento (2027-12-31)"
        value={fechaVencimiento}
        onChangeText={setFechaVencimiento}
      />

      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        keyboardType="numeric"
        value={idCategoria}
        onChangeText={setIdCategoria}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={guardarProducto}
      >
        <Text style={styles.textoBoton}>
          Guardar Producto
        </Text>
      </TouchableOpacity>

    </ScrollView>
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
    alignSelf: 'flex-start',
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    marginBottom: 30
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
    marginTop: 10,
    marginBottom: 30
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});