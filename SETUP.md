# Guía de Configuración Completa - Buscador Makers150

## 📋 Tabla de Contenidos

1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Configuración de Azure AD](#configuración-de-azure-ad)
3. [Instalación del Proyecto](#instalación-del-proyecto)
4. [Configuración de Variables](#configuración-de-variables)
5. [Pruebas](#pruebas)
6. [Despliegue](#despliegue)
7. [Solución de Problemas](#solución-de-problemas)

---

## 1. Requisitos del Sistema

### Software Necesario

- **Node.js**: versión 18.x o superior
- **npm**: versión 9.x o superior
- **Angular CLI**: versión 19.x
- **Git**: para control de versiones

### Verificar instalaciones

```bash
node --version    # debe mostrar v18.x.x o superior
npm --version     # debe mostrar 9.x.x o superior
ng version        # debe mostrar Angular CLI 19.x.x
```

### Instalar Angular CLI (si no está instalado)

```bash
npm install -g @angular/cli@19
```

---

## 2. Configuración de Azure AD

### Paso 1: Crear Aplicación en Azure Portal

1. Ir a https://portal.azure.com
2. Navegar a **Azure Active Directory**
3. Seleccionar **App registrations** en el menú lateral
4. Click en **+ New registration**

### Paso 2: Configurar la Aplicación

**Información básica:**
- **Name**: `Makers150-Search-App` (o el nombre que prefieras)
- **Supported account types**: `Accounts in this organizational directory only (Single tenant)`
- **Redirect URI**: Dejar vacío por ahora (no es necesario para Client Credentials Flow)

Click en **Register**

### Paso 3: Obtener Credenciales

#### a) Application (client) ID

1. En la página de la aplicación recién creada
2. Copiar el valor de **Application (client) ID**
3. **GUARDAR ESTE VALOR** - lo necesitarás para `environment.ts`

#### b) Client Secret

Si necesitas generar un nuevo client secret:
1. Ir a **Certificates & secrets**
2. Click en **+ New client secret**
3. Descripción: `Makers150 Search Secret`
4. Expires: Seleccionar duración apropiada
5. Click en **Add**
6. **COPIAR EL VALOR INMEDIATAMENTE** (solo se muestra una vez)

### Paso 4: Configurar Permisos de API

1. Ir a **API permissions**
2. Click en **+ Add a permission**
3. Seleccionar **APIs my organization uses**
4. Buscar **Power BI Service** o **Fabric**
5. Seleccionar **Application permissions**
6. Agregar los siguientes permisos:
   - `Workspace.Read.All`
   - `Model.Execute.All`
   - O los permisos específicos que requiera tu organización
7. Click en **Add permissions**
8. Click en **Grant admin consent for [Your Organization]**
9. Confirmar

### Paso 5: Verificar Tenant ID

El Tenant ID ya está configurado: `90c5a484-ec91-4525-aad7-440f3403da38`

Para verificar o encontrarlo:
1. En Azure AD, ir a **Overview**
2. Buscar **Tenant ID**
3. Confirmar que coincida con el valor configurado

---

## 3. Instalación del Proyecto

### Clonar o navegar al proyecto

```bash
cd /Users/joseph/Work/search
```

### Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en `package.json`.

---

## 4. Configuración de Variables

### Archivo: `src/environments/environment.ts`

Abrir el archivo y actualizar el `clientId`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**NOTA**: Las credenciales ya no están en el frontend por seguridad. Están en `backend/.env`

### Archivo: `src/environments/environment.prod.ts`

Hacer lo mismo para el ambiente de producción.

---

## 5. Pruebas

### Prueba 1: Compilación

```bash
npm run build
```

Debe compilar sin errores.

### Prueba 2: Servidor de Desarrollo

```bash
npm start
```

- Debe iniciar en http://localhost:4200
- Abrir en navegador
- Verificar que no haya errores en la consola

### Prueba 3: Test del Endpoint (Bash)

Si tienes `curl` y `jq` instalados:

```bash
chmod +x test-endpoint.sh
./test-endpoint.sh
```

**Nota**: Antes de ejecutar, actualizar el `CLIENT_ID` en `test-endpoint.sh`

### Prueba 4: Test Manual

1. Abrir la aplicación en http://localhost:4200
2. Escribir en el buscador: "cable usb"
3. Verificar que aparezcan resultados
4. Probar navegación con teclado
5. Probar selección de resultados

---

## 6. Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/search/browser/`.

### Opciones de Despliegue

#### Opción 1: Azure Static Web Apps

1. Crear recurso de Static Web App en Azure
2. Conectar con el repositorio Git
3. Configurar build:
   - Build command: `npm run build`
   - Output folder: `dist/search/browser`

#### Opción 2: Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/search/dist/search/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Opción 3: Apache

```apache
<VirtualHost *:80>
    ServerName tu-dominio.com
    DocumentRoot /var/www/search/dist/search/browser

    <Directory /var/www/search/dist/search/browser>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

---

## 7. Solución de Problemas

### Problema 1: "clientId is empty" o undefined

**Causa**: No se actualizó el clientId en environment.ts

**Solución**:
1. Abrir `src/environments/environment.ts`
2. Actualizar el valor de `clientId` con el obtenido de Azure AD
3. Guardar y reiniciar el servidor de desarrollo

### Problema 2: Error 401 Unauthorized

**Causa**: Credenciales incorrectas o falta de permisos

**Solución**:
1. Verificar que `clientId` y `clientSecret` sean correctos
2. Confirmar que la aplicación Azure AD tenga permisos de API configurados
3. Verificar que se haya dado "admin consent" a los permisos
4. Comprobar que el tenant ID sea correcto

### Problema 3: CORS Error

**Causa**: Restricciones de CORS desde localhost

**Soluciones**:

#### Opción A: Usar un proxy (desarrollo)
Crear `proxy.conf.json`:

```json
{
  "/api": {
    "target": "https://api.fabric.microsoft.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

Actualizar `angular.json`:
```json
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}
```

#### Opción B: Configurar CORS en Azure
Contactar al administrador de Azure para permitir el dominio.

### Problema 4: No aparecen resultados

**Causa**: Endpoint inactivo o catálogo vacío

**Solución**:
1. Verificar en Microsoft Fabric que el endpoint esté activo
2. Verificar que el modelo tenga datos en el catálogo
3. Probar con el script `test-endpoint.sh`
4. Revisar la consola del navegador para errores específicos

### Problema 5: Búsqueda muy lenta

**Causa**: Debounce muy corto o catálogo muy grande

**Solución**:
Ajustar el debounce en `search.service.ts`:

```typescript
debounceTime(500) // Aumentar de 300 a 500ms
```

### Problema 6: Token expirado

**Causa**: El token tiene una duración limitada

**Solución**:
El servicio ya maneja la renovación automática, pero si persiste:

1. Verificar que `tokenExpiry` se esté calculando correctamente
2. Revisar la lógica en `auth.service.ts`
3. Agregar logs para debug:

```typescript
console.log('Token expiry:', new Date(this.tokenExpiry));
console.log('Current time:', new Date(Date.now()));
```

### Problema 7: Error de compilación TypeScript

**Causa**: Incompatibilidad de versiones

**Solución**:
```bash
npm install --legacy-peer-deps
```

O actualizar las versiones en `package.json` según las recomendaciones.

---

## 📞 Contacto y Soporte

Si encuentras problemas no cubiertos en esta guía:

1. Revisar los logs de la consola del navegador (F12)
2. Revisar los logs del servidor de desarrollo
3. Contactar al equipo de Handytec
4. Revisar la documentación de Microsoft Fabric

---

## 📚 Referencias

- [Angular Documentation](https://angular.io/docs)
- [Microsoft Fabric REST API](https://learn.microsoft.com/en-us/rest/api/fabric/)
- [Azure AD OAuth 2.0](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
- [RxJS Documentation](https://rxjs.dev/)

---

**Última actualización**: 2025-09-30  
**Versión**: 1.0  
**Autor**: Handytec - Isaid Valenzuela
