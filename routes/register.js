const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para manejar el POST del formulario
router.post('/', (req, res) => {
  const { name, company, attendance } = req.body;
  const attendanceStatus = attendance === 'on' ? true : false;

  // Consulta para insertar datos en la base de datos
  const query = 'INSERT INTO registrations (name, company, attendance) VALUES (?, ?, ?)';

  db.query(query, [name, company, attendanceStatus], (err, result) => {
    if (err) {
      console.error('Error al registrar los datos:', err);
      res.send('Error al registrar los datos.');
    } else {
      res.send('Registro exitoso.');
    }
  });
});

module.exports = router;
