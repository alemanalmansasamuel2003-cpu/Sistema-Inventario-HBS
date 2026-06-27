import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function Perfil() {

  const { nombre, correo, rol } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>
          ⬅ Volver
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Mi Perfil
      </Text>

      <View style={styles.tarjeta}>

        <Text style={styles.etiqueta}>
          Nombre:
        </Text>

        <Text style={styles.valor}>
          {nombre || 'No disponible'}
        </Text>

        <Text style={styles.etiqueta}>
          Correo:
        </Text>

        <Text style={styles.valor}>
          {correo || 'No disponible'}
        </Text>

        <Text style={styles.etiqueta}>
          Rol:
        </Text>

        <Text style={styles.valor}>
          {rol || 'No disponible'}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push('/editar-perfil')}
      >
        <Text style={styles.textoBoton}>
          ✏️ Editar Perfil
        </Text>
      </TouchableOpacity>

      {rol === 'Administrador' && (

        <>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => router.push('/usuarios')}
          >
            <Text style={styles.textoBoton}>
              👥 Administrar Usuarios
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => router.push('/agregar-usuario')}
          >
            <Text style={styles.textoBoton}>
              ➕ Agregar Usuario
            </Text>
          </TouchableOpacity>
        </>

      )}

    </View>
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
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 25,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 25
  },

  etiqueta: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },

  valor: {
    fontSize: 18,
    color: '#333',
    marginTop: 5
  },

  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }

});