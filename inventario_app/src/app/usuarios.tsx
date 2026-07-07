import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import api from '../services/api';



/**
 * =====================================================
 * INTERFAZ USUARIO
 * =====================================================
 *
 * Define la estructura de datos recibida
 * desde la API.
 *
 * =====================================================
 */

interface Usuario {

  id_usuario: number;

  nombre: string;

  correo: string;

  rol: string;

}



/**
 * =====================================================
 * PANTALLA ADMINISTRAR USUARIOS
 * =====================================================
 *
 * Funciones:
 *
 * ✔ Mostrar usuarios registrados.
 * ✔ Editar usuarios.
 * ✔ Eliminar usuarios.
 * ✔ Controlar permisos mediante roles.
 *
 * Roles:
 *
 * Administrador:
 * - Puede editar.
 * - Puede eliminar.
 *
 * Encargado:
 * - Puede consultar.
 *
 * =====================================================
 */


export default function Usuarios() {



  /**
   * =====================================================
   * OBTENER ROL DEL USUARIO ACTUAL
   * =====================================================
   */

  const { rol } = useLocalSearchParams();




  /**
   * =====================================================
   * ESTADO DE USUARIOS
   * =====================================================
   */

  const [usuarios,setUsuarios] =
    useState<Usuario[]>([]);





  /**
   * =====================================================
   * CARGAR USUARIOS AL INICIAR
   * =====================================================
   */

  useEffect(()=>{

    obtenerUsuarios();

  },[]);





  /**
   * =====================================================
   * CONSULTAR USUARIOS
   * =====================================================
   *
   * Obtiene la lista de usuarios
   * desde el backend.
   *
   * Endpoint:
   *
   * GET /usuarios
   *
   =====================================================
   */


  const obtenerUsuarios = async()=>{


    try{


      const response =
        await api.get('/usuarios');



      console.log(
        "Usuarios obtenidos:",
        response.data
      );



      if(response.data.success){


        setUsuarios(
          response.data.data
        );


      }else{


        setUsuarios([]);


      }



    }catch(error){


      console.log(error);



      Alert.alert(

        "Error",

        "No fue posible cargar los usuarios."

      );


    }


  };






  /**
   * =====================================================
   * ELIMINAR USUARIO
   * =====================================================
   *
   * Permite eliminar un usuario.
   *
   * Proceso:
   *
   * 1. Recibe ID del usuario.
   * 2. Solicita confirmación.
   * 3. Ejecuta DELETE contra la API.
   * 4. Actualiza la lista.
   *
   * Endpoint:
   *
   * DELETE /usuarios/:id
   *
   * =====================================================
   */


  const eliminarUsuario = async(id:number)=>{


    /**
     * Validar ID
     */

    if(!id){


      alert(
        "Usuario inválido."
      );


      return;


    }




    /**
     * Confirmación compatible
     * con Expo Web.
     */

    const confirmar =
      window.confirm(

        "¿Desea eliminar este usuario?"

      );



    if(!confirmar){


      console.log(
        "Eliminación cancelada"
      );


      return;


    }




    try{


      console.log(
        "Eliminando usuario ID:",
        id
      );



      const response =
        await api.delete(

          `/usuarios/${id}`

        );




      console.log(

        "Respuesta eliminar:",

        response.data

      );




      alert(

        response.data.mensaje ||

        "Usuario eliminado correctamente."

      );




      /**
       * Actualizar lista
       */

      obtenerUsuarios();




    }catch(error:any){



      console.log(

        "Error eliminar:",

        error.response?.data ||

        error

      );



      alert(

        error.response?.data?.mensaje ||

        "No fue posible eliminar el usuario."

      );



    }



  };







  /**
   * =====================================================
   * EDITAR USUARIO
   * =====================================================
   *
   * Envía los datos del usuario seleccionado
   * hacia la pantalla editar-perfil.
   *
   * =====================================================
   */


  const editarUsuario =
  (usuario:Usuario)=>{


    if(!usuario.id_usuario){


      Alert.alert(

        "Error",

        "Usuario inválido."

      );


      return;


    }



    router.push({


      pathname:'/editar-perfil',



      params:{


        id:
        usuario.id_usuario.toString(),


        nombre:
        usuario.nombre,


        correo:
        usuario.correo,


        rol:
        usuario.rol,


        rolUsuario:
        String(rol)


      }



    });



  };






  /**
   * =====================================================
   * INTERFAZ
   * =====================================================
   */


  return(


    <View style={styles.container}>


      <TouchableOpacity

        style={styles.botonVolver}

        onPress={()=>router.back()}

      >

        <Text style={styles.textoBoton}>

          ⬅ Volver

        </Text>


      </TouchableOpacity>





      <Text style={styles.titulo}>

        Administrar Usuarios

      </Text>





      <FlatList


        data={usuarios}



        keyExtractor={(item)=>

          item.id_usuario.toString()

        }



        showsVerticalScrollIndicator={false}



        renderItem={({item})=>(


          <View style={styles.tarjeta}>


            <Text style={styles.nombre}>

              {item.nombre}

            </Text>



            <Text style={styles.informacion}>

              {item.correo}

            </Text>



            <Text style={styles.informacion}>

              Rol: {item.rol}

            </Text>





            <TouchableOpacity

              style={styles.botonEditar}

              onPress={()=>

                editarUsuario(item)

              }

            >

              <Text style={styles.textoBoton}>

                ✏️ Editar

              </Text>


            </TouchableOpacity>






            <TouchableOpacity

              style={styles.botonEliminar}

              onPress={()=>{


                console.log(

                  "CLICK ELIMINAR ID:",

                  item.id_usuario

                );



                eliminarUsuario(

                  item.id_usuario

                );


              }}

            >

              <Text style={styles.textoBoton}>

                🗑️ Eliminar

              </Text>


            </TouchableOpacity>




          </View>



        )}




        ListEmptyComponent={


          <Text style={styles.sinDatos}>

            No existen usuarios registrados.

          </Text>


        }



      />


    </View>



  );


}






/**
 * =====================================================
 * ESTILOS
 * =====================================================
 */


const styles = StyleSheet.create({


  container:{

    flex:1,

    backgroundColor:'#FFFFFF',

    padding:20,

  },



  botonVolver:{

    marginTop:20,

    marginBottom:20,

    alignSelf:'flex-start',

    backgroundColor:'#007AFF',

    paddingVertical:10,

    paddingHorizontal:20,

    borderRadius:10,

  },



  textoBoton:{

    color:'#FFFFFF',

    textAlign:'center',

    fontSize:16,

    fontWeight:'bold',

  },



  titulo:{

    fontSize:30,

    fontWeight:'bold',

    textAlign:'center',

    color:'#0D3B66',

    marginBottom:30,

  },



  tarjeta:{

    backgroundColor:'#F8F8F8',

    borderRadius:15,

    padding:20,

    marginBottom:15,

    elevation:4,

  },



  nombre:{

    fontSize:22,

    fontWeight:'bold',

    color:'#0D3B66',

    marginBottom:8,

  },



  informacion:{

    fontSize:16,

    color:'#555',

    marginBottom:5,

  },



  botonEditar:{

    backgroundColor:'#0D6EFD',

    paddingVertical:12,

    borderRadius:10,

    marginTop:18,

  },



  botonEliminar:{

    backgroundColor:'#DC3545',

    paddingVertical:12,

    borderRadius:10,

    marginTop:10,

  },



  sinDatos:{

    textAlign:'center',

    marginTop:40,

    fontSize:18,

    color:'#666',

  },


});