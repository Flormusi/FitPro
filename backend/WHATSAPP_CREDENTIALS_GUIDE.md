# Guía Completa: Obtención de Credenciales de WhatsApp Business API

Esta guía detalla paso a paso cómo obtener todas las credenciales necesarias para configurar el bot de WhatsApp de FitPro.

## 🎯 Credenciales Necesarias

Para que el bot funcione correctamente, necesitas obtener estas 4 credenciales principales:

1. **WHATSAPP_ACCESS_TOKEN** - Token de acceso para la API
2. **WHATSAPP_PHONE_NUMBER_ID** - ID del número de teléfono
3. **WHATSAPP_WEBHOOK_VERIFY_TOKEN** - Token para verificar el webhook (lo defines tú)
4. **WHATSAPP_BUSINESS_ACCOUNT_ID** - ID de la cuenta de negocio

## 🚀 Proceso Completo de Configuración

### Paso 1: Crear Cuenta y Aplicación en Meta

#### 1.1 Registro en Meta for Developers
1. Ve a https://developers.facebook.com/
2. Inicia sesión con tu cuenta de Facebook/Meta
3. Si es tu primera vez, completa la verificación de desarrollador

#### 1.2 Crear Nueva Aplicación
1. Haz clic en "Mis aplicaciones" → "Crear aplicación"
2. Selecciona **"Empresa"** como tipo de aplicación
3. Completa el formulario:
   ```
   Nombre de la aplicación: FitPro WhatsApp Bot
   Email de contacto: tu-email@ejemplo.com
   Propósito: Automatización de servicios de fitness y entrenamiento
   ```
4. Haz clic en "Crear aplicación"

### Paso 2: Configurar WhatsApp Business API

#### 2.1 Agregar Producto WhatsApp
1. En el dashboard de tu aplicación, busca "WhatsApp" en la lista de productos
2. Haz clic en "Configurar" en WhatsApp Business API
3. Acepta los términos de servicio

#### 2.2 Configuración Inicial Automática
Meta creará automáticamente:
- Una cuenta de WhatsApp Business
- Un número de teléfono de prueba
- Configuraciones básicas

## 🔑 Obtención de Credenciales

### Credencial 1: WHATSAPP_BUSINESS_ACCOUNT_ID

**Ubicación**: WhatsApp → Configuración → API Setup

1. Ve a la sección "WhatsApp Business Account"
2. Copia el ID que aparece (formato: `123456789012345`)
3. Pégalo en tu `.env`:
   ```bash
   WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
   ```

### Credencial 2: WHATSAPP_PHONE_NUMBER_ID

**Ubicación**: WhatsApp → Configuración → API Setup

1. En la sección "From", verás el número de teléfono asignado
2. Haz clic en el número para ver los detalles
3. Copia el "Phone number ID" (formato: `987654321098765`)
4. Pégalo en tu `.env`:
   ```bash
   WHATSAPP_PHONE_NUMBER_ID=987654321098765
   ```

### Credencial 3: WHATSAPP_ACCESS_TOKEN

#### Opción A: Token Temporal (24 horas) - Para Desarrollo

**Ubicación**: WhatsApp → Configuración → API Setup

1. En la sección "Access token", verás un token generado
2. Haz clic en "Copy" para copiarlo
3. Pégalo en tu `.env`:
   ```bash
   WHATSAPP_ACCESS_TOKEN=EAABsBCS1234...(token muy largo)
   ```

⚠️ **Importante**: Este token expira en 24 horas. Para desarrollo está bien, pero para producción necesitas un token permanente.

#### Opción B: Token Permanente - Para Producción

1. **Crear Token de Sistema**:
   - Ve a "Configuración" → "Básico" en tu aplicación
   - Busca "Tokens de acceso de la aplicación"
   - Copia el "App Secret"

2. **Generar Token Permanente**:
   - Ve a "WhatsApp" → "Configuración" → "Tokens de acceso"
   - Haz clic en "Crear token de acceso permanente"
   - Selecciona los permisos:
     - ✅ `whatsapp_business_messaging`
     - ✅ `whatsapp_business_management`
   - Copia el token generado

3. **Configurar en .env**:
   ```bash
   WHATSAPP_ACCESS_TOKEN=tu_token_permanente_aqui
   ```

### Credencial 4: WHATSAPP_WEBHOOK_VERIFY_TOKEN

**Esta credencial la defines tú mismo**. Es una cadena secreta que usarás para verificar que los webhooks vienen realmente de Meta.

**Recomendaciones**:
- Usa una cadena aleatoria y segura
- Mínimo 20 caracteres
- Combina letras, números y símbolos

**Ejemplo**:
```bash
WHATSAPP_WEBHOOK_VERIFY_TOKEN=FitPro_Webhook_Secret_2025_xyz789
```

## 📱 Configuración del Número de Teléfono

### Para Desarrollo: Número de Prueba

Meta te proporciona automáticamente un número de prueba:

1. **Características**:
   - Gratuito
   - Válido por tiempo limitado
   - Solo puede enviar mensajes a números verificados

2. **Agregar Números de Prueba**:
   - Ve a "WhatsApp" → "Configuración" → "API Setup"
   - En "To", agrega los números que pueden recibir mensajes
   - Formato: `+5491123456789` (con código de país)

### Para Producción: Número Propio

1. **Verificar Número de WhatsApp Business**:
   - Debe ser un número de WhatsApp Business verificado
   - No puede estar asociado a otra aplicación de WhatsApp

2. **Proceso de Verificación**:
   - Ve a "WhatsApp" → "Configuración" → "Phone Numbers"
   - Haz clic en "Add phone number"
   - Sigue el proceso de verificación por SMS/llamada

## 🔒 Seguridad y Mejores Prácticas

### Protección de Tokens

1. **Nunca hardcodees tokens en el código**
2. **Usa variables de entorno siempre**
3. **Rota tokens regularmente en producción**
4. **Limita permisos al mínimo necesario**

### Configuración Segura del .env

```bash
# ✅ CORRECTO - Tokens en variables de entorno
WHATSAPP_ACCESS_TOKEN=${WHATSAPP_ACCESS_TOKEN}

# ❌ INCORRECTO - Token hardcodeado
WHATSAPP_ACCESS_TOKEN=EAABsBCS1234567890...
```

### Backup de Credenciales

1. **Guarda las credenciales en un gestor de contraseñas**
2. **Documenta qué aplicación y cuenta usaste**
3. **Mantén un registro de cuándo expiran los tokens**

## 🧪 Verificación de Credenciales

### Script de Verificación Rápida

Crea un archivo `test-credentials.js` para verificar que todo funciona:

```javascript
const axios = require('axios');
require('dotenv').config();

async function testCredentials() {
  const { 
    WHATSAPP_ACCESS_TOKEN, 
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_BUSINESS_ACCOUNT_ID 
  } = process.env;

  console.log('🔍 Verificando credenciales...');
  
  // Test 1: Verificar token de acceso
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${WHATSAPP_BUSINESS_ACCOUNT_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`
        }
      }
    );
    console.log('✅ Token de acceso válido');
    console.log('📋 Cuenta:', response.data.name);
  } catch (error) {
    console.log('❌ Error con token de acceso:', error.response?.data || error.message);
  }

  // Test 2: Verificar Phone Number ID
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`
        }
      }
    );
    console.log('✅ Phone Number ID válido');
    console.log('📱 Número:', response.data.display_phone_number);
  } catch (error) {
    console.log('❌ Error con Phone Number ID:', error.response?.data || error.message);
  }
}

testCredentials();
```

### Ejecutar Verificación

```bash
cd backend
node test-credentials.js
```

## 🚨 Troubleshooting Común

### Error: "Invalid access token"

**Causas posibles**:
- Token expirado (tokens temporales duran 24h)
- Token copiado incorrectamente
- Espacios extra al copiar/pegar

**Soluciones**:
1. Regenerar token en Meta console
2. Verificar que no hay espacios extra
3. Usar token permanente para producción

### Error: "Phone number not found"

**Causas posibles**:
- Phone Number ID incorrecto
- Número no asociado a la aplicación
- Permisos insuficientes

**Soluciones**:
1. Verificar Phone Number ID en Meta console
2. Confirmar que el número está activo
3. Revisar permisos del token

### Error: "Webhook verification failed"

**Causas posibles**:
- WEBHOOK_VERIFY_TOKEN no coincide
- URL del webhook incorrecta
- Servidor no accesible

**Soluciones**:
1. Verificar que el token coincida exactamente
2. Probar URL manualmente
3. Usar ngrok para desarrollo local

## 📋 Checklist Final

Antes de continuar, verifica que tienes:

- [ ] ✅ Aplicación creada en Meta for Developers
- [ ] ✅ WhatsApp Business API configurado
- [ ] ✅ WHATSAPP_ACCESS_TOKEN obtenido y válido
- [ ] ✅ WHATSAPP_PHONE_NUMBER_ID copiado correctamente
- [ ] ✅ WHATSAPP_WEBHOOK_VERIFY_TOKEN definido (tu elección)
- [ ] ✅ WHATSAPP_BUSINESS_ACCOUNT_ID copiado
- [ ] ✅ Todas las credenciales en el archivo .env
- [ ] ✅ Script de verificación ejecutado exitosamente

## 🎯 Próximos Pasos

Una vez que tengas todas las credenciales:

1. ✅ Configurar el webhook (ver `WEBHOOK_SETUP_GUIDE.md`)
2. ✅ Probar el bot con mensajes de ejemplo
3. ✅ Configurar monitoreo y logs
4. ✅ Preparar para producción

---

**💡 Consejo**: Guarda todas estas credenciales en un gestor de contraseñas y documenta el proceso para futuros desarrolladores del equipo.