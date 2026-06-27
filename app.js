const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar rutas
const productosRoutes = require('./routes/productos.routes');
const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        success: true,
        mensaje: 'API Inventario funcionando correctamente'
    });
});

// Rutas del sistema
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(
        `🚀 Servidor ejecutándose en http://localhost:${PORT}`
    );
});