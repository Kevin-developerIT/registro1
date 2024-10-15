const mysql = require('mysql');

let connection;

function handleConnection() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ', err);
      setTimeout(handleConnection, 2000); // Intenta reconectar después de 2 segundos
    } else {
      console.log('Conexión a la base de datos MySQL exitosa');
    }
  });

  connection.on('error', (err) => {
    console.error('Error en la conexión: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection(); // Reconectar si la conexión se pierde
    } else {
      throw err; // Lanza otro tipo de errores
    }
  });
}

// Iniciar la conexión
handleConnection();
