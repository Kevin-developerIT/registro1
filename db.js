const mysql = require('mysql');

// Crea una conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Asegúrate de que esto sea correcto
    user: process.env.DB_USER, // Tu usuario de la base de datos
    password: process.env.DB_PASS, // Tu contraseña de la base de datos
    database: process.env.DB_NAME // El nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Manejo de errores de conexión
db.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
});

// Exportar la conexión para usarla en otras partes del servidor
module.exports = db;

