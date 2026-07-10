// Plantillas starter de FitPro — el "punto de partida" para trainers nuevos.
// Cubren los casos de uso más comunes para que la biblioteca nunca esté vacía.
// Los nombres de ejercicios coinciden con el catálogo de la app para que
// se muestren las imágenes/ilustraciones al usarlas.

import type { RoutineTemplateData } from './routineTemplates';

export const starterTemplates: RoutineTemplateData[] = [
  // ── FULL BODY PRINCIPIANTE ──────────────────────────────────────────────
  {
    id: 'starter-full-body-principiante',
    name: 'Full Body Principiante',
    description: 'Cuerpo completo en 3 días para quienes recién arrancan. Movimientos básicos, técnica primero.',
    trainingObjective: 'Full Body',
    level: 'Principiante',
    daysPerWeek: 3,
    gender: 'unisex',
    duration: '45-60 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Cuerpo completo A',
        sections: {
          movilidad: [
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas Copa', sets: 3, reps: '10-12', weight: 'Liviano', rest: '90s' },
            { name: 'Press de banca plano', sets: 3, reps: '8-10', weight: 'Liviano-moderado', rest: '90s' },
            { name: 'Remo sentado', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 3, reps: '10', weight: 'Liviano', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '30s', rest: '45s' },
            { name: 'Dead bug', sets: 3, reps: '10 por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Cuerpo completo B',
        sections: {
          movilidad: [
            { name: 'Gato contento-enojado', sets: 2, reps: '10', rest: '30s' },
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Peso Muerto con mancuernas', sets: 3, reps: '10', weight: 'Moderado', rest: '90s' },
            { name: 'Estocadas caminadas', sets: 3, reps: '10 por pierna', weight: 'Corporal', rest: '90s' },
            { name: 'Dorsal al frente en polea', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Flexiones de brazos en el suelo', sets: 3, reps: 'Máximas con buena técnica', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Bird Dog', sets: 3, reps: '10 por lado', rest: '45s' },
            { name: 'Twist', sets: 3, reps: '15 por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Cuerpo completo C',
        sections: {
          movilidad: [
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
            { name: 'Liberación pelvica', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Prensa 45', sets: 3, reps: '12', weight: 'Moderado', rest: '90s' },
            { name: 'Press mancuernas banco inclinado', sets: 3, reps: '10', weight: 'Liviano-moderado', rest: '90s' },
            { name: 'Remo a un brazo', sets: 3, reps: '10 por lado', weight: 'Moderado', rest: '90s' },
            { name: 'Vuelos laterales de pie con mancuernas', sets: 3, reps: '12', weight: 'Liviano', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Plancha lateral', sets: 3, reps: '20s por lado', rest: '45s' },
            { name: 'Control Pelvico', sets: 3, reps: '12', rest: '45s' },
          ],
        },
      },
    ],
    notes: 'Progresar primero en técnica y repeticiones, después en peso. Ideal para los primeros 2-3 meses.',
  },

  // ── ADULTOS MAYORES ─────────────────────────────────────────────────────
  {
    id: 'starter-adultos-mayores',
    name: 'Adultos Mayores - Fuerza y Movilidad',
    description: 'Programa suave de 3 días: fuerza funcional, equilibrio y movilidad para adultos mayores.',
    trainingObjective: 'Adultos Mayores',
    level: 'Principiante',
    daysPerWeek: 3,
    gender: 'unisex',
    duration: '35-45 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Fuerza funcional',
        sections: {
          movilidad: [
            { name: 'Movilidad articular general', sets: 1, reps: '5 minutos', rest: '0s' },
            { name: 'Gato contento-enojado', sets: 2, reps: '8', rest: '30s' },
          ],
          principal: [
            { name: 'Subidas al cajon', sets: 2, reps: '8 por pierna', weight: 'Corporal', rest: '90s', notes: 'Cajón bajo, con apoyo si hace falta' },
            { name: 'Remo sentado', sets: 2, reps: '12', weight: 'Liviano', rest: '90s' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 2, reps: '10', weight: 'Muy liviano', rest: '90s' },
            { name: 'Sentadilla isométrica', sets: 2, reps: '15-20s', rest: '90s', notes: 'Contra pared o con silla de apoyo' },
          ],
          core_cardio: [
            { name: 'Bird Dog', sets: 2, reps: '8 por lado', rest: '60s' },
            { name: 'Caminata suave', sets: 1, reps: '10 minutos', rest: '0s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Equilibrio y core',
        sections: {
          movilidad: [
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
            { name: 'Estiramiento Cervical', sets: 2, reps: '20s por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Control Pelvico', sets: 2, reps: '12', rest: '60s' },
            { name: 'Gemelos de Pie', sets: 2, reps: '15', weight: 'Corporal', rest: '60s', notes: 'Con apoyo de manos' },
            { name: 'Caminata Lateral Banda Muslo', sets: 2, reps: '10 pasos por lado', rest: '60s' },
            { name: 'Biceps con mancuernas', sets: 2, reps: '12', weight: 'Muy liviano', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Dead bug', sets: 2, reps: '8 por lado', rest: '60s' },
            { name: 'Equilibrio a una pierna', sets: 2, reps: '20s por pierna', rest: '60s', notes: 'Cerca de una pared o silla' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Movilidad general',
        sections: {
          movilidad: [
            { name: 'Saludo al sol dinámico', sets: 2, reps: '5', rest: '30s' },
            { name: 'Flexión-extensión rodilla', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas Copa', sets: 2, reps: '10', weight: 'Muy liviano o corporal', rest: '90s' },
            { name: 'Remo a un brazo', sets: 2, reps: '10 por lado', weight: 'Liviano', rest: '90s' },
            { name: 'Elevaciones de talones y puntas', sets: 2, reps: '12', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Estiramiento isquios en banco', sets: 2, reps: '25s por pierna', rest: '30s' },
            { name: 'Caminata suave', sets: 1, reps: '10-15 minutos', rest: '0s' },
          ],
        },
      },
    ],
    notes: 'Prioridad absoluta: técnica, control y seguridad. Aumentar carga solo cuando el movimiento sea impecable.',
  },

  // ── DESCENSO DE PESO (3 DÍAS) ───────────────────────────────────────────
  {
    id: 'starter-descenso-peso-3d',
    name: 'Descenso de Peso (3 días)',
    description: 'Circuitos metabólicos de cuerpo completo para maximizar gasto calórico en 3 días por semana.',
    trainingObjective: 'Descenso de peso',
    level: 'Principiante',
    daysPerWeek: 3,
    gender: 'unisex',
    duration: '40-50 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Circuito A',
        sections: {
          movilidad: [
            { name: 'Jumping Jacks', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas Copa', sets: 3, reps: '15', weight: 'Liviano', rest: '45s', notes: 'Circuito: pasar de un ejercicio al siguiente' },
            { name: 'Escaladores', sets: 3, reps: '30s', rest: '45s' },
            { name: 'Remo sentado', sets: 3, reps: '15', weight: 'Liviano', rest: '45s' },
            { name: 'Estocadas caminadas', sets: 3, reps: '12 por pierna', weight: 'Corporal', rest: '45s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '30s', rest: '30s' },
            { name: 'Soga', sets: 3, reps: '45s', rest: '45s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Circuito B',
        sections: {
          movilidad: [
            { name: 'Talones a la cola', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Rotaciones de brazos', sets: 2, reps: '10 por dirección', rest: '30s' },
          ],
          principal: [
            { name: 'Burpee Completo', sets: 3, reps: '8-10', rest: '60s' },
            { name: 'Flexiones de brazos en el suelo', sets: 3, reps: '10-12', rest: '45s' },
            { name: 'Peso Muerto con mancuernas', sets: 3, reps: '12', weight: 'Moderado', rest: '45s' },
            { name: 'Saltos lado a lado', sets: 3, reps: '30s', rest: '45s' },
          ],
          core_cardio: [
            { name: 'Twist', sets: 3, reps: '15 por lado', rest: '30s' },
            { name: 'Escaladores', sets: 3, reps: '20s', rest: '40s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Intervalos + fuerza',
        sections: {
          movilidad: [
            { name: 'Jumping Jacks', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadilla con Salto', sets: 4, reps: '10', rest: '60s' },
            { name: 'Remo a un brazo', sets: 3, reps: '12 por lado', weight: 'Moderado', rest: '45s' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 3, reps: '12', weight: 'Liviano', rest: '45s' },
            { name: 'Intermitente 30x30', sets: 1, reps: '10 minutos', rest: '0s', notes: '30s fuerte / 30s suave en bici, cinta o soga' },
          ],
          core_cardio: [
            { name: 'V ups', sets: 3, reps: '10', rest: '30s' },
            { name: 'Plancha lateral', sets: 3, reps: '20s por lado', rest: '30s' },
          ],
        },
      },
    ],
    notes: 'La clave está en mantener los descansos cortos. Acompañar con plan de alimentación.',
  },

  // ── HIPERTROFIA (4 DÍAS) ────────────────────────────────────────────────
  {
    id: 'starter-hipertrofia-4d',
    name: 'Hipertrofia (4 días)',
    description: 'Split de 4 días empuje/tracción para ganar masa muscular. Volumen moderado-alto, rango 8-12.',
    trainingObjective: 'Hipertrofia',
    level: 'Intermedio',
    daysPerWeek: 4,
    gender: 'unisex',
    duration: '60-75 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Empuje (pecho/hombros/tríceps)',
        sections: {
          movilidad: [
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Press de banca plano', sets: 4, reps: '8-10', weight: '70-75% 1RM', rest: '2min' },
            { name: 'Press mancuernas banco inclinado', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 3, reps: '10', weight: 'Moderado', rest: '90s' },
            { name: 'Vuelos laterales de pie con mancuernas', sets: 3, reps: '12-15', weight: 'Liviano', rest: '60s' },
            { name: 'Extensiones de tríceps en polea alta con cuerda', sets: 3, reps: '12-15', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '40s', rest: '45s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Piernas A (cuádriceps dominante)',
        sections: {
          movilidad: [
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas con barra', sets: 4, reps: '8-10', weight: '70-75% 1RM', rest: '2-3min' },
            { name: 'Prensa 45', sets: 3, reps: '10-12', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Estocadas caminadas', sets: 3, reps: '10 por pierna', weight: 'Moderado', rest: '90s' },
            { name: 'Sillón de cuadriceps', sets: 3, reps: '12-15', weight: 'Moderado', rest: '60s' },
            { name: 'Gemelos de Pie', sets: 4, reps: '12-15', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Rueda abdominal', sets: 3, reps: '8-10', rest: '60s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Tracción (espalda/bíceps)',
        sections: {
          movilidad: [
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Dominadas en barra fija', sets: 4, reps: '6-10', weight: 'Corporal o asistidas', rest: '2min' },
            { name: 'Remos con barra', sets: 4, reps: '8-10', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Remo sentado', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Face Pull', sets: 3, reps: '15', weight: 'Liviano', rest: '60s' },
            { name: 'Biceps con mancuernas', sets: 3, reps: '10-12', weight: 'Moderado', rest: '60s' },
            { name: 'Curl bíceps alterno tipo martillo', sets: 3, reps: '10-12', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Elevación de piernas colgado', sets: 3, reps: '10', rest: '60s' },
          ],
        },
      },
      {
        day: 4,
        name: 'Día 4 - Piernas B (posterior dominante)',
        sections: {
          movilidad: [
            { name: 'Liberación pelvica', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Peso muerto con barra', sets: 4, reps: '6-8', weight: '75% 1RM', rest: '2-3min' },
            { name: 'Hip Thrust con Barra', sets: 4, reps: '10-12', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Isquios en camilla', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Sentadilla Búlgara', sets: 3, reps: '8-10 por pierna', weight: 'Moderado', rest: '90s' },
            { name: 'Gemelos de Pie', sets: 4, reps: '15', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Press pallof', sets: 3, reps: '10 por lado', rest: '60s' },
          ],
        },
      },
    ],
    notes: 'Aumentar peso cuando se completen todas las series en el tope del rango. Dormir y comer acorde al objetivo.',
  },

  // ── FUERZA (5 DÍAS) ─────────────────────────────────────────────────────
  {
    id: 'starter-fuerza-5d',
    name: 'Fuerza (5 días)',
    description: 'Programa de fuerza avanzado centrado en los básicos: sentadilla, banca, peso muerto y press militar.',
    trainingObjective: 'Fuerza',
    level: 'Avanzado',
    daysPerWeek: 5,
    gender: 'unisex',
    duration: '75-90 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Sentadilla pesada',
        sections: {
          movilidad: [
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas con barra', sets: 5, reps: '5', weight: '80-85% 1RM', rest: '3min' },
            { name: 'Prensa 45', sets: 3, reps: '8', weight: 'Pesado', rest: '2min' },
            { name: 'Estocada atrás con mancuerna', sets: 3, reps: '8 por pierna', weight: 'Moderado', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Press pallof', sets: 3, reps: '10 por lado', rest: '60s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Press de banca pesado',
        sections: {
          movilidad: [
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Press de banca plano', sets: 5, reps: '5', weight: '80-85% 1RM', rest: '3min' },
            { name: 'Press mancuernas banco inclinado', sets: 3, reps: '8', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Fondos paralelas', sets: 3, reps: '8-10', weight: 'Corporal o lastrado', rest: '2min' },
            { name: 'Face Pull', sets: 3, reps: '15', weight: 'Liviano', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '45s', rest: '45s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Peso muerto pesado',
        sections: {
          movilidad: [
            { name: 'Liberación pelvica', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Peso muerto con barra', sets: 5, reps: '3-5', weight: '82-87% 1RM', rest: '3-4min' },
            { name: 'Remos con barra', sets: 4, reps: '6-8', weight: 'Pesado', rest: '2min' },
            { name: 'Dominadas en barra fija', sets: 4, reps: '6-8', weight: 'Corporal o lastrado', rest: '2min' },
          ],
          core_cardio: [
            { name: 'Elevación de piernas colgado', sets: 3, reps: '10', rest: '60s' },
          ],
        },
      },
      {
        day: 4,
        name: 'Día 4 - Press militar + accesorios',
        sections: {
          movilidad: [
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Press Militar', sets: 5, reps: '5', weight: '80% 1RM', rest: '3min' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 3, reps: '8', weight: 'Moderado', rest: '90s' },
            { name: 'Vuelos laterales de pie con mancuernas', sets: 3, reps: '12', weight: 'Liviano', rest: '60s' },
            { name: 'Extensiones de tríceps en polea alta con cuerda', sets: 3, reps: '10-12', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Rueda abdominal', sets: 3, reps: '8-10', rest: '60s' },
          ],
        },
      },
      {
        day: 5,
        name: 'Día 5 - Técnica y volumen liviano',
        sections: {
          movilidad: [
            { name: 'Saludo al sol dinámico', sets: 2, reps: '5', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas con barra', sets: 3, reps: '8', weight: '60-65% 1RM', rest: '2min', notes: 'Foco en velocidad y técnica' },
            { name: 'Press de banca plano', sets: 3, reps: '8', weight: '60-65% 1RM', rest: '2min' },
            { name: 'Hip Thrust con Barra', sets: 3, reps: '10', weight: 'Moderado', rest: '90s' },
            { name: 'Remo a un brazo', sets: 3, reps: '10 por lado', weight: 'Moderado', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Plancha lateral', sets: 3, reps: '30s por lado', rest: '45s' },
          ],
        },
      },
    ],
    notes: 'Programa exigente: requiere buena recuperación. Deload (semana liviana) cada 4-6 semanas.',
  },

  // ── ENTRENAMIENTO FUNCIONAL ─────────────────────────────────────────────
  {
    id: 'starter-funcional',
    name: 'Entrenamiento Funcional',
    description: 'Fuerza aplicada al movimiento: kettlebell, saltos, empujes y core anti-rotación. 3 días.',
    trainingObjective: 'Funcional',
    level: 'Intermedio',
    daysPerWeek: 3,
    gender: 'unisex',
    duration: '50-60 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Potencia y empuje',
        sections: {
          movilidad: [
            { name: 'Saludo al sol dinámico', sets: 2, reps: '5', rest: '30s' },
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Swing Ketbell', sets: 4, reps: '15', weight: 'Moderado', rest: '90s' },
            { name: 'Salto al Cajon', sets: 4, reps: '6', rest: '90s' },
            { name: 'Flexiones de brazos en el suelo', sets: 3, reps: '12-15', rest: '60s' },
            { name: 'Press de Hombros de Pie con mancuernas', sets: 3, reps: '10', weight: 'Moderado', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Press pallof', sets: 3, reps: '10 por lado', rest: '45s' },
            { name: 'Plancha lateral', sets: 3, reps: '30s por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Tracción y unilateral',
        sections: {
          movilidad: [
            { name: 'Gato contento-enojado', sets: 2, reps: '10', rest: '30s' },
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Remo a un brazo', sets: 4, reps: '10 por lado', weight: 'Moderado-pesado', rest: '90s' },
            { name: 'Sentadilla Búlgara', sets: 3, reps: '8 por pierna', weight: 'Moderado', rest: '90s' },
            { name: 'Dominadas en barra fija', sets: 3, reps: '6-10', weight: 'Corporal o asistidas', rest: '2min' },
            { name: 'Estocada lateral', sets: 3, reps: '8 por lado', weight: 'Corporal o liviano', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Bird Dog', sets: 3, reps: '10 por lado', rest: '45s' },
            { name: 'Twist', sets: 3, reps: '15 por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Circuito metabólico',
        sections: {
          movilidad: [
            { name: 'Jumping Jacks', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Burpee Completo', sets: 4, reps: '10', rest: '60s', notes: 'Circuito: pasar de un ejercicio al siguiente' },
            { name: 'Swing Ketbell', sets: 4, reps: '15', weight: 'Moderado', rest: '60s' },
            { name: 'Escaladores', sets: 4, reps: '30s', rest: '60s' },
            { name: 'Estocadas caminadas', sets: 4, reps: '12 por pierna', weight: 'Corporal', rest: '60s' },
          ],
          core_cardio: [
            { name: 'V ups', sets: 3, reps: '10', rest: '45s' },
            { name: 'Soga', sets: 3, reps: '45s', rest: '45s' },
          ],
        },
      },
    ],
    notes: 'Movimientos explosivos siempre con técnica perfecta. Escalar los saltos según el nivel del cliente.',
  },

  // ── ENTRENAMIENTO EN CASA (SIN EQUIPAMIENTO) ────────────────────────────
  {
    id: 'starter-en-casa-sin-equipo',
    name: 'Entrenamiento en Casa (sin equipamiento)',
    description: 'Cuerpo completo con peso corporal, para entrenar en casa sin ningún equipamiento. 3 días.',
    trainingObjective: 'En Casa',
    level: 'Principiante',
    daysPerWeek: 3,
    gender: 'unisex',
    duration: '30-40 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Cuerpo completo',
        sections: {
          movilidad: [
            { name: 'Jumping Jacks', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas sin peso', sets: 3, reps: '15', rest: '60s' },
            { name: 'Flexiones de brazos en el suelo', sets: 3, reps: '8-12', rest: '60s', notes: 'Sobre rodillas si hace falta' },
            { name: 'Estocadas caminadas', sets: 3, reps: '10 por pierna', rest: '60s' },
            { name: 'Control Pelvico', sets: 3, reps: '15', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '30s', rest: '45s' },
            { name: 'Escaladores', sets: 3, reps: '20s', rest: '40s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Core y cardio',
        sections: {
          movilidad: [
            { name: 'Talones a la cola', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Gato contento-enojado', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Burpee Completo', sets: 3, reps: '8', rest: '60s' },
            { name: 'Sentadilla isométrica', sets: 3, reps: '30s', rest: '60s', notes: 'Contra la pared' },
            { name: 'Flexiones de brazos sobre banco', sets: 3, reps: '10-12', rest: '60s', notes: 'Usar silla o mesa firme' },
            { name: 'Saltos lado a lado', sets: 3, reps: '30s', rest: '45s' },
          ],
          core_cardio: [
            { name: 'Dead bug', sets: 3, reps: '10 por lado', rest: '45s' },
            { name: 'Twist', sets: 3, reps: '15 por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Fuerza con peso corporal',
        sections: {
          movilidad: [
            { name: 'Saludo al sol dinámico', sets: 2, reps: '5', rest: '30s' },
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadilla con Salto', sets: 3, reps: '10', rest: '60s' },
            { name: 'Flexiones de brazos con pies elevados', sets: 3, reps: '8-10', rest: '60s', notes: 'Pies sobre silla o cama' },
            { name: 'Estocada atrás con giro', sets: 3, reps: '8 por lado', rest: '60s' },
            { name: 'Puente de glúteo rodilla cruzada', sets: 3, reps: '10 por lado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'V ups', sets: 3, reps: '8-10', rest: '45s' },
            { name: 'Plancha lateral', sets: 3, reps: '20s por lado', rest: '45s' },
          ],
        },
      },
    ],
    notes: 'Progresar con más repeticiones, menos descanso o variantes más difíciles. No hace falta ningún equipo.',
  },

  // ── TORSO / PIERNA ──────────────────────────────────────────────────────
  {
    id: 'starter-torso-pierna',
    name: 'Torso / Pierna (4 días)',
    description: 'Split clásico torso/pierna de 4 días: fuerza e hipertrofia balanceadas, dos frecuencias por grupo.',
    trainingObjective: 'Torso/Pierna',
    level: 'Intermedio',
    daysPerWeek: 4,
    gender: 'unisex',
    duration: '60-70 minutos',
    days: [
      {
        day: 1,
        name: 'Día 1 - Torso fuerza',
        sections: {
          movilidad: [
            { name: 'Movilidad de hombros', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Press de banca plano', sets: 4, reps: '6-8', weight: '75-80% 1RM', rest: '2-3min' },
            { name: 'Remos con barra', sets: 4, reps: '6-8', weight: 'Pesado', rest: '2-3min' },
            { name: 'Press Militar', sets: 3, reps: '8', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Dorsal al frente en polea', sets: 3, reps: '10', weight: 'Moderado', rest: '90s' },
          ],
          core_cardio: [
            { name: 'Plancha baja', sets: 3, reps: '40s', rest: '45s' },
          ],
        },
      },
      {
        day: 2,
        name: 'Día 2 - Pierna fuerza',
        sections: {
          movilidad: [
            { name: 'Movilidad de cadera', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Sentadillas con barra', sets: 4, reps: '6-8', weight: '75-80% 1RM', rest: '2-3min' },
            { name: 'Peso muerto con barra', sets: 3, reps: '6', weight: '75-80% 1RM', rest: '3min' },
            { name: 'Prensa 45', sets: 3, reps: '10', weight: 'Pesado', rest: '2min' },
            { name: 'Gemelos de Pie', sets: 4, reps: '12', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Elevación de piernas colgado', sets: 3, reps: '10', rest: '60s' },
          ],
        },
      },
      {
        day: 3,
        name: 'Día 3 - Torso hipertrofia',
        sections: {
          movilidad: [
            { name: 'Apertura toracica', sets: 2, reps: '8 por lado', rest: '30s' },
          ],
          principal: [
            { name: 'Press mancuernas banco inclinado', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Dominadas en barra fija', sets: 3, reps: '8-10', weight: 'Corporal o asistidas', rest: '2min' },
            { name: 'Remo sentado', sets: 3, reps: '10-12', weight: 'Moderado', rest: '90s' },
            { name: 'Vuelos laterales de pie con mancuernas', sets: 3, reps: '12-15', weight: 'Liviano', rest: '60s' },
            { name: 'Biceps con mancuernas', sets: 3, reps: '10-12', weight: 'Moderado', rest: '60s' },
            { name: 'Extensiones de tríceps en polea alta con cuerda', sets: 3, reps: '12', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Press pallof', sets: 3, reps: '10 por lado', rest: '45s' },
          ],
        },
      },
      {
        day: 4,
        name: 'Día 4 - Pierna hipertrofia',
        sections: {
          movilidad: [
            { name: 'Liberación pelvica', sets: 2, reps: '10', rest: '30s' },
          ],
          principal: [
            { name: 'Hip Thrust con Barra', sets: 4, reps: '10-12', weight: 'Moderado-pesado', rest: '2min' },
            { name: 'Sentadilla Búlgara', sets: 3, reps: '10 por pierna', weight: 'Moderado', rest: '90s' },
            { name: 'Isquios en camilla', sets: 3, reps: '12', weight: 'Moderado', rest: '90s' },
            { name: 'Sillón de cuadriceps', sets: 3, reps: '12-15', weight: 'Moderado', rest: '60s' },
            { name: 'Gemelos de Pie', sets: 4, reps: '15', weight: 'Moderado', rest: '60s' },
          ],
          core_cardio: [
            { name: 'Rueda abdominal', sets: 3, reps: '10', rest: '60s' },
          ],
        },
      },
    ],
    notes: 'Días 1-2 con cargas pesadas y rango bajo; días 3-4 con volumen y rango medio-alto. Descanso entre bloques: 48hs por grupo.',
  },
];
