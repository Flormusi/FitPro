const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAndFixExercises() {
  try {
    console.log('🔍 Verificando ejercicios en la base de datos...');
    
    // Obtener todos los ejercicios
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        trainerId: true,
        objectives: true
      }
    });
    
    console.log(`📊 Total de ejercicios: ${exercises.length}`);
    
    if (exercises.length > 0) {
      console.log('\n🏋️ Ejercicios encontrados:');
      exercises.forEach((exercise, index) => {
        console.log(`${index + 1}. ${exercise.name}`);
        console.log(`   - Trainer ID: ${exercise.trainerId}`);
        console.log(`   - Objetivos: ${exercise.objectives.join(', ')}`);
        console.log('');
      });
      
      // Obtener el trainer de prueba
      const testTrainer = await prisma.user.findUnique({
        where: { email: 'test.trainer@fitpro.com' }
      });
      
      if (testTrainer) {
        console.log(`\n👤 Trainer de prueba encontrado: ${testTrainer.id}`);
        
        // Verificar si los ejercicios pertenecen al trainer correcto
        const exercisesWithWrongTrainer = exercises.filter(ex => ex.trainerId !== testTrainer.id);
        
        if (exercisesWithWrongTrainer.length > 0) {
          console.log(`\n🔧 Actualizando ${exercisesWithWrongTrainer.length} ejercicios al trainer correcto...`);
          
          for (const exercise of exercisesWithWrongTrainer) {
            await prisma.exercise.update({
              where: { id: exercise.id },
              data: { trainerId: testTrainer.id }
            });
            console.log(`✅ Ejercicio "${exercise.name}" actualizado`);
          }
          
          console.log('\n🎉 Todos los ejercicios han sido actualizados!');
        } else {
          console.log('\n✅ Todos los ejercicios ya pertenecen al trainer correcto');
        }
      } else {
        console.log('\n❌ No se encontró el trainer de prueba');
      }
    } else {
      console.log('\n❌ No se encontraron ejercicios en la base de datos');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndFixExercises();