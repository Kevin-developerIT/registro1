const express = require('express');
const cors = require('cors'); // Asegúrate de tener esta línea
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors()); // Agrega esta línea para habilitar CORS
app.use(express.json()); // Middleware para analizar JSON en las solicitudes

// Rutas
app.use('/api', userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
