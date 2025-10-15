const axios = require('axios');
const config = require('./config');

class AuthService {
  constructor() {
    this.token = null;
    this.tokenExpiry = 0;
  }

  async getToken() {
    // Si el token es válido, devolverlo
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Solicitar nuevo token
    return await this.requestNewToken();
  }

  async requestNewToken() {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', config.fabric.clientId);
      params.append('client_secret', config.fabric.clientSecret);
      params.append('scope', config.fabric.scope);

      const response = await axios.post(config.fabric.tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.token = response.data.access_token;
      // Establecer expiración con un margen de 5 minutos
      this.tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

      console.log('✓ Token obtenido exitosamente');
      return this.token;
    } catch (error) {
      console.error('Error obteniendo token:', error.response?.data || error.message);
      throw new Error('No se pudo obtener el token de autenticación');
    }
  }

  clearToken() {
    this.token = null;
    this.tokenExpiry = 0;
  }
}

module.exports = new AuthService();
