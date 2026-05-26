import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exercisesData = [
  // Ejercicios para FUERZA
  {
    name: 'Sentadilla con barra',
    description: 'Ejercicio compuesto fundamental para el desarrollo de fuerza en tren inferior',
    type: 'Compuesto',
    equipment: 'Barra olímpica',
    difficulty: 'Intermedio',
    muscles: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    objectives: ['fuerza', 'hipertrofia']
  },
  {
    name: 'Press de banca',
    description: 'Ejercicio básico para el desarrollo de fuerza en pecho, hombros y tríceps',
    type: 'Compuesto',
    equipment: 'Barra olímpica',
    difficulty: 'Intermedio',
    muscles: ['Pectorales', 'Deltoides', 'Tríceps'],
    objectives: ['fuerza', 'hipertrofia']
  },
  {
    name: 'Peso muerto',
    description: 'Ejercicio fundamental para el desarrollo de fuerza general',
    type: 'Compuesto',
    equipment: 'Barra olímpica',
    difficulty: 'Avanzado',
    muscles: ['Espalda baja', 'Glúteos', 'Isquiotibiales', 'Trapecios'],
    objectives: ['fuerza', 'hipertrofia']
  },
  {
    name: 'Press militar',
    description: 'Ejercicio para el desarrollo de fuerza en hombros y core',
    type: 'Compuesto',
    equipment: 'Barra olímpica',
    difficulty: 'Intermedio',
    muscles: ['Deltoides', 'Tríceps', 'Core'],
    objectives: ['fuerza', 'hipertrofia']
  },

  // Ejercicios para HIPERTROFIA
  {
    name: 'Press inclinado con mancuernas',
    description: 'Ejercicio para el desarrollo muscular del pecho superior',
    type: 'Aislado',
    equipment: 'Mancuernas',
    difficulty: 'Intermedio',
    muscles: ['Pectorales superiores', 'Deltoides'],
    objectives: ['hipertrofia', 'estetica_salud']
  },
  {
    name: 'Curl de bíceps con mancuernas',
    description: 'Ejercicio de aislamiento para el desarrollo de los bíceps',
    type: 'Aislado',
    equipment: 'Mancuernas',
    difficulty: 'Principiante',
    muscles: ['Bíceps'],
    objectives: ['hipertrofia', 'estetica_salud']
  },
  {
    name: 'Extensiones de tríceps',
    description: 'Ejercicio de aislamiento para el desarrollo de los tríceps',
    type: 'Aislado',
    equipment: 'Mancuernas',
    difficulty: 'Principiante',
    muscles: ['Tríceps'],
    objectives: ['hipertrofia', 'estetica_salud']
  },
  {
    name: 'Remo con mancuernas',
    description: 'Ejercicio para el desarrollo de la espalda y bíceps',
    type: 'Compuesto',
    equipment: 'Mancuernas',
    difficulty: 'Intermedio',
    muscles: ['Dorsales', 'Romboides', 'Bíceps'],
    objectives: ['hipertrofia', 'fuerza']
  },

  // Ejercicios para RESISTENCIA CARDIO
  {
    name: 'Burpees',
    description: 'Ejercicio de cuerpo completo para mejorar la resistencia cardiovascular',
    type: 'Cardio',
    equipment: 'Peso corporal',
    difficulty: 'Intermedio',
    muscles: ['Cuerpo completo'],
    objectives: ['resistencia_cardio', 'quema_grasa']
  },
  {
    name: 'Mountain climbers',
    description: 'Ejercicio cardiovascular que trabaja core y resistencia',
    type: 'Cardio',
    equipment: 'Peso corporal',
    difficulty: 'Intermedio',
    muscles: ['Core', 'Hombros', 'Piernas'],
    objectives: ['resistencia_cardio', 'quema_grasa']
  },
  {
    name: 'Jumping jacks',
    description: 'Ejercicio cardiovascular básico para calentamiento y resistencia',
    type: 'Cardio',
    equipment: 'Peso corporal',
    difficulty: 'Principiante',
    muscles: ['Cuerpo completo'],
    objectives: ['resistencia_cardio', 'quema_grasa']
  },
  {
    name: 'High knees',
    description: 'Ejercicio cardiovascular para mejorar la coordinación y resistencia',
    type: 'Cardio',
    equipment: 'Peso corporal',
    difficulty: 'Principiante',
    muscles: ['Piernas', 'Core'],
    objectives: ['resistencia_cardio', 'quema_grasa']
  },

  // Ejercicios para POTENCIA
  {
    name: 'Saltos al cajón',
    description: 'Ejercicio pliométrico para desarrollar potencia en piernas',
    type: 'Pliométrico',
    equipment: 'Cajón pliométrico',
    difficulty: 'Intermedio',
    muscles: ['Cuádriceps', 'Glúteos', 'Pantorrillas'],
    objectives: ['potencia', 'fuerza_resistencia']
  },
  {
    name: 'Push-ups explosivos',
    description: 'Flexiones explosivas para desarrollar potencia en tren superior',
    type: 'Pliométrico',
    equipment: 'Peso corporal',
    difficulty: 'Avanzado',
    muscles: ['Pectorales', 'Tríceps', 'Deltoides'],
    objectives: ['potencia', 'fuerza_resistencia']
  },
  {
    name: 'Sentadillas con salto',
    description: 'Ejercicio pliométrico para desarrollar potencia en piernas',
    type: 'Pliométrico',
    equipment: 'Peso corporal',
    difficulty: 'Intermedio',
    muscles: ['Cuádriceps', 'Glúteos', 'Pantorrillas'],
    objectives: ['potencia', 'fuerza_resistencia']
  },

  // Ejercicios para MOVILIDAD
  {
    name: 'Estiramiento de isquiotibiales',
    description: 'Estiramiento para mejorar la flexibilidad de isquiotibiales',
    type: 'Estiramiento',
    equipment: 'Ninguno',
    difficulty: 'Principiante',
    muscles: ['Isquiotibiales'],
    objectives: ['movilidad', 'estetica_salud']
  },
  {
    name: 'Gato-camello',
    description: 'Ejercicio de movilidad para la columna vertebral',
    type: 'Movilidad',
    equipment: 'Ninguno',
    difficulty: 'Principiante',
    muscles: ['Columna vertebral', 'Core'],
    objectives: ['movilidad', 'estetica_salud']
  },
  {
    name: 'Rotaciones de hombros',
    description: 'Ejercicio de movilidad para los hombros',
    type: 'Movilidad',
    equipment: 'Ninguno',
    difficulty: 'Principiante',
    muscles: ['Deltoides', 'Manguito rotador'],
    objectives: ['movilidad', 'estetica_salud']
  },

  // Ejercicios para QUEMA DE GRASA
  {
    name: 'Circuito HIIT',
    description: 'Entrenamiento de alta intensidad para quemar grasa',
    type: 'HIIT',
    equipment: 'Peso corporal',
    difficulty: 'Intermedio',
    muscles: ['Cuerpo completo'],
    objectives: ['quema_grasa', 'resistencia_cardio']
  },
  {
    name: 'Plancha',
    description: 'Ejercicio isométrico para fortalecer el core',
    type: 'Isométrico',
    equipment: 'Peso corporal',
    difficulty: 'Principiante',
    muscles: ['Core', 'Hombros'],
    objectives: ['estetica_salud', 'fuerza_resistencia']
  },
  {
    name: 'Sentadillas con peso corporal',
    description: 'Ejercicio básico para piernas sin equipamiento',
    type: 'Peso corporal',
    equipment: 'Ninguno',
    difficulty: 'Principiante',
    muscles: ['Cuádriceps', 'Glúteos'],
    objectives: ['estetica_salud', 'fuerza_resistencia', 'quema_grasa']
  }
];

export async function seedExercises() {
  console.log('🌱 Iniciando seed de ejercicios...');
  
  try {
    // Buscar un trainer existente para asignar los ejercicios
    const trainer = await prisma.user.findFirst({
      where: { role: 'TRAINER' }
    });

    if (!trainer) {
      console.log('❌ No se encontró ningún trainer. Creando uno temporal...');
      // Crear un trainer temporal si no existe
      const tempTrainer = await prisma.user.create({
        data: {
          email: 'temp.trainer@fitpro.com',
          password: 'temp123',
          role: 'TRAINER',
          name: 'Trainer Temporal'
        }
      });
      
      console.log('✅ Trainer temporal creado');
    }

    const trainerId = trainer?.id || (await prisma.user.findFirst({ where: { role: 'TRAINER' } }))?.id;

    if (!trainerId) {
      throw new Error('No se pudo obtener un trainer ID');
    }

    // Crear los ejercicios
    for (const exerciseData of exercisesData) {
      await prisma.exercise.create({
        data: {
          ...exerciseData,
          trainerId
        }
      });
    }

    console.log(`✅ Se crearon ${exercisesData.length} ejercicios categorizados por objetivos`);
    console.log('🎯 Objetivos disponibles: fuerza, hipertrofia, resistencia_cardio, potencia, movilidad, quema_grasa, estetica_salud, fuerza_resistencia');
    
  } catch (error) {
    console.error('❌ Error al crear ejercicios:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedExercises()
    .then(() => {
      console.log('✅ Seed completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error en el seed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}