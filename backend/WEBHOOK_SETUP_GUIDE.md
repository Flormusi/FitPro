# Guía de Configuración del Webhook de WhatsApp Business API

Esta guía te llevará paso a paso para configurar el webhook de WhatsApp Business API en Meta for Developers.

## 📋 Prerrequisitos

- [ ] Cuenta de Facebook/Meta
- [ ] Servidor con HTTPS habilitado (para producción)
- [ ] Para desarrollo local: ngrok o similar para exponer tu servidor
- [ ] Variables de entorno configuradas en el archivo `.env`

## 🚀 Paso 1: Crear Aplicación en Meta for Developers

### 1.1 Acceder a Meta for Developers
1. Ve a https://developers.facebook.com/
2. Inicia sesión con tu cuenta de Facebook/Meta
3. Haz clic en "Mis aplicaciones" en la esquina superior derecha

### 1.2 Crear Nueva Aplicación
1. Haz clic en "Crear aplicación"
2. Selecciona "Empresa" como tipo de aplicación
3. Completa la información:
   - **Nombre de la aplicación**: `FitPro WhatsApp Bot`
   - **Email de contacto**: tu email
   - **Propósito comercial**: `Automatización de servicios de fitness`
4. Haz clic en "Crear aplicación"

## 📱 Paso 2: Configurar WhatsApp Business API

### 2.1 Agregar Producto WhatsApp
1. En el panel de tu aplicación, busca "WhatsApp" en la lista de productos
2. Haz clic en "Configurar" en la tarjeta de WhatsApp Business API
3. Acepta los términos y condiciones

### 2.2 Configuración Inicial
1. **Cuenta de WhatsApp Business**: 
   - Si no tienes una, se creará automáticamente
   - Anota el `Business Account ID` (lo necesitarás para el .env)

2. **Número de teléfono**:
   - Para desarrollo: usa el número de prueba proporcionado
   - Para producción: agrega tu número de WhatsApp Business verificado
   - Anota el `Phone Number ID`

## 🔗 Paso 3: Configurar el Webhook

### 3.1 Preparar la URL del Webhook

**Para Desarrollo Local:**
```bash
# Instalar ngrok si no lo tienes
brew install ngrok  # macOS
# o descargar desde https://ngrok.com/

# Exponer tu servidor local
ngrok http 5002

# Copia la URL HTTPS que aparece, ejemplo:
# https://abc123.ngrok.io
```

**Para Producción:**
- Usa tu dominio con HTTPS: `https://tu-dominio.com`

### 3.2 Configurar el Webhook en Meta

1. En la sección "WhatsApp" → "Configuración"
2. Busca la sección "Webhook"
3. Haz clic en "Configurar webhook"

4. **Configuración del Webhook:**
   ```
   URL del webhook: https://tu-dominio.com/api/whatsapp/webhook
   Token de verificación: mi-token-secreto-webhook-2025
   ```
   
   ⚠️ **Importante**: El token debe coincidir exactamente con `WHATSAPP_WEBHOOK_VERIFY_TOKEN` en tu `.env`

5. Haz clic en "Verificar y guardar"

### 3.3 Suscribirse a Eventos

1. Después de verificar el webhook, verás la sección "Campos de webhook"
2. Suscríbete a los siguientes eventos:
   - ✅ `messages` (mensajes entrantes)
   - ✅ `message_deliveries` (confirmaciones de entrega)
   - ✅ `message_reads` (confirmaciones de lectura)

## 🔑 Paso 4: Obtener Tokens y Credenciales

### 4.1 Access Token
1. En "WhatsApp" → "Configuración" → "API Setup"
2. Copia el **Token de acceso temporal** (válido por 24 horas)
3. Para producción, genera un **Token de acceso permanente**:
   - Ve a "Configuración" → "Tokens de acceso"
   - Genera un token con permisos `whatsapp_business_messaging`

### 4.2 Actualizar Variables de Entorno

Actualiza tu archivo `.env` con las credenciales reales:

```bash
# Reemplaza estos valores con los reales
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=1234567890123456
WHATSAPP_WEBHOOK_VERIFY_TOKEN=mi-token-secreto-webhook-2025
WHATSAPP_BUSINESS_ACCOUNT_ID=1234567890123456
```

## 🧪 Paso 5: Probar la Configuración

### 5.1 Verificar el Webhook

1. **Iniciar el servidor**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Probar la verificación**:
   - Meta enviará una petición GET a tu webhook
   - Deberías ver logs en tu consola confirmando la verificación

### 5.2 Enviar Mensaje de Prueba

1. **Desde la consola de Meta**:
   - Ve a "WhatsApp" → "API Setup"
   - En "Send and receive messages", envía un mensaje al número de prueba

2. **Desde tu aplicación**:
   ```bash
   # Usar el endpoint de prueba (requiere autenticación)
   curl -X POST http://localhost:5002/api/whatsapp/test-message \
     -H "Authorization: Bearer TU_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "to": "NUMERO_DE_TELEFONO",
       "message": "¡Hola! El bot de FitPro está funcionando correctamente."
     }'
   ```

### 5.3 Probar Mensajes Entrantes

1. Envía un mensaje desde WhatsApp al número configurado:
   ```
   Rutina para ganar masa muscular
   ```

2. Verifica en los logs que el mensaje se procesa correctamente
3. Deberías recibir una respuesta automática con una rutina generada

## 🔧 Troubleshooting

### Problema: Webhook no se verifica

**Posibles causas:**
- URL incorrecta o no accesible
- Token de verificación no coincide
- Servidor no está ejecutándose
- Problemas de HTTPS/SSL

**Soluciones:**
1. Verificar que el servidor esté corriendo en el puerto correcto
2. Comprobar que la URL sea accesible desde internet
3. Verificar que `WHATSAPP_WEBHOOK_VERIFY_TOKEN` coincida exactamente
4. Revisar logs del servidor para errores

### Problema: No se reciben mensajes

**Posibles causas:**
- Webhook no suscrito a eventos `messages`
- Token de acceso inválido o expirado
- Número de teléfono no autorizado

**Soluciones:**
1. Verificar suscripción a eventos en Meta console
2. Regenerar token de acceso
3. Verificar que el número esté en la lista de números de prueba

### Problema: No se pueden enviar mensajes

**Posibles causas:**
- Token de acceso sin permisos
- Phone Number ID incorrecto
- Límites de rate limiting

**Soluciones:**
1. Verificar permisos del token
2. Comprobar Phone Number ID en Meta console
3. Implementar retry logic con backoff

## 📚 Recursos Adicionales

- [Documentación oficial de WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Guía de webhooks de Meta](https://developers.facebook.com/docs/graph-api/webhooks)
- [Herramientas de testing de webhooks](https://webhook.site/)

## 🚀 Próximos Pasos

Una vez configurado el webhook:

1. ✅ Probar el bot con diferentes tipos de mensajes
2. ✅ Configurar monitoreo y logging
3. ✅ Implementar manejo de errores robusto
4. ✅ Configurar rate limiting
5. ✅ Preparar para producción con dominio real

---

**¿Necesitas ayuda?** Revisa los logs del servidor y la consola de Meta for Developers para identificar posibles errores.