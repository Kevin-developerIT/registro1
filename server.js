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
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">¡Gracias por registrarte, ${nombre}!</h2>
                    <img src="URL_DE_TU_IMAGEN" alt="Imagen de Confirmación" style="width: 100%; height: auto; border-radius: 5px;"/>
                    <p style="color: #555;">Tu registro ha sido exitoso. Apreciamos que te hayas unido a nosotros.</p>
                    <p style="color: #555;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
                    <p style="text-align: center; color: #777;">Saludos cordiales,<br/>El equipo</p>
                </div>
            `,
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

