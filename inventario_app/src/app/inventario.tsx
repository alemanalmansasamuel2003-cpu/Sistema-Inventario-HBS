import { router, useLocalSearchParams } from 'expo-router';
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
 * - Mostrar bienvenida.
 * - Navegar a las diferentes pantallas.
 * - Cerrar sesión.
 * =====================================================
 */
export default function Inventario() {

  /**
   * Datos recibidos desde el login.
   */
  const {
    nombre,
    correo,
    rol
  } = useLocalSearchParams();

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* ================================================= */}
      {/* TARJETA PRINCIPAL                                 */}
      {/* ================================================= */}
      <View style={styles.card}>

        {/* Encabezado de bienvenida */}
        <View style={styles.encabezado}>

          <Text style={styles.bienvenida}>
            🏛️ Bienvenido {nombre}
          </Text>

        </View>

        {/* Separador decorativo */}
        <Text style={styles.separador}>
          ───── 💛 ─────
        </Text>

        {/* Botón Agregar Producto */}
        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push('/agregar-producto')
          }
        >

          <Text style={styles.icono}>
            ➕
          </Text>

          <Text style={styles.textoBoton}>
            Agregar Producto
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>

        </TouchableOpacity>

        {/* Botón Ver Productos */}
        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push('/ver-productos')
          }
        >

          <Text style={styles.icono}>
            📦
          </Text>

          <Text style={styles.textoBoton}>
            Ver Productos
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>

        </TouchableOpacity>

        {/* Botón Buscar Producto */}
        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push('/buscar-producto')
          }
        >

          <Text style={styles.icono}>
            🔍
          </Text>

          <Text style={styles.textoBoton}>
            Buscar Producto
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>

        </TouchableOpacity>

        {/* Botón Reportes */}
        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push('/reportes')
          }
        >

          <Text style={styles.icono}>
            📋
          </Text>

          <Text style={styles.textoBoton}>
            Reportes
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>

        </TouchableOpacity>

        {/* Botón Perfil */}
        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/perfil',
              params: {
                nombre: nombre as string,
                correo: correo as string,
                rol: rol as string
              }
            })
          }
        >

          <Text style={styles.icono}>
            👤
          </Text>

          <Text style={styles.textoBoton}>
            Perfil
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>

        </TouchableOpacity>

        {/* Botón Cerrar Sesión */}
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

  /**
   * Contenedor principal.
   */
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F1E8'
  },

  /**
   * Tarjeta principal.
   */
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

  /**
   * Encabezado de bienvenida.
   */
  encabezado: {
    backgroundColor: '#0D3B66',

    borderRadius: 18,

    paddingVertical: 25,

    marginBottom: 20
  },

  /**
   * Texto de bienvenida.
   */
  bienvenida: {
    color: '#FFFFFF',

    fontSize: 26,

    textAlign: 'center',

    fontWeight: 'bold'
  },

  /**
   * Separador decorativo.
   */
  separador: {
    textAlign: 'center',

    color: '#D4AF37',

    fontSize: 20,

    marginBottom: 25
  },

  /**
   * Botones del menú.
   */
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

  /**
   * Iconos de los botones.
   */
  icono: {
    fontSize: 28,
    width: 45
  },

  /**
   * Texto de cada botón.
   */
  textoBoton: {
    flex: 1,

    fontSize: 20,

    color: '#0D3B66',

    fontWeight: 'bold'
  },

  /**
   * Flecha ubicada a la derecha.
   */
  flecha: {
    fontSize: 32,
    color: '#999'
  },

  /**
   * Botón cerrar sesión.
   */
  botonSalir: {

    borderWidth: 1.5,

    borderColor: '#E74C3C',

    borderRadius: 18,

    paddingVertical: 20,

    marginTop: 10
  },

  /**
   * Texto cerrar sesión.
   */
  textoSalir: {
    color: '#C0392B',

    textAlign: 'center',

    fontSize: 22,

    fontWeight: 'bold'
  }

});