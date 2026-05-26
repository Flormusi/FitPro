# 🚀 Guía Paso a Paso: Configuración en Meta for Developers

Esta guía te llevará paso a paso para configurar tu bot de WhatsApp en Meta for Developers.

## 📋 Prerrequisitos

✅ Cuenta de Facebook/Meta  
✅ Número de teléfono verificado  
✅ Servidor backend ejecutándose (puerto 3000)  
✅ URL pública del servidor (ngrok, dominio propio, etc.)  

---

## 🎯 PASO 1: Crear Aplicación en Meta for Developers

### 1.1 Acceder a Meta for Developers
1. Ve a: **https://developers.facebook.com/**
2. Haz clic en **"Mis Apps"** (esquina superior derecha)
3. Inicia sesión con tu cuenta de Facebook/Meta

### 1.2 Crear Nueva Aplicación
1. Haz clic en **"Crear App"**
2. Selecciona **"Empresa"** como tipo de aplicación
3. Completa los datos:
   ```
   Nombre de la app: FitPro WhatsApp Bot
   Email de contacto: tu-email@ejemplo.com
   Propósito: Automatización de rutinas de fitness
   ```
4. Haz clic en **"Crear App"**

### 1.3 Configurar Información Básica
1. Ve a **Configuración > Básica**
2. Completa:
   ```
   Dominio de la app: tu-dominio.com (opcional)
   URL de política de privacidad: https://tu-dominio.com/privacy
   URL de términos de servicio: https://tu-dominio.com/terms
   ```
3. Guarda los cambios

**✅ CHECKPOINT:** Anota tu **App ID** - lo necesitarás más adelante

---

## 🔧 PASO 2: Configurar WhatsApp Business API

### 2.1 Agregar Producto WhatsApp
1. En el panel izquierdo, haz clic en **"+ Agregar producto"**
2. Busca **"WhatsApp"** y haz clic en **"Configurar"**
3. Selecciona **"WhatsApp Business API"**

### 2.2 Configuración Inicial
1. Ve a **WhatsApp > Introducción**
2. Verás el panel de configuración rápida
3. **NO hagas clic en "Enviar mensaje" todavía**

### 2.3 Obtener Credenciales Temporales
En la sección **"Enviar y recibir mensajes"**:

1. **Token de acceso temporal:**
   ```
   Copia el token que aparece (válido por 24 horas)
   Ejemplo: EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. **ID del número de teléfono:**
   ```
   Copia el Phone Number ID
   Ejemplo: 123456789012345
   ```

3. **Número de teléfono de prueba:**
   ```
   Aparece como: +1 555-0199 (ejemplo)
   ```

**✅ CHECKPOINT:** Guarda estos 3 valores en un lugar seguro

---

## 🌐 PASO 3: Configurar Webhook

### 3.1 Preparar URL del Webhook

**Opción A: Usando ngrok (para desarrollo)**
```bash
# En una nueva terminal
ngrok http 3000

# Copia la URL HTTPS que aparece
# Ejemplo: https://abc123.ngrok.io
```

**Opción B: Dominio propio**
```
Ejemplo: https://tu-dominio.com
```

### 3.2 Configurar Webhook en Meta
1. Ve a **WhatsApp > Configuración**
2. En la sección **"Webhook"**, haz clic en **"Configurar"**
3. Completa:
   ```
   URL de callback: https://tu-url.com/api/whatsapp/webhook
   Token de verificación: mi_token_secreto_123
   ```
4. Haz clic en **"Verificar y guardar"**

### 3.3 Verificar Webhook
**Si la verificación falla:**
1. Asegúrate de que tu servidor esté ejecutándose
2. Verifica que la URL sea accesible públicamente
3. Revisa los logs del servidor para errores

**✅ CHECKPOINT:** El webhook debe mostrar estado "Verificado" ✅

---

## 🔑 PASO 4: Configurar Variables de Entorno

### 4.1 Actualizar archivo .env
Edita `/backend/.env` con los valores obtenidos:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_VERIFY_TOKEN=mi_token_secreto_123
WHATSAPP_BUSINESS_ACCOUNT_ID=tu_business_account_id

# Bot Configuration
BOT_ENABLED=true
BOT_WELCOME_MESSAGE=¡Hola! 👋 Soy el asistente de FitPro.
```

### 4.2 Reiniciar Servidor
```bash
# En terminal del backend
npm run dev
# o
node server.js
```

---

## 📱 PASO 5: Configurar Número de Teléfono

### 5.1 Agregar Número de Prueba
1. Ve a **WhatsApp > Introducción**
2. En "Paso 1", haz clic en **"Agregar número de teléfono"**
3. Ingresa tu número personal (con código de país)
   ```
   Ejemplo: +54 9 11 1234-5678
   ```
4. Verifica el código SMS que recibas

### 5.2 Configurar Suscripciones
1. Ve a **WhatsApp > Configuración**
2. En **"Campos de webhook"**, selecciona:
   - ✅ messages
   - ✅ message_deliveries
   - ✅ message_reads
3. Haz clic en **"Guardar"**

**✅ CHECKPOINT:** Tu número debe aparecer en la lista de números verificados

---

## 🧪 PASO 6: Probar la Configuración

### 6.1 Ejecutar Script de Verificación
```bash
# En terminal del backend
node test-whatsapp-config.js
```

**Salida esperada:**
```
✅ Variables de entorno configuradas
✅ Conexión a WhatsApp API exitosa
✅ Webhook configurado correctamente
✅ Base de datos conectada
✅ Servicios del bot funcionando
```

### 6.2 Enviar Mensaje de Prueba
1. Ve a **WhatsApp > Introducción**
2. En "Paso 2", selecciona tu número verificado
3. Haz clic en **"Enviar mensaje"**
4. Deberías recibir el mensaje en WhatsApp

### 6.3 Probar Bot Completo
**Desde tu WhatsApp personal:**
1. Envía: `Hola`
2. Deberías recibir el mensaje de bienvenida del bot
3. Envía: `Quiero una rutina para perder peso, 3 días, principiante, solo pesas`
4. El bot debería generar una rutina personalizada

---

## 🔄 PASO 7: Obtener Token Permanente (Producción)

### 7.1 Crear Token de Larga Duración
1. Ve a **WhatsApp > Introducción**
2. Haz clic en **"Crear token permanente"**
3. Selecciona los permisos:
   - ✅ whatsapp_business_messaging
   - ✅ whatsapp_business_management
4. Copia el nuevo token

### 7.2 Actualizar Configuración
```env
# Reemplaza en .env
WHATSAPP_ACCESS_TOKEN=tu_token_permanente_aqui
```

---

## 🚨 Troubleshooting

### Problema: "Onboarding Failure - You have been temporarily blocked"
**Problema más común:** Meta bloquea temporalmente cuentas nuevas o con poca actividad.

**Soluciones:**
1. **Esperar 24-48 horas** y volver a intentar
2. **Verificar tu cuenta de Facebook:**
   - Asegúrate de tener una cuenta personal de Facebook activa
   - Completa la verificación de identidad si se solicita
   - Agrega un método de pago válido a tu cuenta

3. **Crear un Business Manager primero:**
   - Ve a business.facebook.com
   - Crea un Business Manager
   - Verifica tu negocio con documentos oficiales
   - Luego regresa a developers.facebook.com

4. **Contactar soporte de Meta:**
   - Ve a developers.facebook.com/support
   - Reporta el problema de "Onboarding blocked"
   - Incluye screenshots del error

### Problema: Webhook no se verifica
**Solución:**
```bash
# Verificar que el servidor esté ejecutándose
curl http://localhost:3000/api/health

# Verificar webhook manualmente
curl "https://tu-url.com/api/whatsapp/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=mi_token_secreto_123"
```

### Problema: No recibo mensajes
**Verificar:**
1. ✅ Webhook verificado y activo
2. ✅ Campos de webhook configurados (messages)
3. ✅ Token de acceso válido
4. ✅ Servidor ejecutándose sin errores

### Problema: Bot no responde
**Verificar:**
1. ✅ `BOT_ENABLED=true` en .env
2. ✅ Base de datos conectada
3. ✅ Logs del servidor para errores
4. ✅ Variables de entorno correctas

---

## 📊 Monitoreo

### Logs Importantes
```bash
# Ver logs en tiempo real
tail -f logs/app.log

# Buscar errores específicos
grep "ERROR" logs/app.log
grep "WhatsApp" logs/app.log
```

### Métricas a Monitorear
- ✅ Mensajes recibidos
- ✅ Mensajes enviados
- ✅ Errores de API
- ✅ Tiempo de respuesta
- ✅ Rutinas generadas

---

## 🎉 ¡Configuración Completa!

**Tu bot de WhatsApp está listo cuando:**
- ✅ Aplicación creada en Meta for Developers
- ✅ Webhook verificado y activo
- ✅ Variables de entorno configuradas
- ✅ Número de teléfono verificado
- ✅ Script de verificación pasa todas las pruebas
- ✅ Bot responde a mensajes de prueba

**Próximos pasos:**
1. Probar con diferentes tipos de rutinas
2. Monitorear logs y métricas
3. Configurar dominio personalizado para producción
4. Solicitar revisión de la app para uso público

---

## 📞 Soporte

**Si necesitas ayuda:**
1. Revisa los logs: `tail -f logs/app.log`
2. Ejecuta el script de verificación: `node test-whatsapp-config.js`
3. Consulta la documentación oficial: https://developers.facebook.com/docs/whatsapp

**¡Tu bot de WhatsApp para FitPro está listo para generar rutinas automáticamente!** 🚀