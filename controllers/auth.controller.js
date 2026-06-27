const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    try {

        const { nombre, correo, password, rol } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios
            (nombre, correo, password, rol)
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            nombre,
            correo,
            passwordHash,
            rol || 'Colaborador'
        ]);

        res.status(201).json({
            success: true,
            mensaje: 'Usuario registrado correctamente',
            id_usuario: resultado.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al registrar usuario'
        });
    }
};

const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        if (usuarios.length === 0) {

            return res.status(401).json({
                success: false,
                mensaje: 'Credenciales incorrectas'
            });
        }

        const usuario = usuarios[0];

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {

            return res.status(401).json({
                success: false,
                mensaje: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

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

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error en el login'
        });
    }
};
const cambiarPassword = async (req, res) => {

    try {

        const { correo, nuevaPassword } = req.body;

        // Encriptar la nueva contraseña
        const passwordHash = await bcrypt.hash(nuevaPassword, 10);

        const [resultado] = await db.query(
            `UPDATE usuarios
             SET password = ?
             WHERE correo = ?`,
            [passwordHash, correo]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            mensaje: 'Contraseña actualizada correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar contraseña'
        });
    }
};
module.exports = {
    register,
    login,
    cambiarPassword
};