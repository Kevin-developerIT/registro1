// index.js o app.js
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors()); // Permitir solicitudes CORS desde el frontend
app.use(express.json()); // Middleware para analizar JSON en las solicitudes

// Rutas
app.use('/api', userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
