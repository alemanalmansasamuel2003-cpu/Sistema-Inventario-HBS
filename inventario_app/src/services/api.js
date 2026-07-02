import axios from 'axios';
import { Platform } from 'react-native';

/**
 * Determina la URL base de la API según la plataforma donde se ejecuta la aplicación.
 *
 * - Si la aplicación se ejecuta en la Web (navegador),
 *   utiliza localhost porque el navegador y el servidor están en la misma computadora.
 *
 * - Si la aplicación se ejecuta en Android o iOS,
 *   utiliza la dirección IP de la computadora donde se encuentra el servidor.
 */
const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000/api'
    : 'http://192.168.1.191:3000/api';

/**
 * Crea una instancia de Axios para realizar solicitudes HTTP al servidor.
 *
 * Configuración:
 * - baseURL: Dirección base de la API.
 * - headers: Define que todas las solicitudes enviarán y recibirán datos en formato JSON.
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Muestra en la consola la URL utilizada por la aplicación.
 * Esta línea es útil durante el desarrollo y depuración.
 */
console.log('API URL utilizada:', API_URL);

/**
 * Exporta la instancia de Axios para ser utilizada en otros archivos
 * del proyecto, como servicios de autenticación, usuarios, inventario, etc.
 */
export default api;