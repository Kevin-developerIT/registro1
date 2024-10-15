require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Configuración de body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Verificación de conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para verificar la conexión con una consulta de prueba
app.get('/verificar-conexion', (req, res) => {
    db.query('SELECT 1 + 1 AS resultado', (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta de prueba:', err);
            res.status(500).send('Error al conectar con la base de datos.');
        } else {
            console.log('Consulta de prueba ejecutada con éxito:', result);
            res.send('Conexión a la base de datos exitosa. Resultado: ' + result[0].resultado);
        }
    });
});

// Escucha en el puerto asignado por Render o 3000 en desarrollo local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

