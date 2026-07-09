// Ilustraciones propias de FitPro (estilo índigo/violeta).
// Tienen prioridad sobre las fotos de Cloudinary en getExerciseImageUrl.
// Servidas desde public/images/illustrations/ (JPEG 640px, ~50-100KB c/u).

const BASE = '/images/illustrations';

export const localExerciseImages: Record<string, string> = {
  // Pecho
  'Press de banca plano': `${BASE}/press-banca-plano.jpg`,
  'Press de banca inclinado': `${BASE}/press-banca-inclinado.jpg`,
  'Press mancuernas banco plano': `${BASE}/press-mancuernas-banco-plano.jpg`,
  'Press mancuernas banco inclinado': `${BASE}/press-mancuernas-banco-inclinado.jpg`,
  'Aperturas mancuernas banco plano': `${BASE}/aperturas-mancuernas-banco-plano.jpg`,
  'Flexiones de brazos en el suelo': `${BASE}/flexiones-brazos-suelo.jpg`,

  // Espalda
  'Dominadas en barra fija': `${BASE}/dominadas-barra-fija.jpg`,
  'Dominadas en barra fija, agarre en supinación': `${BASE}/dominadas-supinas.jpg`,
  'Dorsal al frente en polea': `${BASE}/dorsal-al-frente-polea.jpg`,
  'Remo sentado': `${BASE}/remo-sentado.jpg`,
  'Remo a un brazo': `${BASE}/remo-a-un-brazo.jpg`,
  'Remos con barra': `${BASE}/remos-con-barra.jpg`,

  // Hombros
  'Press Militar': `${BASE}/press-militar.jpg`,
  'Press de Hombros de Pie con mancuernas': `${BASE}/press-hombros-de-pie-mancuernas.jpg`,
  'Vuelos laterales de pie con mancuernas': `${BASE}/vuelos-laterales-de-pie.jpg`,
  'Face Pull': `${BASE}/face-pull.jpg`,

  // Bíceps
  'Biceps en banco scott': `${BASE}/biceps-banco-scott.jpg`,
  'Biceps con mancuernas': `${BASE}/biceps-con-mancuernas.jpg`,
  'Curl bíceps alterno tipo martillo': `${BASE}/curl-biceps-martillo.jpg`,

  // Tríceps
  'Fondos paralelas': `${BASE}/fondos-paralelas.jpg`,
  'Press francés en banco plano': `${BASE}/press-frances-banco-plano.jpg`,
  'Extensión vertical de codos con mancuerna': `${BASE}/extension-vertical-codos-mancuerna.jpg`,
  'Extensiones de tríceps en polea alta con cuerda': `${BASE}/extension-triceps-polea-cuerda.jpg`,

  // Piernas
  'Sillón de cuadriceps': `${BASE}/sillon-de-cuadriceps.jpg`,
  'Estocadas caminadas': `${BASE}/estocadas-caminadas.jpg`,
  'Subidas al cajon': `${BASE}/subidas-al-cajon.jpg`,
  'Isquios en camilla': `${BASE}/isquios-en-camilla.jpg`,
  'Peso Muerto con mancuernas': `${BASE}/peso-muerto-con-mancuernas.jpg`,
  'Gemelos de Pie': `${BASE}/gemelos-de-pie.jpg`,

  // Glúteos
  'Hip Thrust con Barra': `${BASE}/hip-thrust-con-barra.jpg`,
  'Control Pelvico': `${BASE}/control-pelvico.jpg`,

  // Core
  'Escaladores': `${BASE}/escaladores.jpg`,
  'Elevación de piernas colgado': `${BASE}/elevacion-piernas-colgado.jpg`,
  'Dead bug': `${BASE}/dead-bug.jpg`,
  'Rueda abdominal': `${BASE}/rueda-abdominal.jpg`,
  'Twist': `${BASE}/twist.jpg`,
  'Plancha baja': `${BASE}/plancha-baja.jpg`,
};
