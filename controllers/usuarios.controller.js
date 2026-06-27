const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {

    try {

        const [usuarios] = await db.query(`
            SELECT id_usuario, nombre, correo, rol, fecha_creacion
            FROM usuarios
        `);

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

// Actualizar usuario
const actualizarUsuario = async (req, res) => {

    console.log('===== ACTUALIZAR USUARIO =====');
    console.log('ID:', req.params.id);
    console.log('BODY:', req.body);

    try {

        const { id } = req.params;

        const {
            nombre,
            correo,
            password,
            rol
        } = req.body;

        // Verificar que el usuario exista
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

        // Si viene una contraseña nueva
        if (password && password.trim() !== '') {

            const passwordHash = await bcrypt.hash(password, 10);

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

        res.json({
            success: true,
            mensaje: 'Usuario actualizado correctamente'
        });

    } catch (error) {

        console.log('ERROR AL ACTUALIZAR USUARIO');
        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar usuario'
        });
    }
};

module.exports = {
    obtenerUsuarios,
    actualizarUsuario
};