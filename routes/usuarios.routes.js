/**
 * =====================================================
 * RUTAS DE USUARIOS
 * =====================================================
 * Este archivo contiene las rutas relacionadas
 * con la administración de usuarios.
 *
 * Funcionalidades:
 * - Obtener todos los usuarios.
 * - Actualizar usuarios.
 * - Eliminar usuarios.
 * =====================================================
 */

const express = require('express');
const router = express.Router();

/**
 * Importar controladores.
 */
const {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarios.controller');

/**
 * =====================================================
 * OBTENER TODOS LOS USUARIOS
 * =====================================================
 */
router.get('/', obtenerUsuarios);

/**
 * =====================================================
 * ACTUALIZAR USUARIO
 * =====================================================
 */
router.put('/:id', actualizarUsuario);

/**
 * =====================================================
 * ELIMINAR USUARIO
 * =====================================================
 */
router.delete('/:id', eliminarUsuario);

/**
 * Exportar rutas.
 */
module.exports = router;