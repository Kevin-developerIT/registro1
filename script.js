document.getElementById('registerForm').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const attendance = document.getElementById('attendance').checked;
  
    if (!name || !company || !attendance) {
      e.preventDefault();
      alert('Todos los campos son obligatorios y se debe confirmar la asistencia.');
    }
  });
  