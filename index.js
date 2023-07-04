const express = require('express');
const enrutador = require('./router/palabraRoute');

const app = express();

app.use(express.json());

app.use('/', enrutador);

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
