const Palabra = require('../modelos/palabraModelo');

class PalabraDao {
  constructor() {
    this.palabras = [];
  }

  agregarPalabra(palabra) {
    this.palabras.push(palabra);
  }

  eliminarPalabra(id) {
    this.palabras = this.palabras.filter(palabra => palabra.id !== id);
  }

  obtenerTodasLasPalabras() {
    return this.palabras;
  }
}

module.exports = PalabraDao;

