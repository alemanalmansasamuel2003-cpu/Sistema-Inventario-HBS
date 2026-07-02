import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import api from '../services/api';

interface Producto {
  id_producto: number;
  nombre: string;
  cantidad: number;
  stock_minimo: number;
  fecha_vencimiento: string;
}

export default function Reportes() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    try {

      setCargando(true);

      const response = await api.get('/productos');

      console.log('Respuesta API:', response.data);

      // Si el backend devuelve { data: [...] }
      if (response.data.data) {
        setProductos(response.data.data);
      }
      // Si devuelve directamente un arreglo
      else if (Array.isArray(response.data)) {
        setProductos(response.data);
      }
      else {
        setProductos([]);
      }

    } catch (error) {

      console.log('Error al cargar productos:', error);

    } finally {

      setCargando(false);

    }
  };

  if (cargando) {
    return (
      <View style={styles.cargandoContainer}>
        <Text style={styles.cargandoTexto}>
          Cargando reportes...
        </Text>
      </View>
    );
  }

  const totalProductos = productos.length;

  const stockBajo = productos.filter(
    producto => producto.cantidad <= producto.stock_minimo
  );

  const totalUnidades = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const hoy = new Date();

  const proximosVencer = productos.filter(producto => {

    const fechaVencimiento = new Date(producto.fecha_vencimiento);

    const diferenciaDias =
      (fechaVencimiento.getTime() - hoy.getTime()) /
      (1000 * 60 * 60 * 24);

    return diferenciaDias >= 0 && diferenciaDias <= 30;
  });

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
        Reportes del Inventario
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.valor}>
          {totalProductos}
        </Text>

        <Text style={styles.descripcion}>
          Productos Registrados
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.valor}>
          {totalUnidades}
        </Text>

        <Text style={styles.descripcion}>
          Unidades en Inventario
        </Text>
      </View>

      <TouchableOpacity
        style={styles.tarjeta}
        onPress={() => router.push('/stock-bajo')}
      >
        <Text style={styles.valor}>
          {stockBajo.length}
        </Text>

        <Text style={styles.descripcion}>
          Productos con Stock Bajo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tarjeta}
        onPress={() => router.push('/proximos-vencer')}
      >
        <Text style={styles.valor}>
          {proximosVencer.length}
        </Text>

        <Text style={styles.descripcion}>
          Productos Próximos a Vencer
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

  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cargandoTexto: {
    fontSize: 20,
    fontWeight: 'bold'
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  tarjeta: {
    backgroundColor: '#007AFF',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center'
  },

  valor: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold'
  },

  descripcion: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center'
  }

});