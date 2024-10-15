document.getElementById('registroForm').addEventListener('submit', function(event) {
    // Obtén los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const confirmacion = document.getElementById('confirmacion').value;
    const recaptchaResponse = grecaptcha.getResponse();
  
    // Mensaje de error
    const mensajeError = document.getElementById('mensajeError');
  
    // Validaciones
    if (nombre === '' || empresa === '') {
      mensajeError.textContent = 'Por favor, completa todos los campos.';
      event.preventDefault(); // Detiene el envío del formulario
      return;
    }
  
    // Validar que se haya completado el reCAPTCHA
    if (recaptchaResponse.length === 0) {
      mensajeError.textContent = 'Por favor, completa la validación reCAPTCHA.';
      event.preventDefault(); // Detiene el envío del formulario
      return;
    }
  
    // Si todas las validaciones son correctas, se envía el formulario
    mensajeError.textContent = '';
  });
  


  