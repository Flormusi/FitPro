# Ejemplos de Mensajes de Prueba - Bot WhatsApp FitPro

Esta guía contiene ejemplos de mensajes para probar todas las funcionalidades del bot de WhatsApp de FitPro.

## 🔧 Configuración Previa

Antes de probar, asegúrate de:
1. Haber configurado todas las variables de entorno en `.env`
2. Tener el webhook configurado correctamente
3. Ejecutar el script de verificación: `node test-whatsapp-config.js`
4. Tener el servidor backend ejecutándose

## 📱 Mensajes de Prueba

### 1. Mensaje de Bienvenida
**Envía cualquier mensaje para activar el bot:**
```
Hola
```
**Respuesta esperada:**
```
¡Hola! 👋 Soy el asistente de FitPro.

Puedo ayudarte a generar rutinas personalizadas. Solo dime:
• Tu objetivo (ej: perder peso, ganar músculo)
• Días disponibles para entrenar
• Nivel de experiencia
• Equipamiento disponible

¿Cuál es tu objetivo de entrenamiento?
```

### 2. Solicitud de Rutina Básica
**Mensaje:**
```
Quiero una rutina para perder peso, tengo 3 días a la semana, soy principiante y solo tengo pesas
```
**Respuesta esperada:**
- Rutina personalizada de 3 días
- Ejercicios con pesas
- Adaptada para principiantes
- Enfocada en pérdida de peso

### 3. Solicitud de Rutina Avanzada
**Mensaje:**
```
Necesito ganar masa muscular, puedo entrenar 5 días, nivel avanzado, tengo gimnasio completo
```
**Respuesta esperada:**
- Rutina de 5 días
- Ejercicios avanzados
- Enfoque en hipertrofia
- Uso de equipamiento completo

### 4. Solicitud con Limitaciones
**Mensaje:**
```
Quiero tonificar, 2 días por semana, intermedio, solo ejercicios en casa sin equipos
```
**Respuesta esperada:**
- Rutina de 2 días
- Ejercicios de peso corporal
- Nivel intermedio
- Enfoque en tonificación

### 5. Mensaje Incompleto
**Mensaje:**
```
Quiero una rutina
```
**Respuesta esperada:**
```
Para crear tu rutina personalizada necesito más información:

• ¿Cuál es tu objetivo? (perder peso, ganar músculo, tonificar, etc.)
• ¿Cuántos días puedes entrenar por semana?
• ¿Cuál es tu nivel de experiencia? (principiante, intermedio, avanzado)
• ¿Qué equipamiento tienes disponible?

Por favor, compárteme estos detalles.
```

### 6. Mensaje No Relacionado
**Mensaje:**
```
¿Qué hora es?
```
**Respuesta esperada:**
```
Soy un asistente especializado en fitness y rutinas de entrenamiento.

¿Te gustaría que te ayude a crear una rutina personalizada? Solo necesito conocer:
• Tu objetivo de entrenamiento
• Días disponibles
• Nivel de experiencia
• Equipamiento disponible
```

## 🧪 Casos de Prueba Técnicos

### Verificar Webhook
**Método:** POST a `https://tu-dominio.com/api/whatsapp/webhook`
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```
**Body:**
```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "ENTRY_ID",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "PHONE_NUMBER",
          "phone_number_id": "PHONE_NUMBER_ID"
        },
        "messages": [{
          "from": "SENDER_PHONE",
          "id": "MESSAGE_ID",
          "timestamp": "TIMESTAMP",
          "text": {
            "body": "Hola, quiero una rutina"
          },
          "type": "text"
        }]
      },
      "field": "messages"
    }]
  }]
}
```

### Verificar Validación de Webhook
**Método:** GET a `https://tu-dominio.com/api/whatsapp/webhook`
**Query Parameters:**
- `hub.mode=subscribe`
- `hub.challenge=CHALLENGE_STRING`
- `hub.verify_token=TU_VERIFY_TOKEN`

**Respuesta esperada:** El valor de `hub.challenge`

## 📊 Monitoreo y Logs

### Logs a Verificar
1. **Recepción de mensajes:**
   ```
   [WhatsApp] Mensaje recibido de: +1234567890
   [WhatsApp] Contenido: "Quiero una rutina para..."
   ```

2. **Procesamiento de objetivos:**
   ```
   [Bot] Procesando objetivos del usuario
   [Bot] Objetivo detectado: perder peso
   [Bot] Días: 3, Nivel: principiante
   ```

3. **Generación de rutina:**
   ```
   [Bot] Generando rutina personalizada
   [Bot] Rutina generada exitosamente
   ```

4. **Envío de respuesta:**
   ```
   [WhatsApp] Enviando respuesta a: +1234567890
   [WhatsApp] Mensaje enviado exitosamente
   ```

## 🚨 Troubleshooting

### Problemas Comunes

1. **No recibe mensajes:**
   - Verificar webhook URL
   - Revisar tokens de acceso
   - Comprobar logs del servidor

2. **No envía respuestas:**
   - Verificar WHATSAPP_ACCESS_TOKEN
   - Revisar WHATSAPP_PHONE_NUMBER_ID
   - Comprobar permisos de la aplicación

3. **Rutinas no se generan:**
   - Verificar conexión a base de datos
   - Revisar logs del servicio de rutinas
   - Comprobar datos de entrenadores

### Comandos de Diagnóstico

```bash
# Verificar configuración
node test-whatsapp-config.js

# Revisar logs en tiempo real
tail -f logs/app.log

# Probar conexión a base de datos
node -e "require('./config/database').testConnection()"

# Verificar servicios
curl -X GET http://localhost:3000/api/health
```

## 📝 Notas Importantes

- Los números de teléfono deben incluir código de país (ej: +54911234567)
- Los mensajes de prueba pueden tardar hasta 30 segundos en procesarse
- Mantén un registro de los mensajes enviados para debugging
- Usa el modo de prueba de Meta antes de ir a producción

---

**¡Listo para probar!** 🚀

Si encuentras algún problema, revisa los logs y la configuración siguiendo esta guía.