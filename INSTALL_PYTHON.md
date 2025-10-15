# 🐍 Guía de Instalación de Python y pip en macOS

## Opción 1: Usar el Script sin pip (Recomendado)

Ya creé una versión del script que no requiere dependencias:

```bash
python3 test-endpoint-simple.py
```

✅ Este script usa solo la librería estándar de Python (sin necesidad de pip)

---

## Opción 2: Instalar pip con Homebrew (Recomendado)

### Paso 1: Instalar Homebrew (si no lo tienes)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Paso 2: Instalar Python con pip

```bash
brew install python3
```

Esto instalará Python 3 y pip3 automáticamente.

### Paso 3: Verificar instalación

```bash
python3 --version
pip3 --version
```

### Paso 4: Instalar requests

```bash
pip3 install requests
```

### Paso 5: Ejecutar el script completo

```bash
python3 test-endpoint.py
```

---

## Opción 3: Instalar pip manualmente

Si ya tienes Python 3 pero no pip:

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

Verifica:
```bash
pip3 --version
```

---

## Opción 4: Usar el script Bash (sin Python)

Si prefieres no usar Python, usa el script bash:

### Instalar jq (para procesar JSON)

```bash
brew install jq
```

### Ejecutar el script

```bash
chmod +x test-endpoint.sh
./test-endpoint.sh
```

---

## 🎯 Resumen de Opciones

| Opción | Requiere | Comando |
|--------|----------|---------|
| **1. Script Simple** | Solo Python 3 (ya instalado) | `python3 test-endpoint-simple.py` |
| **2. Script Completo** | Python 3 + pip + requests | `python3 test-endpoint.py` |
| **3. Script Bash** | bash + curl + jq | `./test-endpoint.sh` |

---

## ✅ Mejor Opción: Script Simple

Para evitar problemas, usa el script simple que ya creé:

```bash
cd /Users/joseph/Work/search

# 1. Editar el CLIENT_ID en el script
nano test-endpoint-simple.py
# o
code test-endpoint-simple.py

# 2. Ejecutar
python3 test-endpoint-simple.py
```

---

## 🐛 Troubleshooting

### Error: "python3: command not found"

Instalar Python:
```bash
brew install python3
```

### Error: "Permission denied"

```bash
chmod +x test-endpoint-simple.py
./test-endpoint-simple.py
```

O usar:
```bash
python3 test-endpoint-simple.py
```

### Error: "ModuleNotFoundError: No module named 'requests'"

Usar el script simple que no requiere requests:
```bash
python3 test-endpoint-simple.py
```

---

## 📝 Nota Importante

El archivo `test-endpoint-simple.py` que acabo de crear NO requiere pip ni dependencias externas. Solo usa la librería estándar de Python que ya viene instalada con Python 3.

Usa ese archivo para las pruebas. ✅
