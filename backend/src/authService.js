const axios = require('axios');
const config = require('./config');

class AuthService {
  constructor() {
    this.token = null;
    this.tokenExpiry = 0;
    this.refreshTimer = null;
  }

  async getToken() {
    // Si el token es válido, devolverlo
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Solicitar nuevo token
    return await this.requestNewToken();
  }

  scheduleTokenRefresh() {
    // Cancelar timer anterior si existe
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    // Calcular cuándo refrescar (5 minutos antes de expirar)
    const refreshIn = this.tokenExpiry - Date.now() - (5 * 60 * 1000);

    if (refreshIn > 0) {
      console.log(`⏰ Token se renovará automáticamente en ${Math.round(refreshIn / 1000 / 60)} minutos`);
      this.refreshTimer = setTimeout(async () => {
        console.log('🔄 Renovando token automáticamente...');
        try {
          await this.requestNewToken();
        } catch (error) {
          console.error('Error renovando token automáticamente:', error.message);
        }
      }, refreshIn);
    }
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
      console.log(`📅 Token expira en ${Math.round((this.tokenExpiry - Date.now()) / 1000 / 60)} minutos`);

      // Programar renovación automática
      this.scheduleTokenRefresh();

      return this.token;
    } catch (error) {
      console.error('Error obteniendo token:', error.response?.data || error.message);
      throw new Error('No se pudo obtener el token de autenticación');
    }
  }

  clearToken() {
    this.token = null;
    this.tokenExpiry = 0;
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}

module.exports = new AuthService();
