/**
 * ============================================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ============================================================
 * Este archivo contiene las funciones necesarias para:
 *
 * - Registrar usuarios.
 * - Iniciar sesión.
 * - Cambiar contraseñas.
 *
 * Validaciones implementadas:
 * - Campos vacíos.
 * - Correos duplicados.
 * - Nombre mínimo de 3 caracteres.
 * - Contraseña mínima de 6 caracteres.
 * ============================================================
 */

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * ============================================================
 * REGISTRAR USUARIO
 * ============================================================
 */
const register = async (req, res) => {

    try {

        /**
         * Obtener datos enviados desde el cliente.
         */
        const {
            nombre,
            correo,
            password,
            rol
        } = req.body;

        /**
         * Validar campos vacíos.
         */
        if (!nombre || !correo || !password || !rol) {

            return res.status(400).json({
                success: false,
                mensaje: 'Todos los campos son obligatorios.'
            });
        }

        /**
         * Validar longitud mínima del nombre.
         */
        if (nombre.trim().length < 3) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'El nombre debe contener al menos 3 caracteres.'
            });
        }

        /**
         * Validar longitud mínima de contraseña.
         */
        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'La contraseña debe contener al menos 6 caracteres.'
            });
        }

        /**
         * Verificar si el correo ya existe.
         */
        const [usuarioExiste] = await db.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        if (usuarioExiste.length > 0) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'Ya existe un usuario registrado con este correo electrónico.'
            });
        }

        /**
         * Encriptar contraseña.
         */
        const passwordHash = await bcrypt.hash(
            password,
            10
        );

        /**
         * Consulta SQL para insertar usuario.
         */
        const sql = `
            INSERT INTO usuarios
            (nombre, correo, password, rol)
            VALUES (?, ?, ?, ?)
        `;

        /**
         * Ejecutar consulta.
         */
        const [resultado] = await db.query(
            sql,
            [
                nombre.trim(),
                correo.trim(),
                passwordHash,
                rol
            ]
        );

        /**
         * Respuesta exitosa.
         */
        res.status(201).json({
            success: true,
            mensaje: 'Usuario registrado correctamente.',
            id_usuario: resultado.insertId
        });

    } catch (error) {

        console.log('ERROR AL REGISTRAR USUARIO');
        console.log(error);

        res.status(500).json({
            success: false,
            mensaje:
                'Ocurrió un error al registrar el usuario.'
        });
    }
};

/**
 * ============================================================
 * INICIAR SESIÓN
 * ============================================================
 */
const login = async (req, res) => {

    try {

        /**
         * Obtener credenciales enviadas.
         */
        const { correo, password } = req.body;

        /**
         * Validar campos vacíos.
         */
        if (!correo || !password) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'Debe ingresar el correo y la contraseña.'
            });
        }

        /**
         * Buscar usuario por correo.
         */
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        /**
         * Verificar existencia del usuario.
         */
        if (usuarios.length === 0) {

            return res.status(401).json({
                success: false,
                mensaje:
                    'Correo o contraseña incorrectos.'
            });
        }

        /**
         * Obtener usuario encontrado.
         */
        const usuario = usuarios[0];

        /**
         * Comparar contraseña ingresada.
         */
        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        /**
         * Validar contraseña.
         */
        if (!passwordValida) {

            return res.status(401).json({
                success: false,
                mensaje:
                    'Correo o contraseña incorrectos.'
            });
        }

        /**
         * Generar Token JWT.
         */
        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        /**
         * Respuesta exitosa.
         */
        res.json({
            success: true,
            token,

            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {

        console.log('ERROR EN LOGIN');
        console.log(error);

        res.status(500).json({
            success: false,
            mensaje:
                'Ocurrió un error al iniciar sesión.'
        });
    }
};

/**
 * ============================================================
 * CAMBIAR CONTRASEÑA
 * ============================================================
 */
const cambiarPassword = async (req, res) => {

    try {

        /**
         * Obtener datos enviados.
         */
        const {
            correo,
            nuevaPassword
        } = req.body;

        /**
         * Validar campos vacíos.
         */
        if (!correo || !nuevaPassword) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'Todos los campos son obligatorios.'
            });
        }

        /**
         * Validar longitud mínima.
         */
        if (nuevaPassword.length < 6) {

            return res.status(400).json({
                success: false,
                mensaje:
                    'La nueva contraseña debe contener al menos 6 caracteres.'
            });
        }

        /**
         * Encriptar contraseña.
         */
        const passwordHash = await bcrypt.hash(
            nuevaPassword,
            10
        );

        /**
         * Actualizar contraseña.
         */
        const [resultado] = await db.query(
            `UPDATE usuarios
             SET password = ?
             WHERE correo = ?`,
            [passwordHash, correo]
        );

        /**
         * Verificar si el usuario existe.
         */
        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado.'
            });
        }

        /**
         * Respuesta exitosa.
         */
        res.json({
            success: true,
            mensaje:
                'Contraseña actualizada correctamente.'
        });

    } catch (error) {

        console.log('ERROR AL CAMBIAR CONTRASEÑA');
        console.log(error);

        res.status(500).json({
            success: false,
            mensaje:
                'Ocurrió un error al actualizar la contraseña.'
        });
    }
};

/**
 * ============================================================
 * EXPORTAR CONTROLADORES
 * ============================================================
 */
module.exports = {
    register,
    login,
    cambiarPassword
};