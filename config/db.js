const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  connectionLimit: 10,          // Limitar el número de conexiones simultáneas
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectTimeout: 10000,        // Aumenta el tiempo de espera de conexión a 10 segundos
  acquireTimeout: 10000,        // Tiempo máximo para obtener una conexión antes de fallar
  waitForConnections: true,     // Espera cuando no hay conexiones disponibles
  queueLimit: 0,                // Sin límite en la cola de conexiones
});

db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.');
  }
  throw err;
});

module.exports = db;


