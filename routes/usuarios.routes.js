const express = require('express');
const router = express.Router();

const {
    obtenerUsuarios,
    actualizarUsuario
} = require('../controllers/usuarios.controller');

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Actualizar usuario
router.put('/:id', actualizarUsuario);

module.exports = router;