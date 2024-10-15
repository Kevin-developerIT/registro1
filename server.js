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

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/register', (req, res) => {
    const { nombre, empresa, confirmacion } = req.body;

    // Validación simple
    if (!nombre || !empresa || !confirmacion) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Consulta SQL para insertar datos en la base de datos
    const sql = 'INSERT INTO registros (nombre, empresa, confirmacion) VALUES (?, ?, ?)';
    db.query(sql, [nombre, empresa, confirmacion], (err, result) => {
        if (err) throw err;
        console.log('Registro exitoso:', result);
        res.send('Registro enviado con éxito.');
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
