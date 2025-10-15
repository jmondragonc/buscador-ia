#!/bin/bash

# Script de prueba para verificar el endpoint del modelo
# Asegúrate de tener jq instalado: brew install jq

echo "🔍 Test del Modelo de Similitud - Makers150"
echo "============================================="
echo ""

# Variables de configuración - Obtener estos valores de backend/.env
TENANT_ID="YOUR_TENANT_ID"  # ⚠️ ACTUALIZAR desde .env
CLIENT_ID="YOUR_CLIENT_ID"  # ⚠️ ACTUALIZAR desde .env
CLIENT_SECRET="YOUR_CLIENT_SECRET"  # ⚠️ ACTUALIZAR desde .env
SCOPE="https://api.fabric.microsoft.com/.default"
TOKEN_URL="https://login.microsoftonline.com/$TENANT_ID/oauth2/v2.0/token"
MODEL_ENDPOINT="https://api.fabric.microsoft.com/v1/workspaces/YOUR_WORKSPACE_ID/mlmodels/YOUR_MODEL_ID/endpoint/versions/1/score"  # ⚠️ ACTUALIZAR

echo "📍 Paso 1: Obteniendo token de autenticación..."
echo ""

# Obtener token
TOKEN_RESPONSE=$(curl -s -X POST "$TOKEN_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "scope=$SCOPE")

# Extraer access token
ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.access_token')

if [ "$ACCESS_TOKEN" == "null" ] || [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ Error al obtener token"
    echo "Respuesta:"
    echo $TOKEN_RESPONSE | jq '.'
    exit 1
fi

echo "✅ Token obtenido exitosamente"
echo "Token (primeros 50 caracteres): ${ACCESS_TOKEN:0:50}..."
echo ""

echo "📍 Paso 2: Realizando búsqueda de prueba..."
echo ""

# Crear payload de prueba
PAYLOAD='{
  "inputs": [
    ["cable usb c 1m", 5],
    ["cemento", 10],
    ["fierro", 3]
  ]
}'

echo "Payload de búsqueda:"
echo $PAYLOAD | jq '.'
echo ""

# Llamar al modelo
SEARCH_RESPONSE=$(curl -s -X POST "$MODEL_ENDPOINT" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

echo "📊 Resultados de la búsqueda:"
echo ""
echo $SEARCH_RESPONSE | jq '.'

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Prueba completada exitosamente"
else
    echo ""
    echo "❌ Error en la búsqueda"
fi
