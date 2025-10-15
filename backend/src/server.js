const express = require('express');
const cors = require('cors');
const config = require('./config');
const searchRoutes = require('./searchRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', searchRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Search Backend API',
    version: '1.0.0',
    endpoints: {
      search: 'POST /api/search',
      health: 'GET /api/health'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(config.port, () => {
  const tenantInfo = config.fabric.tenantId ? config.fabric.tenantId.substring(0, 8) + '...' : 'N/A';
  const workspaceInfo = config.fabric.workspaceId ? config.fabric.workspaceId.substring(0, 8) + '...' : 'N/A';

  console.log(`
╔════════════════════════════════════════════════════════╗
║         Search Backend API                             ║
║                                                        ║
║  Server running on: http://localhost:${config.port}           ║
║  Data Source: Microsoft Fabric                        ║
║                                                        ║
║  Endpoints:                                            ║
║    POST /api/search    - Búsqueda de productos        ║
║    GET  /api/health    - Health check                 ║
║                                                        ║
║  Config:                                               ║
║    Tenant: ${tenantInfo.padEnd(39)}║
║    Workspace: ${workspaceInfo.padEnd(36)}║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
