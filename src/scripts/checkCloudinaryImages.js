// Script para verificar qué imágenes de Cloudinary están disponibles
const https = require('https');

// Importar el mapa de ejercicios (simulado para el script)
const exerciseImageMap = {
  // Bíceps
  'Biceps en banco scott': 'fitpro/biceps/Biceps_en_banco_scott_rwokdv',
  'Curl bíceps alterno tipo martillo': 'fitpro/biceps/Curl_bíceps_alterno_tipo_martillo_typztg',
  'Curl de bíceps con polea': 'fitpro/biceps/Curl_de_bíceps_con_polea_t9rly3',
  'Curl de bíceps con barra': 'fitpro/biceps/Curl_de_bíceps_con_barra_l6dumd',
  'Biceps sentado': 'fitpro/biceps/Biceps_sentado_wx7e6n',
  'Biceps con mancuernas': 'fitpro/biceps/Biceps_con_mancuernas_dxghjv',
  'Biceps mas sentadillas': 'fitpro/biceps/Biceps_mas_sentadillas_dhwjoe',
  
  // Gemelos
  'Gemelos de Pie': 'fitpro/gemelos/Gemelos_de_Pie_ckbel0',
  'Gemelos (soleo)en Maquina sentado': 'Gemelos_soleo_en_Maquina_sentado_iopmr9',
  
  // Cardio
  'Elíptico': 'fitpro/cardio/Elíptico_ovk3gk',
  'Cinta': 'fitpro/cardio/Cinta_h9xqcz',
  'Bici': 'fitpro/cardio/Bici_x9wyw0',
};

const cloudName = 'dsflesvzj';

function checkImageExists(publicId) {
  return new Promise((resolve) => {
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.png`;
    
    https.get(url, (res) => {
      resolve({
        publicId,
        exists: res.statusCode === 200,
        statusCode: res.statusCode,
        url
      });
    }).on('error', () => {
      resolve({
        publicId,
        exists: false,
        statusCode: 'ERROR',
        url
      });
    });
  });
}

async function checkAllImages() {
  console.log('🔍 Verificando imágenes de Cloudinary...');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const [exerciseName, publicId] of Object.entries(exerciseImageMap)) {
    const result = await checkImageExists(publicId);
    results.push({ exerciseName, ...result });
    
    const status = result.exists ? '✅' : '❌';
    console.log(`${status} ${exerciseName}`);
    console.log(`   Public ID: ${publicId}`);
    if (!result.exists) {
      console.log(`   URL: ${result.url}`);
      console.log(`   Status: ${result.statusCode}`);
    }
    console.log('');
  }
  
  const working = results.filter(r => r.exists).length;
  const total = results.length;
  
  console.log('=' .repeat(60));
  console.log(`📊 Resumen: ${working}/${total} imágenes funcionando (${Math.round(working/total*100)}%)`);
  
  const broken = results.filter(r => !r.exists);
  if (broken.length > 0) {
    console.log('\n❌ Imágenes que no funcionan:');
    broken.forEach(item => {
      console.log(`   - ${item.exerciseName}: ${item.publicId}`);
    });
  }
}

checkAllImages().catch(console.error);