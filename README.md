# Buscador de Productos - Makers150

Aplicación Angular 19 con búsqueda en tiempo real usando el modelo de similitud TF-IDF de Microsoft Fabric.

## 🚀 Características

- ✨ Búsqueda en tiempo real con autocomplete
- 🔍 Sistema de similitud basado en TF-IDF
- ⚡ Debounce automático para optimizar llamadas
- 🎯 Navegación con teclado (flechas arriba/abajo, Enter, Escape)
- 📊 Visualización de porcentaje de coincidencia
- 🎨 Interfaz moderna y responsive
- 🔐 Autenticación automática con Azure AD

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Angular CLI 19

## 🔧 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Azure AD Application

**IMPORTANTE:** Antes de ejecutar la aplicación, debes crear una aplicación en Azure AD y obtener el `clientId`.

#### Pasos para obtener el clientId:

1. Ve a [Azure Portal](https://portal.azure.com)
2. Navega a **Azure Active Directory** > **App registrations**
3. Click en **New registration**
4. Nombre: `Makers150-Search-App`
5. Supported account types: **Accounts in this organizational directory only**
6. Click **Register**
7. Copia el **Application (client) ID** - este es tu `clientId`
8. Ve a **Certificates & secrets** y genera un nuevo client secret
9. Guarda el secret en `backend/.env`
10. Ve a **API permissions**
11. Click **Add a permission** > **APIs my organization uses**
12. Busca **Power BI Service** o **Microsoft Fabric**
13. Selecciona **Delegated permissions** o **Application permissions**
14. Agrega los permisos necesarios

### 3. Actualizar environment.ts

Edita `src/environments/environment.ts` y `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**NOTA**: Las credenciales están en el backend (`backend/.env`), no en el frontend.

## 🏃 Ejecutar la Aplicación

### Modo desarrollo

```bash
npm start
# o
ng serve
```

Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

### Modo producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/search/`.

## 📁 Estructura del Proyecto

```
search/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── search/
│   │   │       ├── search.component.ts      # Componente principal de búsqueda
│   │   │       ├── search.component.html    # Template del buscador
│   │   │       └── search.component.css     # Estilos del buscador
│   │   ├── services/
│   │   │   ├── auth.service.ts              # Servicio de autenticación Azure AD
│   │   │   └── search.service.ts            # Servicio de búsqueda con el modelo
│   │   ├── models/
│   │   │   └── search.model.ts              # Interfaces TypeScript
│   │   ├── app.component.ts                 # Componente raíz
│   │   └── app.config.ts                    # Configuración de la app
│   ├── environments/
│   │   ├── environment.ts                   # Variables de entorno (dev)
│   │   └── environment.prod.ts              # Variables de entorno (prod)
│   ├── index.html                           # HTML principal
│   ├── main.ts                              # Punto de entrada
│   └── styles.css                           # Estilos globales
├── angular.json                             # Configuración Angular
├── package.json                             # Dependencias npm
└── tsconfig.json                            # Configuración TypeScript
```

## 🔌 API del Modelo

### Endpoint

```
POST https://api.fabric.microsoft.com/v1/workspaces/90c5a484-ec91-4525-aad7-440f3403da38/mlmodels/9fef5bb0-b9f3-4da9-8515-f904a4511d3f/endpoint/versions/1/score
```

### Request Format

```json
{
  "inputs": [
    ["cable usb c 1m", 5],
    ["cemento", 10]
  ]
}
```

Donde:
- Primer elemento: query de búsqueda (string)
- Segundo elemento: número de resultados a retornar (k)

### Response Format

```json
[
  {
    "query": "cable usb c 1m",
    "idx": 123,
    "name": "Cable USB-C 1 Metro",
    "name_clean": "cable usb c 1 metro",
    "score": 0.95
  },
  ...
]
```

## 🎯 Uso de la Aplicación

1. **Escribir consulta**: Comienza a escribir el nombre del producto
2. **Ver resultados**: Los resultados aparecen automáticamente con un debounce de 300ms
3. **Navegar**: Usa las flechas ↑↓ para navegar por los resultados
4. **Seleccionar**: Presiona Enter o haz click para seleccionar un resultado
5. **Cerrar**: Presiona Escape para cerrar los resultados

### Ejemplos de búsqueda

- "cable usb"
- "cemento"
- "fierro"
- "audifonos bluetooth"

## 🔐 Autenticación

La aplicación usa OAuth 2.0 Client Credentials Flow:

1. Al iniciar, obtiene un token de Azure AD
2. El token se renueva automáticamente antes de expirar
3. Cada request al modelo incluye el token en el header `Authorization: Bearer {token}`

## 🛠️ Troubleshooting

### Error: "clientId is empty"

Asegúrate de haber actualizado el `clientId` en `src/environments/environment.ts`.

### Error: "401 Unauthorized"

Verifica que:
- El `clientId` y `clientSecret` sean correctos
- La aplicación Azure AD tenga los permisos necesarios
- El token no haya expirado

### Error: "CORS"

Si ejecutas desde localhost, es posible que necesites configurar CORS en tu aplicación Azure AD o usar un proxy.

### No aparecen resultados

Verifica que:
- El endpoint del modelo esté activo
- La query tenga al menos un carácter
- El modelo tenga datos en el catálogo

## 📚 Tecnologías Utilizadas

- **Angular 19**: Framework principal
- **RxJS**: Manejo de observables y programación reactiva
- **TypeScript**: Lenguaje de programación
- **Azure AD OAuth**: Autenticación
- **Microsoft Fabric**: Modelo de ML TF-IDF

## 📄 Licencia

Este proyecto es confidencial y pertenece a HandytecMobi S.A. para el cliente Makers150.

## 👥 Contacto

Para soporte o consultas, contacta al equipo de desarrollo de Handytec.

---

**Desarrollado por Handytec** - Powered by Business IT
