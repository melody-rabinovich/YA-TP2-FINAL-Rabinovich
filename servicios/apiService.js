const axios = require('axios');

class ApiService {
  async obtenerPalabrasAleatorias(cantidad) {
    try {
      const response = await axios.get(`https://texto.deno.dev/palabras?cantidad=${cantidad}`);
      return response.data.palabras;
    } catch (error) {
      throw new Error('Error al obtener palabras aleatorias');
    }
  }
}

module.exports = ApiService;
