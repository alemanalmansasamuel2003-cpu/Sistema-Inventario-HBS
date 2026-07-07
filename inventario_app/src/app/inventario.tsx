import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

/**
 * =====================================================
 * PANTALLA PRINCIPAL DEL SISTEMA DE INVENTARIO
 * =====================================================
 *
 * Funcionalidades:
 * ✔ Mostrar bienvenida.
 * ✔ Navegar entre módulos.
 * ✔ Acceder al perfil.
 * ✔ Cerrar sesión.
 * =====================================================
 */

export default function Inventario() {

  /**
   * =====================================================
   * DATOS DEL USUARIO AUTENTICADO
   * =====================================================
   */

  const {

    id,

    nombre,

    correo,

    rol

  } = useLocalSearchParams();

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.card}>

        {/* Encabezado */}

        <View style={styles.encabezado}>

          <Text style={styles.bienvenida}>
            🏛️ Bienvenido {nombre}
          </Text>

        </View>

        <Text style={styles.separador}>
          ───── 💛 ─────
        </Text>

        {/* Agregar producto */}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.push('/agregar-producto')}
        >

          <Text style={styles.icono}>➕</Text>

          <Text style={styles.textoBoton}>
            Agregar Producto
          </Text>

          <Text style={styles.flecha}>›</Text>

        </TouchableOpacity>

        {/* Ver productos */}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.push('/ver-productos')}
        >

          <Text style={styles.icono}>📦</Text>

          <Text style={styles.textoBoton}>
            Ver Productos
          </Text>

          <Text style={styles.flecha}>›</Text>

        </TouchableOpacity>

        {/* Buscar */}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.push('/buscar-producto')}
        >

          <Text style={styles.icono}>🔍</Text>

          <Text style={styles.textoBoton}>
            Buscar Producto
          </Text>

          <Text style={styles.flecha}>›</Text>

        </TouchableOpacity>

        {/* Reportes */}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.push('/reportes')}
        >

          <Text style={styles.icono}>📋</Text>

          <Text style={styles.textoBoton}>
            Reportes
          </Text>

          <Text style={styles.flecha}>›</Text>

        </TouchableOpacity>

        {/* Perfil */}

        <TouchableOpacity
          style={styles.boton}
          onPress={() =>

            router.push({

              pathname: '/perfil',

              params: {

                id: String(id),

                nombre: String(nombre),

                correo: String(correo),

                rol: String(rol)

              }

            })

          }
        >

          <Text style={styles.icono}>👤</Text>

          <Text style={styles.textoBoton}>
            Perfil
          </Text>

          <Text style={styles.flecha}>›</Text>

        </TouchableOpacity>

        {/* Cerrar sesión */}

        <TouchableOpacity
          style={styles.botonSalir}
          onPress={() => router.replace('/')}
        >

          <Text style={styles.textoSalir}>
            🚪 Cerrar Sesión
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F1E8'
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6
  },

  encabezado: {
    backgroundColor: '#0D3B66',
    borderRadius: 18,
    paddingVertical: 25,
    marginBottom: 20
  },

  bienvenida: {
    color: '#FFFFFF',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  separador: {
    textAlign: 'center',
    color: '#D4AF37',
    fontSize: 20,
    marginBottom: 25
  },

  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 15
  },

  icono: {
    fontSize: 28,
    width: 45
  },

  textoBoton: {
    flex: 1,
    fontSize: 20,
    color: '#0D3B66',
    fontWeight: 'bold'
  },

  flecha: {
    fontSize: 32,
    color: '#999'
  },

  botonSalir: {
    borderWidth: 1.5,
    borderColor: '#E74C3C',
    borderRadius: 18,
    paddingVertical: 20,
    marginTop: 10
  },

  textoSalir: {
    color: '#C0392B',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }

});