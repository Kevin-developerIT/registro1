const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Asegúrate de definir estas variables en tu .env
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;



