# 🚀 GUÍA PASO A PASO: Deploy en Netlify

## ✅ **OPCIÓN 1: Deploy desde GitHub (Recomendado)**

### 1. Subir código a GitHub:
```bash
# En tu carpeta del proyecto frontend
git init
git add .
git commit -m "Initial commit - Bazar Universal PWA"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/bazar-universal.git
git push -u origin main
```

### 2. Conectar con Netlify:
1. Ve a: https://netlify.com
2. **Sign up** con tu cuenta de GitHub
3. Click **"New site from Git"**
4. Selecciona **GitHub** como provider
5. Busca y selecciona tu repositorio **"bazar-universal"**
6. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 3. Variables de entorno en Netlify:
1. En tu dashboard de Netlify → **Site settings**
2. **Environment variables** → **Add variable**:
   ```
   VITE_API_URL = https://tu-api-render.onrender.com/api/v1
   ```

---

## ✅ **OPCIÓN 2: Deploy Manual (Más rápido para pruebas)**

### 1. Build del proyecto:
```bash
npm run build
```

### 2. Deploy manual:
1. Ve a: https://netlify.com/drop
2. **Arrastra la carpeta `dist`** que se generó
3. ¡Listo! Te dará una URL temporal

---

## 🔗 **PASO 5: Conectar con tu API en Render**

### Cuando tu API esté lista en Render:

1. **Copia la URL** de tu API en Render (algo como: `https://bazar-api-xyz.onrender.com`)

2. **Actualiza la URL** en tu código:
   - En Netlify: Variables de entorno → `VITE_API_URL`
   - O edita directamente en `apiService.js`

3. **Actualiza CORS** en tu API en Render:
   ```
   CORS_ORIGINS=["https://tu-app.netlify.app", "http://localhost:5174"]
   ```

---

## 🧪 **TESTING Final**

### URLs que tendrás:
- 🌐 **Frontend**: `https://tu-app.netlify.app`
- 🔌 **API**: `https://tu-api.onrender.com`
- 📚 **API Docs**: `https://tu-api.onrender.com/docs`

### Pruebas a realizar:
- [ ] Búsqueda de productos funciona
- [ ] Detalle de producto funciona  
- [ ] Agregar compra funciona
- [ ] Historial de compras funciona
- [ ] PWA es instalable

---

## 🆘 **Solución de problemas comunes**

### Error de CORS:
```javascript
// Verifica que tu API tenga:
CORS_ORIGINS=["https://tu-app.netlify.app"]
```

### Error 404 en rutas:
- ✅ Ya está solucionado con `netlify.toml`

### Error de build:
```bash
# Asegúrate de tener:
npm install
npm run build
```

---

**¡Tu PWA estará lista en producción! 🎉**
