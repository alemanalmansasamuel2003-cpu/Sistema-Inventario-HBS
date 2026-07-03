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

/**
 * Pantalla encargada de registrar
 * nuevos productos en el inventario.
 */
export default function AgregarProducto() {

  /**
   * Estados del formulario.
   */
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [idCategoria, setIdCategoria] = useState('');

  /**
   * Función encargada de registrar
   * un producto en la base de datos.
   */
  const guardarProducto = async () => {

    /**
     * Elimina espacios innecesarios.
     */
    const nombreLimpio = nombre.trim();
    const descripcionLimpia = descripcion.trim();
    const unidadLimpia = unidadMedida.trim();

    /**
     * Validar campos vacíos.
     */
    if (
      !nombreLimpio ||
      !descripcionLimpia ||
      !cantidad ||
      !unidadLimpia ||
      !stockMinimo ||
      !fechaVencimiento ||
      !idCategoria
    ) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );

      return;
    }

    /**
     * Validar cantidad.
     */
    if (
      isNaN(Number(cantidad)) ||
      Number(cantidad) <= 0
    ) {

      Alert.alert(
        'Error',
        'La cantidad debe ser mayor que cero'
      );

      return;
    }

    /**
     * Validar stock mínimo.
     */
    if (
      isNaN(Number(stockMinimo)) ||
      Number(stockMinimo) < 0
    ) {

      Alert.alert(
        'Error',
        'El stock mínimo no puede ser negativo'
      );

      return;
    }

    /**
     * Validar categoría.
     */
    if (
      isNaN(Number(idCategoria)) ||
      Number(idCategoria) <= 0
    ) {

      Alert.alert(
        'Error',
        'Debe ingresar una categoría válida'
      );

      return;
    }

    /**
     * Validar formato de fecha.
     */
    const formatoFecha =
      /^\d{4}-\d{2}-\d{2}$/;

    if (
      !formatoFecha.test(fechaVencimiento)
    ) {

      Alert.alert(
        'Error',
        'La fecha debe tener el formato AAAA-MM-DD'
      );

      return;
    }

    /**
     * Validar que la fecha no sea anterior al día actual.
     */
    const fechaActual = new Date();
    const fechaProducto = new Date(fechaVencimiento);

    if (fechaProducto < fechaActual) {

      Alert.alert(
        'Error',
        'La fecha de vencimiento no puede ser anterior a la fecha actual'
      );

      return;
    }

    try {

      /**
       * Solicitud POST al backend.
       */
      const response = await api.post(
        '/productos',
        {
          nombre: nombreLimpio,
          descripcion: descripcionLimpia,
          cantidad: Number(cantidad),
          unidad_medida: unidadLimpia,
          stock_minimo: Number(stockMinimo),
          fecha_vencimiento: fechaVencimiento,
          id_categoria: Number(idCategoria)
        }
      );

      /**
       * Mensaje de éxito.
       */
      Alert.alert(
        'Éxito',
        response.data.mensaje
      );

      /**
       * Limpiar formulario.
       */
      setNombre('');
      setDescripcion('');
      setCantidad('');
      setUnidadMedida('');
      setStockMinimo('');
      setFechaVencimiento('');
      setIdCategoria('');

    } catch (error: any) {

      console.log(
        'Error al registrar producto:',
        error.response?.data
      );

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

      <Text style={styles.label}>
        Nombre del Producto
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>
        Descripción
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>
        Cantidad
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Text style={styles.label}>
        Unidad de Medida
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Unidad de Medida"
        value={unidadMedida}
        onChangeText={setUnidadMedida}
      />

      <Text style={styles.label}>
        Stock Mínimo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Stock Mínimo"
        keyboardType="numeric"
        value={stockMinimo}
        onChangeText={setStockMinimo}
      />

      <Text style={styles.label}>
        Fecha de Vencimiento
      </Text>

      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={fechaVencimiento}
        onChangeText={setFechaVencimiento}
      />

      <Text style={styles.label}>
        ID Categoría
      </Text>

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

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
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