const express = require('express');
const axios = require('axios');
const authService = require('./authService');
const config = require('./config');

const router = express.Router();

// Endpoint para búsqueda
router.post('/search', async (req, res) => {
  try {
    const { query, k = 10 } = req.body;

    if (!query || query.trim().length === 0) {
      return res.json([]);
    }

    console.log(`Búsqueda: "${query}" (k=${k})`);

    // Obtener token de autenticación
    const token = await authService.getToken();

    // URL del endpoint de Microsoft Fabric (con /score al final según documentación)
    const endpoint = `${config.fabric.apiBaseUrl}/v1/workspaces/${config.fabric.workspaceId}/mlmodels/${config.fabric.modelId}/endpoint/versions/${config.fabric.endpointVersion}/score`;

    const payload = {
      inputs: [[query.trim(), k]]
    };

    console.log('Endpoint:', endpoint);
    console.log('Payload:', JSON.stringify(payload));

    const response = await axios.post(endpoint, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Fabric devuelve un objeto con predictions como array de arrays
    let rawResults = response.data;

    // Log para debug
    console.log('Respuesta de Fabric (tipo):', typeof rawResults);
    console.log('Respuesta de Fabric (estructura):', JSON.stringify(rawResults).substring(0, 200));

    // Extraer predictions
    let predictions = rawResults.predictions || rawResults.outputs || rawResults.results || rawResults;

    // Convertir array de arrays a array de objetos
    // Formato: [query, idx, name, name_clean, score]
    const results = predictions.map(row => ({
      query: row[0],
      idx: row[1],
      name: row[2],
      name_clean: row[3],
      score: row[4]
    }));

    // Ya vienen ordenados por score descendente desde Fabric, pero por si acaso
    results.sort((a, b) => b.score - a.score);

    console.log(`✓ Resultados encontrados: ${results.length}`);
    res.json(results);
  } catch (error) {
    console.error('Error en búsqueda:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error al realizar la búsqueda',
      message: error.response?.data?.message || error.message
    });
  }
});

// Endpoint de health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
