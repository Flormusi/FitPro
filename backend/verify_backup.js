const fs = require('fs');
const path = require('path');

function verifyBackup(backupFile) {
  try {
    console.log('🔍 Verificando integridad del backup...');
    
    // Verificar que el archivo existe
    if (!fs.existsSync(backupFile)) {
      throw new Error(`Archivo de backup no encontrado: ${backupFile}`);
    }
    
    // Verificar tamaño del archivo
    const stats = fs.statSync(backupFile);
    console.log(`📁 Tamaño del archivo: ${(stats.size / 1024).toFixed(2)} KB`);
    
    if (stats.size === 0) {
      throw new Error('El archivo de backup está vacío');
    }
    
    // Verificar que es JSON válido
    const backupContent = fs.readFileSync(backupFile, 'utf8');
    let backup;
    
    try {
      backup = JSON.parse(backupContent);
    } catch (parseError) {
      throw new Error(`Error al parsear JSON: ${parseError.message}`);
    }
    
    // Verificar estructura del backup
    const requiredArrayFields = [
      'users', 'clientProfiles', 'trainerProfiles',
      'routines', 'routineAssignments', 'progress', 'notifications',
      'trainerClients', 'subscriptions', 'payments'
    ];
    
    // Verificar timestamp
    if (!backup.hasOwnProperty('timestamp')) {
      throw new Error('Campo requerido faltante: timestamp');
    }
    
    // Verificar campos que deben ser arrays
    for (const field of requiredArrayFields) {
      if (!backup.hasOwnProperty(field)) {
        throw new Error(`Campo requerido faltante: ${field}`);
      }
      if (!Array.isArray(backup[field])) {
        throw new Error(`Campo ${field} debe ser un array`);
      }
    }
    
    // Verificar timestamp
    const backupDate = new Date(backup.timestamp);
    if (isNaN(backupDate.getTime())) {
      throw new Error('Timestamp inválido en el backup');
    }
    
    // Verificar que hay datos
    const totalRecords = Object.keys(backup)
      .filter(key => Array.isArray(backup[key]))
      .reduce((sum, key) => sum + backup[key].length, 0);
    
    if (totalRecords === 0) {
      console.log('⚠️  Advertencia: El backup no contiene registros de datos');
    }
    
    // Verificar integridad de datos críticos
    if (backup.users.length > 0) {
      const sampleUser = backup.users[0];
      const requiredUserFields = ['id', 'email', 'role'];
      
      for (const field of requiredUserFields) {
        if (!sampleUser.hasOwnProperty(field)) {
          throw new Error(`Campo requerido faltante en usuario: ${field}`);
        }
      }
    }
    
    console.log('✅ Verificación de integridad completada exitosamente');
    console.log(`📊 Resumen del backup:`);
    console.log(`   - Fecha: ${backupDate.toLocaleString()}`);
    console.log(`   - Total de registros: ${totalRecords}`);
    console.log(`   - Usuarios: ${backup.users.length}`);
    console.log(`   - Rutinas: ${backup.routines.length}`);
    console.log(`   - Notificaciones: ${backup.notifications.length}`);
    
    return {
      valid: true,
      timestamp: backup.timestamp,
      totalRecords,
      fileSize: stats.size
    };
    
  } catch (error) {
    console.error('❌ Error en la verificación del backup:', error.message);
    return {
      valid: false,
      error: error.message
    };
  }
}

if (require.main === module) {
  const backupFile = process.argv[2] || '/Users/mariaflorenciamusitani/Desktop/FitPro/backend/backups/fitpro_backup_2025-08-30T14-04-33.json';
  
  const result = verifyBackup(backupFile);
  
  if (result.valid) {
    console.log('🎯 Backup verificado y listo para usar');
    process.exit(0);
  } else {
    console.log('💥 Backup inválido - se requiere crear un nuevo backup');
    process.exit(1);
  }
}

module.exports = { verifyBackup };