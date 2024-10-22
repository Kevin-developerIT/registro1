const mysql = require('mysql');

// Crear un pool de conexiones
const pool = mysql.createPool({
    connectionLimit: 10, // Puedes ajustar el límite según sea necesario
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión con la base de datos cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones en la base de datos.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexión a la base de datos rechazada.');
        }
    }

    if (connection) connection.release();
    return;
});

module.exports = pool;
