# 🚀 Quick Start - Buscador Makers150

## Pasos Rápidos (5 minutos)

### 1️⃣ Obtener Client ID de Azure AD

1. Ve a https://portal.azure.com
2. Azure Active Directory → App registrations → New registration
3. Nombre: `Makers150-Search-App`
4. Register
5. **COPIA el Application (client) ID** ← Lo necesitas ahora

### 2️⃣ Configurar el Proyecto

```bash
cd /Users/joseph/Work/search

# Instalar dependencias
npm install

# Abrir archivo de configuración
code src/environments/environment.ts
```

### 3️⃣ Pegar el Client ID

En `src/environments/environment.ts`, actualizar esta línea:

```typescript
clientId: 'PEGAR_AQUI_TU_CLIENT_ID', // ← Pegar el ID que copiaste
```

### 4️⃣ Ejecutar

```bash
npm start
```

Abrir http://localhost:4200 🎉

---

## ⚠️ Si hay errores

### Error: "401 Unauthorized"

Necesitas configurar permisos en Azure AD:

1. Azure Portal → Tu aplicación → API permissions
2. Add permission → APIs my organization uses
3. Buscar "Power BI" o "Fabric"
4. Application permissions → Seleccionar permisos necesarios
5. Grant admin consent

### Error: CORS

Ejecutar con proxy (archivo ya incluido):

```bash
ng serve --proxy-config proxy.conf.json
```

---

## 📝 Probar el Endpoint Directamente

### Opción A: Con Python

```bash
# Actualizar CLIENT_ID en test-endpoint.py primero
python3 test-endpoint.py
```

### Opción B: Con Bash (requiere curl y jq)

```bash
# Actualizar CLIENT_ID en test-endpoint.sh primero
chmod +x test-endpoint.sh
./test-endpoint.sh
```

---

## 🎯 Uso de la Aplicación

1. **Escribir**: "cable usb" en el buscador
2. **Ver**: Resultados automáticos con porcentaje de coincidencia
3. **Navegar**: Flechas ↑↓ del teclado
4. **Seleccionar**: Enter o click

---

## 📚 Más Información

- **Guía completa**: Ver `SETUP.md`
- **Documentación**: Ver `README.md`
- **Problemas**: Ver sección "Troubleshooting" en `SETUP.md`

---

## 🔑 Credenciales

Todas las credenciales están configuradas en `backend/.env` (archivo gitignored).

**Para desarrollo local**: Copia `backend/.env.example` a `backend/.env` y completa los valores.
