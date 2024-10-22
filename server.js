const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Asegúrate de que esto apunta a tu archivo db.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia esto si usas otro servicio
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo
    },
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { nombre, apellido, correo } = req.body;
    const query = 'INSERT INTO users (nombre, apellido, correo) VALUES (?, ?, ?)';
    
    db.query(query, [nombre, apellido, correo], (err) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).send('Error al registrar el usuario.');
        }

        // Enviar correo de confirmación
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Confirmación de registro',
            text: `Hola ${nombre},\n\nGracias por registrarte. Tu registro ha sido exitoso.`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send('Error al enviar el correo de confirmación.');
            }

            res.status(200).send('Registro exitoso y correo enviado.');
        });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
