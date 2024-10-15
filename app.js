require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register');



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas
app.use('/register', registerRoutes);

const express = require('express');
const app = express();

// Configuración del puerto (Render proporciona automáticamente el puerto)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});