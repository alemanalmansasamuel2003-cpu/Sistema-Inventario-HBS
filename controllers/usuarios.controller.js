/**
 * =====================================================
 * CONTROLADOR DE USUARIOS
 * =====================================================
 * Este archivo contiene las funciones para:
 *
 * - Obtener todos los usuarios.
 * - Actualizar usuarios.
 * - Eliminar usuarios.
 * =====================================================
 */

const db = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * =====================================================
 * OBTENER TODOS LOS USUARIOS
 * =====================================================
 */
const obtenerUsuarios = async (req, res) => {

    try {

        /**
         * Consulta todos los usuarios registrados.
         */
        const [usuarios] = await db.query(`
            SELECT
                id_usuario,
                nombre,
                correo,
                rol,
                fecha_creacion
            FROM usuarios
        `);

        /**
         * Respuesta exitosa.
         */
        res.json({
            success: true,
            data: usuarios
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener usuarios'
        });
    }
};

/**
 * =====================================================
 * ACTUALIZAR USUARIO
 * =====================================================
 */
const actualizarUsuario = async (req, res) => {

    console.log('===== ACTUALIZAR USUARIO =====');
    console.log('ID:', req.params.id);
    console.log('BODY:', req.body);

    try {

        /**
         * Obtener ID enviado por URL.
         */
        const { id } = req.params;

        /**
         * Obtener datos enviados.
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
        if (!nombre || !correo || !rol) {

            return res.status(400).json({
                success: false,
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        /**
         * Verificar existencia del usuario.
         */
        const [usuario] = await db.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        if (usuario.length === 0) {

            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        /**
         * Verificar si el correo ya pertenece
         * a otro usuario.
         */
        const [correoExistente] = await db.query(
            `SELECT *
             FROM usuarios
             WHERE correo = ?
             AND id_usuario <> ?`,
            [correo, id]
        );

        if (correoExistente.length > 0) {

            return res.status(400).json({
                success: false,
                mensaje: 'El correo ya está registrado'
            });
        }

        /**
         * Si se envió una nueva contraseña.
         */
        if (password && password.trim() !== '') {

            /**
             * Encriptar contraseña.
             */
            const passwordHash =
                await bcrypt.hash(password, 10);

            /**
             * Actualizar incluyendo contraseña.
             */
            await db.query(`
                UPDATE usuarios
                SET nombre = ?,
                    correo = ?,
                    password = ?,
                    rol = ?
                WHERE id_usuario = ?
            `, [
                nombre,
                correo,
                passwordHash,
                rol,
                id
            ]);

        } else {

            /**
             * Actualizar sin modificar contraseña.
             */
            await db.query(`
                UPDATE usuarios
                SET nombre = ?,
                    correo = ?,
                    rol = ?
                WHERE id_usuario = ?
            `, [
                nombre,
                correo,
                rol,
                id
            ]);
        }

        /**
         * Respuesta exitosa.
         */
        res.json({
            success: true,
            mensaje: 'Usuario actualizado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar usuario'
        });
    }
};

/**
 * =====================================================
 * ELIMINAR USUARIO
 * =====================================================
 */
const eliminarUsuario = async (req, res) => {

    try {

        /**
         * Obtener ID del usuario.
         */
        const { id } = req.params;

        /**
         * Verificar que exista.
         */
        const [usuario] = await db.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        if (usuario.length === 0) {

            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        /**
         * Eliminar usuario.
         */
        await db.query(
            'DELETE FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        /**
         * Respuesta exitosa.
         */
        res.json({
            success: true,
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al eliminar usuario'
        });
    }
};

/**
 * =====================================================
 * EXPORTAR CONTROLADORES
 * =====================================================
 */
module.exports = {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
};