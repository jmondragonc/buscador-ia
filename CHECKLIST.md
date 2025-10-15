# ✅ Checklist de Configuración - Buscador Makers150

## 📋 Antes de Empezar

### Requisitos del Sistema
- [ ] macOS instalado
- [ ] Conexión a Internet activa
- [ ] Acceso a Azure Portal
- [ ] Permisos de administrador (para instalar software)

---

## 🔧 Instalación de Herramientas

### Verificar Instalaciones Existentes
```bash
node --version     # ¿Instalado? □ Sí □ No
npm --version      # ¿Instalado? □ Sí □ No
python3 --version  # ¿Instalado? □ Sí □ No
```

### Si Falta Alguna Herramienta
- [ ] Instalar Node.js desde https://nodejs.org (versión 18+)
- [ ] Instalar Angular CLI: `npm install -g @angular/cli@19`
- [ ] Python 3 ya viene con macOS (verificar con `python3 --version`)

---

## 🔑 Configuración de Azure AD

### Crear Aplicación
- [ ] Ir a https://portal.azure.com
- [ ] Navegar a **Azure Active Directory**
- [ ] Click en **App registrations**
- [ ] Click en **+ New registration**
- [ ] Nombre: `Makers150-Search-App`
- [ ] Tipo de cuenta: `Single tenant`
- [ ] Click en **Register**

### Obtener Credenciales
- [ ] Copiar **Application (client) ID**
- [ ] Guardar el ID en un lugar seguro
- [ ] Anotar aquí: `_______________________________________`

### Configurar Permisos
- [ ] Ir a **API permissions**
- [ ] Click en **+ Add a permission**
- [ ] Buscar **Power BI Service** o **Microsoft Fabric**
- [ ] Seleccionar permisos necesarios
- [ ] Click en **Grant admin consent**
- [ ] Confirmar que aparece el checkmark verde

---

## 📦 Configuración del Proyecto

### Instalación
```bash
cd /Users/joseph/Work/search
```

- [ ] Ejecutar: `npm install`
- [ ] Esperar a que termine (puede tomar 2-3 minutos)
- [ ] Verificar que no haya errores

### Configurar Variables de Entorno

#### Archivo 1: `src/environments/environment.ts`
- [ ] Abrir el archivo
- [ ] Buscar la línea: `clientId: '',`
- [ ] Reemplazar con: `clientId: 'TU_CLIENT_ID_AQUI',`
- [ ] Pegar el Client ID que copiaste de Azure
- [ ] Guardar el archivo

#### Archivo 2: `src/environments/environment.prod.ts`
- [ ] Abrir el archivo
- [ ] Hacer lo mismo que en environment.ts
- [ ] Guardar el archivo

---

## 🧪 Pruebas

### Opción A: Probar con Python (Recomendado)

#### Archivo: `test-endpoint-simple.py`
- [ ] Abrir el archivo
- [ ] Buscar: `CLIENT_ID = "TU_CLIENT_ID_AQUI"`
- [ ] Reemplazar con tu Client ID
- [ ] Guardar
- [ ] Ejecutar: `python3 test-endpoint-simple.py`
- [ ] Verificar que obtenga token ✅
- [ ] Verificar que muestre resultados ✅

### Opción B: Probar con Bash

- [ ] Instalar jq: `brew install jq`
- [ ] Abrir `test-endpoint.sh`
- [ ] Actualizar CLIENT_ID
- [ ] Guardar
- [ ] Dar permisos: `chmod +x test-endpoint.sh`
- [ ] Ejecutar: `./test-endpoint.sh`

---

## 🚀 Ejecución de la Aplicación

### Iniciar Servidor
- [ ] Ejecutar: `npm start`
- [ ] Esperar mensaje: `** Angular Live Development Server is listening...`
- [ ] Abrir navegador en: http://localhost:4200
- [ ] Verificar que la página cargue correctamente

### Pruebas en la Interfaz
- [ ] Ver el buscador centrado con gradiente púrpura
- [ ] Escribir "cable usb" en el buscador
- [ ] Esperar 300ms (debounce automático)
- [ ] Ver resultados que aparecen automáticamente
- [ ] Verificar porcentaje de coincidencia en cada resultado
- [ ] Probar navegación con flechas ↑↓
- [ ] Presionar Enter para seleccionar un resultado
- [ ] Verificar que el texto se copie al input

### Pruebas de Funcionalidad
- [ ] Búsqueda con "cemento"
- [ ] Búsqueda con "fierro"
- [ ] Búsqueda con "audifonos"
- [ ] Búsqueda con "pintura"
- [ ] Probar Escape para cerrar resultados
- [ ] Probar búsqueda vacía (debe limpiar resultados)

---

## 🐛 Troubleshooting

Si algo falla, revisa:

### Error: "clientId is empty"
- [ ] Verificar que actualizaste environment.ts
- [ ] Verificar que guardaste el archivo
- [ ] Reiniciar el servidor (`Ctrl+C` y luego `npm start`)

### Error: "401 Unauthorized"
- [ ] Verificar Client ID es correcto
- [ ] Verificar Client Secret es correcto
- [ ] Verificar permisos en Azure AD
- [ ] Verificar que diste admin consent

### Error: No aparecen resultados
- [ ] Abrir DevTools (F12 o Cmd+Option+I)
- [ ] Ver pestaña Console
- [ ] Ver pestaña Network
- [ ] Buscar errores en rojo
- [ ] Verificar que el endpoint está activo en Fabric

### Error: CORS
- [ ] Reiniciar con: `ng serve --proxy-config proxy.conf.json`

---

## 📊 Verificación Final

### Checklist de Funcionalidad
- [ ] ✅ La aplicación inicia sin errores
- [ ] ✅ El buscador está visible y funcional
- [ ] ✅ La búsqueda en tiempo real funciona
- [ ] ✅ Los resultados aparecen automáticamente
- [ ] ✅ El porcentaje de coincidencia se muestra
- [ ] ✅ La navegación con teclado funciona
- [ ] ✅ La selección de resultados funciona
- [ ] ✅ El diseño es responsive (probar en móvil)

### Checklist de Seguridad
- [ ] ✅ El Client Secret no está en el código (solo en environment.ts)
- [ ] ✅ Los archivos environment están en .gitignore
- [ ] ✅ El token se renueva automáticamente

---

## 🎉 ¡Configuración Completa!

Si todos los checkboxes están marcados, ¡felicitaciones! Tu buscador está listo para usar.

### Próximos Pasos
- [ ] Documentar cualquier configuración adicional específica
- [ ] Entrenar al equipo en el uso de la aplicación
- [ ] Configurar deployment en producción (si aplica)
- [ ] Configurar monitoreo y logs (si aplica)

---

## 📞 ¿Necesitas Ayuda?

Si algo no funcionó:

1. **Revisa los logs**: Consola del navegador y terminal
2. **Consulta la documentación**:
   - `QUICKSTART.md` - Guía rápida
   - `SETUP.md` - Guía detallada
   - `COMMANDS.md` - Lista de comandos
   - `INSTALL_PYTHON.md` - Problemas con Python
3. **Contacta a soporte**: Handytec

---

**Última actualización**: 2025-09-30  
**Versión**: 1.0
