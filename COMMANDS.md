# 🚀 Comandos Rápidos - Buscador Makers150

## 📍 Ubicación del Proyecto
```bash
cd /Users/joseph/Work/search
```

## 📦 Instalación

```bash
# Instalar dependencias de Node
npm install

# Si hay errores, limpiar cache
rm -rf node_modules package-lock.json
npm install
```

## ⚙️ Configuración Requerida

### 1. Obtener Client ID de Azure AD

```
https://portal.azure.com
→ Azure Active Directory
→ App registrations
→ New registration
→ Copiar Application (client) ID
```

### 2. Actualizar environment.ts

```bash
# Abrir archivo de configuración
code src/environments/environment.ts

# O con nano
nano src/environments/environment.ts

# Actualizar la línea:
clientId: 'PEGAR_TU_CLIENT_ID_AQUI',
```

## 🏃 Ejecutar la Aplicación

```bash
# Iniciar servidor de desarrollo
npm start

# O con Angular CLI
ng serve

# Con puerto específico
ng serve --port 4201

# Con proxy (para CORS)
ng serve --proxy-config proxy.conf.json
```

Abrir en navegador: **http://localhost:4200**

## 🧪 Probar el Endpoint

### Opción 1: Python Simple (SIN pip) ⭐ RECOMENDADO

```bash
# 1. Editar el CLIENT_ID en el archivo
nano test-endpoint-simple.py

# 2. Ejecutar
python3 test-endpoint-simple.py
```

### Opción 2: Python Completo (CON pip + requests)

```bash
# Instalar pip si no lo tienes
brew install python3

# Instalar requests
pip3 install requests

# Editar CLIENT_ID
nano test-endpoint.py

# Ejecutar
python3 test-endpoint.py
```

### Opción 3: Bash Script

```bash
# Instalar jq
brew install jq

# Editar CLIENT_ID
nano test-endpoint.sh

# Dar permisos de ejecución
chmod +x test-endpoint.sh

# Ejecutar
./test-endpoint.sh
```

## 🔨 Build para Producción

```bash
# Build
npm run build

# Archivos generados en:
# dist/search/browser/
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Error: "Port 4200 is already in use"
```bash
# Encontrar proceso usando el puerto
lsof -ti:4200

# Matar el proceso
kill -9 $(lsof -ti:4200)

# O usar otro puerto
ng serve --port 4201
```

### Error: "pip: command not found"
```bash
# Usar el script simple que no requiere pip
python3 test-endpoint-simple.py

# O instalar pip
brew install python3
```

### Error: "jq: command not found"
```bash
brew install jq
```

### Error: "401 Unauthorized"
```bash
# Verificar clientId en:
cat src/environments/environment.ts

# Verificar permisos en Azure AD:
# Portal → Tu App → API permissions → Grant admin consent
```

### Error: CORS
```bash
# Usar proxy
ng serve --proxy-config proxy.conf.json
```

## 📝 Verificar Configuración

```bash
# Ver versión de Node
node --version

# Ver versión de npm
npm --version

# Ver versión de Angular CLI
ng version

# Ver versión de Python
python3 --version

# Ver estructura del proyecto
tree -L 3 -I 'node_modules'
```

## 🔍 Buscar en la Aplicación

Una vez que la aplicación esté corriendo, prueba con estas búsquedas:

```
cable usb
cemento
fierro
audifonos bluetooth
pintura
```

## 📂 Archivos Importantes

```bash
# Configuración de ambiente
src/environments/environment.ts
src/environments/environment.prod.ts

# Servicio de búsqueda
src/app/services/search.service.ts

# Servicio de autenticación
src/app/services/auth.service.ts

# Componente principal
src/app/components/search/search.component.ts

# Tests
test-endpoint-simple.py    # Python sin dependencias ⭐
test-endpoint.py           # Python con requests
test-endpoint.sh           # Bash script
```

## 🎯 Flujo Completo de Inicio

```bash
# 1. Navegar al proyecto
cd /Users/joseph/Work/search

# 2. Instalar dependencias
npm install

# 3. Obtener Client ID de Azure Portal
# (Ver instrucciones en SETUP.md)

# 4. Actualizar environment.ts
nano src/environments/environment.ts

# 5. Ejecutar
npm start

# 6. Abrir navegador
open http://localhost:4200
```

## 🚀 Atajos de Teclado en la App

```
↑ ↓         Navegar resultados
Enter       Seleccionar resultado
Escape      Cerrar resultados
```

## 📊 Monitoreo

```bash
# Ver logs en tiempo real
# (Abrir DevTools del navegador: Cmd + Option + I)

# Ver errores de compilación
# (En la terminal donde ejecutaste npm start)
```

## 🔄 Reiniciar Servicios

```bash
# Detener servidor (Ctrl + C)
# Luego reiniciar:
npm start
```

## 📧 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12 o Cmd + Option + I)
2. Revisa los logs de la terminal
3. Consulta SETUP.md para configuración detallada
4. Consulta INSTALL_PYTHON.md si hay problemas con Python

---

**¡Listo para usar! 🎉**
