const express = require('express');
const PalabraController = require('../controladores/palabraController');
const PalabraDao = require('../dao/palabraDao');
const ValidacionService = require('../servicios/validacionService');
const ApiService = require('../servicios/apiService');

const router = express.Router();

const palabraDao = new PalabraDao();
const validacionService = new ValidacionService();
const apiService = new ApiService();

const palabraController = new PalabraController(palabraDao, validacionService, apiService);

router.post('/palabras', palabraController.agregarPalabra.bind(palabraController));
router.get('/frase-completa', palabraController.listarFraseCompleta.bind(palabraController));
router.delete('/palabras/:id', palabraController.eliminarPalabra.bind(palabraController));
router.get('/informacion-palabras', palabraController.obtenerInformacionPalabras.bind(palabraController));
router.post('/palabras-aleatorias', palabraController.agregarPalabrasAleatorias.bind(palabraController));

module.exports = router;

