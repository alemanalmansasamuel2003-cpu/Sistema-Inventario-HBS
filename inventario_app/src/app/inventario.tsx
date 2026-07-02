import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

/**
 * Pantalla principal del sistema de inventario.
 *
 * Esta pantalla permite al usuario acceder a las
 * diferentes funcionalidades del sistema, como:
 * - Agregar productos.
 * - Consultar productos.
 * - Buscar productos.
 * - Generar reportes.
 * - Consultar el perfil del usuario.
 * - Cerrar sesión.
 */
export default function Inventario() {

  /**
   * Obtiene los parámetros enviados desde la pantalla
   * de inicio de sesión.
   */
  const { nombre, correo, rol } = useLocalSearchParams();

  return (

    <ScrollView style={styles.container}>

      {/* Tarjeta de bienvenida del usuario */}
      <View style={styles.tarjeta}>

        <Text style={styles.bienvenida}>
          Bienvenido {nombre}
        </Text>

      </View>

      {/* Botón para navegar a la pantalla de agregar productos */}
      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/agregar-producto')}
      >

        <Text style={styles.textoBoton}>
          ➕ Agregar Producto
        </Text>

      </TouchableOpacity>

      {/* Botón para visualizar todos los productos registrados */}
      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/ver-productos')}
      >

        <Text style={styles.textoBoton}>
          📋 Ver Productos
        </Text>

      </TouchableOpacity>

      {/* Botón para buscar productos específicos */}
      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/buscar-producto')}
      >

        <Text style={styles.textoBoton}>
          🔍 Buscar Producto
        </Text>

      </TouchableOpacity>

      {/* Botón para acceder a la sección de reportes */}
      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/reportes')}
      >

        <Text style={styles.textoBoton}>
          📊 Reportes
        </Text>

      </TouchableOpacity>

      {/* Botón para consultar la información del perfil del usuario */}
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

        <Text style={styles.textoBoton}>
          👤 Perfil
        </Text>

      </TouchableOpacity>

      {/* Botón para cerrar la sesión y regresar al login */}
      <TouchableOpacity
        style={[styles.boton, styles.salir]}
        onPress={() => router.replace('/')}
      >

        <Text style={styles.textoBoton}>
          🚪 Cerrar Sesión
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );
}

/**
 * Estilos utilizados en la pantalla principal
 * del sistema de inventario.
 */
const styles = StyleSheet.create({

  /**
   * Contenedor principal de la pantalla.
   */
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },

  /**
   * Tarjeta que muestra el mensaje de bienvenida.
   */
  tarjeta: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    marginBottom: 30
  },

  /**
   * Texto de bienvenida mostrado al usuario.
   */
  bienvenida: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  /**
   * Estilo general de los botones del menú.
   */
  boton: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#444',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15
  },

  /**
   * Texto mostrado dentro de cada botón.
   */
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  /**
   * Estilo específico para el botón de cerrar sesión.
   */
  salir: {
    marginTop: 20,
    borderColor: '#ff4444'
  }

});