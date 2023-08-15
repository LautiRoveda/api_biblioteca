const mongoose = require('mongoose');
const uri = 'mongodb://localhost:3000/nombre-de-la-base-de-datos'; // Reemplaza con tu cadena de conexión válida

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(error => {
    console.error('Error en la conexión a la base de datos:', error);
  });
