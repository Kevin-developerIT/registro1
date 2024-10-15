const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Manejar errores de conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    process.exit(1);  // Cierra la aplicación si no puede conectar
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Escuchar en el puerto
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo de errores del servidor
server.on('error', (error) => {
  console.error('Error en el servidor: ', error);
});
