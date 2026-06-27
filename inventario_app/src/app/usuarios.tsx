import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function Usuarios() {

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
        Administrar Usuarios
      </Text>

      <View style={styles.tarjeta}>

        <Text style={styles.nombre}>
          Administrador
        </Text>

        <Text>
          admin@inventario.com
        </Text>

        <Text>
          Rol: Administrador
        </Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/editar-perfil',
              params: {
                nombre: 'Administrador',
                correo: 'admin@inventario.com',
                rol: 'Administrador'
              }
            })
          }
        >
          <Text style={styles.textoBoton}>
            ✏️ Editar
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  tarjeta: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 15
  },

  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  boton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
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

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});