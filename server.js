const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos

// Conectar a la base de datos MySQL en Hostinger
const db = mysql.createConnection({
  host: '193.203.166.181', // Cambia esto por el host de tu base de datos en Hostinger
  user: 'u943042028_admink',
  password: '#I5f+c^[;U',
  database: 'u943042028_registros'
});


db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL ');
  }
});

// Ruta para procesar el formulario de registro
app.post('/register', async (req, res) => {
  const { nombre, empresa, confirmacion, 'g-recaptcha-response': recaptchaToken } = req.body;

  // Validar reCAPTCHA
  const recaptchaSecret = '6LesOV0qAAAAAJTPEVS-okMMAepdfwTF32654K9y';
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(verifyUrl);
    const { success } = response.data;

    if (!success) {
      return res.status(400).json({ message: 'Falló la validación reCAPTCHA.' });
    }

    // Insertar datos en la base de datos
    const query = 'INSERT INTO registros (nombre, empresa, confirmacion) VALUES (?, ?, ?)';
    db.query(query, [nombre, empresa, confirmacion], (err, result) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        return res.status(500).json({ message: 'Error en el registro' });
      }
      res.status(200).json({ message: 'Registro exitoso' });
    });
  } catch (error) {
    console.error('Error al validar reCAPTCHA:', error);
    res.status(500).json({ message: 'Error al validar reCAPTCHA' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en https://registro1.onrender.com`);
});
