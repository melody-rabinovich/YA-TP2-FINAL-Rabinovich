const Palabra = require('../modelos/palabraModelo');

class PalabraController {
  constructor(palabraDao, validacionService, apiService) {
    this.palabraDao = palabraDao;
    this.validacionService = validacionService;
    this.apiService = apiService;
  }

  agregarPalabra(req, res) {
    const palabra = req.body.palabra;

    if (!this.validacionService.validarPalabra(palabra)) {
      return res.status(422).json({ mensaje: 'Palabra no válida' });
    }

    const nuevaPalabra = new Palabra(Date.now(), palabra);
    this.palabraDao.agregarPalabra(nuevaPalabra);

    return res.status(200).json({ mensaje: 'Palabra agregada correctamente' });
  }

  listarFraseCompleta(req, res) {
    const palabras = this.palabraDao.obtenerTodasLasPalabras();
    const frase = palabras.map(palabra => palabra.palabra).join(' ');

    return res.status(200).json({ frase });
  }

  eliminarPalabra(req, res) {
    const id = parseInt(req.params.id);

    const palabra = this.palabraDao.obtenerTodasLasPalabras().find(palabra => palabra.id === id);

    if (!palabra) {
      return res.status(404).json({ mensaje: 'Palabra no encontrada' });
    }

    this.palabraDao.eliminarPalabra(id);

    return res.status(200).json({ mensaje: 'Palabra eliminada correctamente' });
  }

  async obtenerInformacionPalabras(req, res) {
    const palabras = this.palabraDao.obtenerTodasLasPalabras().map(palabra => palabra.palabra);
    const informacionPalabras = {};

    for (const palabra of palabras) {
      if (!informacionPalabras.hasOwnProperty(palabra)) {
        informacionPalabras[palabra] = 0;
      }
      informacionPalabras[palabra]++;
    }

    return res.status(200).json(informacionPalabras);
  }

  async agregarPalabrasAleatorias(req, res) {
    const cantidad = parseInt(req.body.cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(422).json({ mensaje: 'Cantidad inválida' });
    }

    try {
      const palabrasAleatorias = await this.apiService.obtenerPalabrasAleatorias(cantidad);

      for (const palabra of palabrasAleatorias) {
        const nuevaPalabra = new Palabra(Date.now(), palabra);
        this.palabraDao.agregarPalabra(nuevaPalabra);
      }

      return res.status(200).json({ mensaje: 'Palabras aleatorias agregadas correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener palabras aleatorias' });
    }
  }
}

module.exports = PalabraController;
