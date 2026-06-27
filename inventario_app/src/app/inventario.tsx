import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function Inventario() {

  const { nombre, correo, rol } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.tarjeta}>
        <Text style={styles.bienvenida}>
          Bienvenido {nombre}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/agregar-producto')}
      >
        <Text style={styles.textoBoton}>
          ➕ Agregar Producto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/ver-productos')}
      >
        <Text style={styles.textoBoton}>
          📋 Ver Productos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/buscar-producto')}
      >
        <Text style={styles.textoBoton}>
          🔍 Buscar Producto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/reportes')}
      >
        <Text style={styles.textoBoton}>
          📊 Reportes
        </Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },

  tarjeta: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    marginBottom: 30
  },

  bienvenida: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  boton: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#444',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15
  },

  textoBoton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  salir: {
    marginTop: 20,
    borderColor: '#ff4444'
  }
});