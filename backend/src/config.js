require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  fabric: {
    tenantId: process.env.TENANT_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE,
    tokenUrl: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    workspaceId: process.env.WORKSPACE_ID,
    modelId: process.env.MODEL_ID,
    endpointVersion: process.env.ENDPOINT_VERSION,
    apiBaseUrl: 'https://api.fabric.microsoft.com'
  }
};
