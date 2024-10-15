const express = require('express');
const mysql = require('mysql');
require('dotenv').config();  // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || registro1.onrender.com;  // Usa el puerto proporcionado por Render o 3000 en desarrollo

// Configurar una ruta básica
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Conectar a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    process.exit(1);  // Cierra la aplicación si no puede conectar
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
