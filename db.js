const mysql = require('mysql');
let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    connection.connect(function(err) {
        if (err) {
            console.log('Error al conectar a la base de datos:', err);
            setTimeout(handleDisconnect, 2000); // Intentar reconectar después de 2 segundos
        }
    });

    connection.on('error', function(err) {
        console.log('Error en la conexión a la base de datos:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // Si la conexión se pierde, se vuelve a reconectar
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
