#!/usr/bin/env python3
"""
Script de prueba para el endpoint del modelo de similitud
Requiere: pip install requests
"""

import requests
import json
import sys
from typing import Dict, List

# Configuración - Obtener estos valores de backend/.env
TENANT_ID = "YOUR_TENANT_ID"  # ⚠️ ACTUALIZAR desde .env
CLIENT_ID = "YOUR_CLIENT_ID"  # ⚠️ ACTUALIZAR desde .env
CLIENT_SECRET = "YOUR_CLIENT_SECRET"  # ⚠️ ACTUALIZAR desde .env
SCOPE = "https://api.fabric.microsoft.com/.default"
TOKEN_URL = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"
MODEL_ENDPOINT = "https://api.fabric.microsoft.com/v1/workspaces/YOUR_WORKSPACE_ID/mlmodels/YOUR_MODEL_ID/endpoint/versions/1/score"  # ⚠️ ACTUALIZAR

def get_token() -> str:
    """Obtiene el token de autenticación de Azure AD"""
    print("🔑 Obteniendo token de autenticación...")
    
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": SCOPE
    }
    
    try:
        response = requests.post(TOKEN_URL, data=data)
        response.raise_for_status()
        token_data = response.json()
        access_token = token_data.get("access_token")
        
        if not access_token:
            print("❌ Error: No se pudo obtener el token")
            print(json.dumps(token_data, indent=2))
            sys.exit(1)
        
        print("✅ Token obtenido exitosamente")
        print(f"Token (primeros 50 caracteres): {access_token[:50]}...")
        return access_token
    
    except requests.exceptions.RequestException as e:
        print(f"❌ Error al obtener token: {e}")
        sys.exit(1)

def search_products(token: str, queries: List[tuple]) -> List[Dict]:
    """Realiza búsqueda de productos"""
    print("\n🔍 Realizando búsqueda de productos...")
    
    payload = {
        "inputs": queries
    }
    
    print("\nPayload:")
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(MODEL_ENDPOINT, json=payload, headers=headers)
        response.raise_for_status()
        results = response.json()
        
        print("\n✅ Búsqueda completada exitosamente")
        return results
    
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Error en la búsqueda: {e}")
        if hasattr(e.response, 'text'):
            print(f"Respuesta del servidor: {e.response.text}")
        sys.exit(1)

def print_results(results: List[Dict]):
    """Imprime los resultados de manera legible"""
    print("\n" + "="*80)
    print("📊 RESULTADOS DE LA BÚSQUEDA")
    print("="*80)
    
    if not results:
        print("\n⚠️  No se encontraron resultados")
        return
    
    # Agrupar por query
    results_by_query = {}
    for result in results:
        query = result.get("query", "Unknown")
        if query not in results_by_query:
            results_by_query[query] = []
        results_by_query[query].append(result)
    
    # Imprimir resultados agrupados
    for query, query_results in results_by_query.items():
        print(f"\n🔎 Query: '{query}'")
        print(f"   Resultados encontrados: {len(query_results)}")
        print("   " + "-"*76)
        
        for i, result in enumerate(query_results, 1):
            score_percent = int(result.get("score", 0) * 100)
            print(f"\n   {i}. {result.get('name', 'N/A')}")
            print(f"      Nombre limpio: {result.get('name_clean', 'N/A')}")
            print(f"      Coincidencia: {score_percent}%")
            print(f"      Score: {result.get('score', 0):.4f}")
            print(f"      Índice: {result.get('idx', 'N/A')}")

def main():
    """Función principal"""
    print("="*80)
    print("🔍 TEST DEL MODELO DE SIMILITUD - MAKERS150")
    print("="*80)
    
    # Verificar CLIENT_ID
    if CLIENT_ID == "TU_CLIENT_ID_AQUI":
        print("\n⚠️  ADVERTENCIA: Debes actualizar el CLIENT_ID en el script")
        print("   Edita la variable CLIENT_ID con el valor obtenido de Azure AD")
        sys.exit(1)
    
    # Paso 1: Obtener token
    token = get_token()
    
    # Paso 2: Definir consultas de prueba
    test_queries = [
        ("cable usb c 1m", 5),
        ("cemento", 10),
        ("fierro", 3),
        ("audifonos bluetooth", 8),
        ("pintura", 6)
    ]
    
    # Paso 3: Realizar búsqueda
    results = search_products(token, test_queries)
    
    # Paso 4: Mostrar resultados
    print_results(results)
    
    print("\n" + "="*80)
    print("✅ Test completado exitosamente")
    print("="*80)

if __name__ == "__main__":
    main()
