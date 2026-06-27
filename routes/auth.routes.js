const express = require('express');
const router = express.Router();

const {
    register,
    login,
    cambiarPassword
} = require('../controllers/auth.controller');

// Registrar usuario
router.post('/register', register);

// Iniciar sesión
router.post('/login', login);

// Cambiar contraseña
router.put('/password', cambiarPassword);

module.exports = router;
