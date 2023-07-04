class ValidacionService {
  validarPalabra(palabra) {
    return /^[a-zA-Z]+$/.test(palabra);
  }
}

module.exports = ValidacionService;
