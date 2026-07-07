/**
 * ============================================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ============================================================
 *
 * Funcionalidades:
 *
 * ✔ Registrar usuarios.
 * ✔ Iniciar sesión.
 * ✔ Cambiar contraseña.
 *
 * Tecnologías utilizadas:
 *
 * ✔ MySQL
 * ✔ bcryptjs
 * ✔ JWT
 *
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
         * Obtener información enviada
         * desde el cliente.
         */
        const {

            nombre,

            correo,

            password,

            rol

        } = req.body;

        /**
         * Validar campos obligatorios.
         */
        if (

            !nombre ||

            !correo ||

            !password ||

            !rol

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'Todos los campos son obligatorios.'

            });

        }

        /**
         * Validar longitud del nombre.
         */
        if (

            nombre.trim().length < 3

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'El nombre debe contener al menos 3 caracteres.'

            });

        }

        /**
         * Validar contraseña.
         */
        if (

            password.length < 6

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'La contraseña debe contener al menos 6 caracteres.'

            });

        }

        /**
         * Verificar si el correo
         * ya se encuentra registrado.
         */
        const [usuarioExiste] =
            await db.query(

                'SELECT * FROM usuarios WHERE correo = ?',

                [correo]

            );

        if (

            usuarioExiste.length > 0

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'Ya existe un usuario registrado con este correo.'

            });

        }

        /**
         * Encriptar contraseña.
         */
        const passwordHash =
            await bcrypt.hash(

                password,

                10

            );

        /**
         * Insertar usuario.
         */
        const [resultado] =
            await db.query(

                `INSERT INTO usuarios
                (nombre, correo, password, rol)
                VALUES (?, ?, ?, ?)`,

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
        return res.status(201).json({

            success: true,

            mensaje:
                'Usuario registrado correctamente.',

            id_usuario:
                resultado.insertId

        });

    } catch (error) {

        console.log(
            'ERROR REGISTRANDO USUARIO'
        );

        console.log(error);

        return res.status(500).json({

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
 *
 * (CONTINÚA EN LA PARTE 2)
 * ============================================================
 *//**
 * ============================================================
 * INICIAR SESIÓN
 * ============================================================
 */

const login = async (req, res) => {

    try {

        /**
         * Obtener credenciales enviadas.
         */
        const {

            correo,

            password

        } = req.body;

        /**
         * Validar campos obligatorios.
         */
        if (

            !correo ||

            !password

        ) {

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

            `SELECT
                id_usuario,
                nombre,
                correo,
                password,
                rol
             FROM usuarios
             WHERE correo = ?`,

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
         * Usuario encontrado.
         */
        const usuario = usuarios[0];

        /**
         * Comparar contraseña.
         */
        const passwordValida =
            await bcrypt.compare(

                password,

                usuario.password

            );

        /**
         * Contraseña incorrecta.
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

                id_usuario: usuario.id_usuario,

                rol: usuario.rol

            },

            process.env.JWT_SECRET,

            {

                expiresIn: '8h'

            }

        );

        /**
         * Respuesta exitosa.
         *
         * IMPORTANTE:
         * Se devuelve id_usuario para que
         * el frontend pueda editar correctamente
         * el perfil del usuario.
         */
        return res.json({

            success: true,

            token,

            usuario: {

                id_usuario: usuario.id_usuario,

                nombre: usuario.nombre,

                correo: usuario.correo,

                rol: usuario.rol

            }

        });

    } catch (error) {

        console.log(
            'ERROR EN LOGIN'
        );

        console.log(error);

        return res.status(500).json({

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
 *
 * (CONTINÚA EN LA PARTE 3)
 * ============================================================/**
 * ============================================================
 * CAMBIAR CONTRASEÑA
 * ============================================================
 *
 * Permite actualizar la contraseña de un usuario.
 *
 * Validaciones:
 * ✔ Campos obligatorios.
 * ✔ Longitud mínima de la contraseña.
 * ✔ Verificar que el usuario exista.
 * ✔ Encriptar la nueva contraseña.
 * ============================================================
 */

const cambiarPassword = async (req, res) => {

    try {

        /**
         * Obtener datos enviados desde el cliente.
         */
        const {

            correo,

            nuevaPassword

        } = req.body;

        /**
         * Validar campos obligatorios.
         */
        if (

            !correo ||

            !nuevaPassword

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'Todos los campos son obligatorios.'

            });

        }

        /**
         * Validar longitud mínima.
         */
        if (

            nuevaPassword.length < 6

        ) {

            return res.status(400).json({

                success: false,

                mensaje:
                    'La nueva contraseña debe contener al menos 6 caracteres.'

            });

        }

        /**
         * Encriptar la nueva contraseña.
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

            [

                passwordHash,

                correo

            ]

        );

        /**
         * Verificar que el usuario exista.
         */
        if (

            resultado.affectedRows === 0

        ) {

            return res.status(404).json({

                success: false,

                mensaje:
                    'Usuario no encontrado.'

            });

        }

        /**
         * Respuesta exitosa.
         */
        return res.json({

            success: true,

            mensaje:
                'Contraseña actualizada correctamente.'

        });

    } catch (error) {

        console.log(
            'ERROR AL CAMBIAR CONTRASEÑA'
        );

        console.log(error);

        return res.status(500).json({

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