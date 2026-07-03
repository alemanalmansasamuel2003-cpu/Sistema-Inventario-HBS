import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

import api from '../services/api';

/**
 * =====================================================
 * PANTALLA: EDITAR PRODUCTO
 * =====================================================
 * Permite modificar la información de un producto.
 *
 * Funcionalidades:
 * - Editar nombre.
 * - Editar descripción.
 * - Editar cantidad.
 * - Editar unidad de medida.
 * - Editar stock mínimo.
 * - Editar fecha de vencimiento.
 *
 * Validaciones:
 * - No permitir campos vacíos.
 * - No permitir cantidades negativas.
 * - No permitir stock mínimo negativo.
 * - Validar números.
 * - Validar formato de fecha.
 * =====================================================
 */
export default function EditarProducto() {

  /**
   * Obtiene la información enviada desde
   * la pantalla Ver Productos.
   */
  const params = useLocalSearchParams();

  /**
   * Estados del formulario.
   */
  const [nombre, setNombre] = useState(
    params.nombre?.toString() || ''
  );

  const [descripcion, setDescripcion] = useState(
    params.descripcion?.toString() || ''
  );

  const [cantidad, setCantidad] = useState(
    params.cantidad?.toString() || ''
  );

  const [unidadMedida, setUnidadMedida] = useState(
    params.unidad_medida?.toString() || ''
  );

  const [stockMinimo, setStockMinimo] = useState(
    params.stock_minimo?.toString() || ''
  );

  const [fechaVencimiento, setFechaVencimiento] =
    useState(
      params.fecha_vencimiento
        ?.toString()
        .substring(0, 10) || ''
    );

  /**
   * Función para mostrar mensajes.
   */
  const mostrarMensaje = (
    titulo: string,
    mensaje: string
  ) => {

    Alert.alert(
      titulo,
      mensaje
    );
  };

  /**
   * Función encargada de actualizar
   * la información del producto.
   */
  const actualizarProducto = async () => {

    const nombreLimpio = nombre.trim();
    const descripcionLimpia =
      descripcion.trim();

    const unidadLimpia =
      unidadMedida.trim();

    const fechaLimpia =
      fechaVencimiento.trim();

    /**
     * Validar campos vacíos.
     */
    if (
      !nombreLimpio ||
      !descripcionLimpia ||
      !cantidad ||
      !unidadLimpia ||
      !stockMinimo ||
      !fechaLimpia
    ) {

      mostrarMensaje(
        'Campos incompletos',
        'Todos los campos son obligatorios.'
      );

      return;
    }

    /**
     * Validar números.
     */
    if (isNaN(Number(cantidad))) {

      mostrarMensaje(
        'Cantidad inválida',
        'Debe ingresar una cantidad numérica.'
      );

      return;
    }

    if (isNaN(Number(stockMinimo))) {

      mostrarMensaje(
        'Stock inválido',
        'Debe ingresar un stock mínimo numérico.'
      );

      return;
    }

    /**
     * Validar cantidades negativas.
     */
    if (Number(cantidad) < 0) {

      mostrarMensaje(
        'Cantidad inválida',
        'La cantidad no puede ser negativa.'
      );

      return;
    }

    if (Number(stockMinimo) < 0) {

      mostrarMensaje(
        'Stock inválido',
        'El stock mínimo no puede ser negativo.'
      );

      return;
    }

    /**
     * Validar formato de fecha.
     */
    const expresionFecha =
      /^\d{4}-\d{2}-\d{2}$/;

    if (
      !expresionFecha.test(fechaLimpia)
    ) {

      mostrarMensaje(
        'Fecha inválida',
        'La fecha debe tener el formato AAAA-MM-DD.'
      );

      return;
    }

    try {

      /**
       * Enviar datos al backend.
       */
      const response = await api.put(

        `/productos/${params.id}`,

        {
          nombre: nombreLimpio,
          descripcion: descripcionLimpia,
          cantidad: Number(cantidad),
          unidad_medida: unidadLimpia,
          stock_minimo: Number(stockMinimo),
          fecha_vencimiento: fechaLimpia
        }
      );

      /**
       * Mostrar mensaje de éxito.
       */
      Alert.alert(
        'Éxito',
        response.data.mensaje ||
        'Producto actualizado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => router.back()
          }
        ]
      );

    } catch (error: any) {

      console.log(error.response?.data);

      mostrarMensaje(
        'Error',
        error.response?.data?.mensaje ||
        'No se pudo actualizar el producto.'
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      {/* Botón volver */}
      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      {/* Tarjeta principal */}
      <View style={styles.card}>

        {/* Título */}
        <Text style={styles.titulo}>
          ✏️ Editar Producto
        </Text>

        {/* Nombre */}
        <Text style={styles.label}>
          Nombre del Producto
        </Text>

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        {/* Descripción */}
        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Cantidad */}
        <Text style={styles.label}>
          Cantidad Disponible
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        {/* Unidad */}
        <Text style={styles.label}>
          Unidad de Medida
        </Text>

        <TextInput
          style={styles.input}
          value={unidadMedida}
          onChangeText={setUnidadMedida}
        />

        {/* Stock mínimo */}
        <Text style={styles.label}>
          Stock Mínimo
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={stockMinimo}
          onChangeText={setStockMinimo}
        />

        {/* Fecha */}
        <Text style={styles.label}>
          Fecha de Vencimiento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          value={fechaVencimiento}
          onChangeText={setFechaVencimiento}
        />

        {/* Botón actualizar */}
        <TouchableOpacity
          style={styles.botonActualizar}
          onPress={actualizarProducto}
        >
          <Text style={styles.textoBoton}>
            💾 Actualizar Producto
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 20
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.2,
    shadowRadius: 4,

    marginBottom: 30
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

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#007AFF'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 5
  },

  input: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fafafa'
  },

  botonActualizar: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 10
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});