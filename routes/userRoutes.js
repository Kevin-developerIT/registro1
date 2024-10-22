const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para registrar usuarios
router.post('/register', userController.registerUser);

module.exports = router;
