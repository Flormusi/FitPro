import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_EMAIL = 'demo@fitpro.com';

/** GET /api/auth/demo — devuelve un token para el usuario demo */
export const demoLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    if (String(process.env.DEMO_ENABLED || '').toLowerCase() !== 'true') {
      res.status(404).json({ success: false, message: 'Demo no disponible' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: DEMO_EMAIL },
      select: {
        id: true, email: true, role: true, name: true,
        hasCompletedOnboarding: true,
        subscription: { select: { status: true, plan: true } },
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'Cuenta demo no configurada. Ejecutá el seed primero.' });
      return;
    }

    const secret = process.env.JWT_SECRET!;
    const options: SignOptions = { expiresIn: '4h' };
    const token = jwt.sign({ id: user.id }, secret, options);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error('[demo] demoLogin error:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

/** POST /api/admin/seed-demo — crea el trainer demo con alumnos y rutinas de muestra */
export const seedDemo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Crear o encontrar usuario demo
    let demoUser = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

    if (!demoUser) {
      const hashed = await bcrypt.hash('DemoFitPro2026!', 10);
      demoUser = await prisma.user.create({
        data: {
          name: 'Demo Trainer',
          email: DEMO_EMAIL,
          password: hashed,
          role: 'TRAINER',
          hasCompletedOnboarding: true,
          subscription: {
            create: { plan: 'PREMIUM', status: 'ACTIVE' },
          },
        },
      });
    } else {
      // Asegurar suscripción activa
      await prisma.subscription.upsert({
        where: { userId: demoUser.id },
        update: { status: 'ACTIVE', plan: 'PREMIUM' },
        create: { userId: demoUser.id, plan: 'PREMIUM', status: 'ACTIVE' },
      });
    }

    // Limpiar datos demo anteriores
    await prisma.routine.deleteMany({ where: { trainerId: demoUser.id } });

    // Eliminar relaciones trainer-client anteriores y los clientes demo
    const prevRelations = await prisma.trainerClient.findMany({ where: { trainerId: demoUser.id } });
    const prevClientIds = prevRelations.map(r => r.clientId);
    await prisma.trainerClient.deleteMany({ where: { trainerId: demoUser.id } });
    if (prevClientIds.length) {
      await prisma.clientProfile.deleteMany({ where: { userId: { in: prevClientIds } } });
      await prisma.user.deleteMany({ where: { id: { in: prevClientIds } } });
    }

    // Crear alumnos demo
    const clientsData = [
      { name: 'Carlos Méndez',    email: 'carlos.demo@fitpro.com',    goal: 'Ganar masa muscular',     days: 4, weight: 78 },
      { name: 'Valentina Ruiz',   email: 'valentina.demo@fitpro.com', goal: 'Bajar de peso',            days: 3, weight: 62 },
      { name: 'Marcos Fernández', email: 'marcos.demo@fitpro.com',    goal: 'Mejorar rendimiento',      days: 5, weight: 85 },
      { name: 'Sofía López',      email: 'sofia.demo@fitpro.com',     goal: 'Tonificar',                days: 3, weight: 58 },
      { name: 'Lucas García',     email: 'lucas.demo@fitpro.com',     goal: 'Fuerza y resistencia',     days: 4, weight: 90 },
    ];

    const hashed = await bcrypt.hash('DemoClient2026!', 10);
    const createdClients = [];

    for (const c of clientsData) {
      const client = await prisma.user.create({
        data: {
          name: c.name,
          email: c.email,
          password: hashed,
          role: 'CLIENT',
          hasCompletedOnboarding: true,
          clientProfile: {
            create: {
              name: c.name,
              goals: [c.goal],
              weight: c.weight,
              trainingDaysPerWeek: c.days,
              initialObjective: c.goal,
            },
          },
        },
      });
      await prisma.trainerClient.create({
        data: { trainerId: demoUser.id, clientId: client.id },
      });
      createdClients.push(client);
    }

    // Helper para generar URL de Cloudinary
    const cdn = (publicId: string) =>
      `https://res.cloudinary.com/dsflesvzj/image/upload/c_fit,w_300,h_200,f_auto,q_auto/${publicId}`;

    // Crear rutinas demo con nombres y URLs exactas del mapa de ejercicios
    const routinesData = [
      {
        name: 'Full Body - Fuerza',
        description: 'Rutina completa de fuerza para 3 días por semana',
        clientIndex: 0,
        exercises: [
          { name: 'Sentadillas con barra', sets: 4, reps: 8, weight: 80, restSeconds: 90,  imageUrl: cdn('Sentadillas_con_barra_ahjld7') },
          { name: 'Press de banca plano',  sets: 4, reps: 8, weight: 70, restSeconds: 90,  imageUrl: cdn('Press_de_banca_plano_ukvqzd') },
          { name: 'Peso muerto con barra', sets: 3, reps: 6, weight: 100, restSeconds: 120, imageUrl: cdn('Peso_muerto_con_barra_vuuoxv') },
          { name: 'Dominadas en barra fija', sets: 3, reps: 8, weight: 0, restSeconds: 90, imageUrl: cdn('Dominadas_en_barra_fija_nioao6') },
        ],
      },
      {
        name: 'Cardio + Core',
        description: 'Rutina de cardio funcional y core',
        clientIndex: 1,
        exercises: [
          { name: 'Burpee Completo',  sets: 4, reps: 15, weight: 0, restSeconds: 60, imageUrl: cdn('Burpee_Completo_c2nha3') },
          { name: 'Plancha baja',     sets: 3, reps: 1,  weight: 0, restSeconds: 45, imageUrl: cdn('Plancha_baja_fe82xz') },
          { name: 'Escaladores',      sets: 3, reps: 20, weight: 0, restSeconds: 45, imageUrl: cdn('Escaladores_lft6ug') },
          { name: 'Soga',             sets: 3, reps: 60, weight: 0, restSeconds: 60, imageUrl: cdn('Soga_heyxy0') },
        ],
      },
      {
        name: 'Tren Superior',
        description: 'Enfocado en pecho, hombros y espalda',
        clientIndex: 2,
        exercises: [
          { name: 'Press Militar',                        sets: 4, reps: 10, weight: 50, restSeconds: 90, imageUrl: cdn('Press_Militar_nhjfsw') },
          { name: 'Remos con barra',                      sets: 4, reps: 10, weight: 60, restSeconds: 90, imageUrl: cdn('Remos_con_barra_kgswja') },
          { name: 'Aperturas mancuernas banco plano',     sets: 3, reps: 12, weight: 18, restSeconds: 60, imageUrl: cdn('Aperturas_mancuernas_banco_plano_jysgao') },
          { name: 'Face Pull',                            sets: 3, reps: 15, weight: 20, restSeconds: 60, imageUrl: cdn('Face_Pull_yaymsh') },
        ],
      },
      {
        name: 'Tren Inferior - Glúteos',
        description: 'Rutina de piernas enfocada en glúteos y cuádriceps',
        clientIndex: 3,
        exercises: [
          { name: 'Hip Thrust con Barra',           sets: 4, reps: 12, weight: 60, restSeconds: 90, imageUrl: cdn('Hip_Thrust_con_Barra_mspzfl') },
          { name: 'Sentadilla sumo con barra',      sets: 3, reps: 12, weight: 50, restSeconds: 75, imageUrl: cdn('Sentadilla_sumo_con_barra_bt7l5f') },
          { name: 'Estocadas caminadas',            sets: 3, reps: 10, weight: 20, restSeconds: 60, imageUrl: cdn('Estocadas_caminadas_h6epkt') },
          { name: 'Patada Gluteo polea pierna recta', sets: 3, reps: 15, weight: 15, restSeconds: 60, imageUrl: cdn('Patada_Gluteo_polea_pierna_recta_y8tgcc') },
        ],
      },
      {
        name: 'Funcional Avanzado',
        description: 'Alta intensidad para atletas con experiencia',
        clientIndex: 4,
        exercises: [
          { name: 'Sentadilla Búlgara',  sets: 4, reps: 8,  weight: 40, restSeconds: 90, imageUrl: cdn('Sentadilla_Búlgara_jamqwb') },
          { name: 'Swing Ketbell',       sets: 4, reps: 20, weight: 24, restSeconds: 60, imageUrl: cdn('Swing_Ketbell_tgwey7') },
          { name: 'Plancha lateral',     sets: 3, reps: 1,  weight: 0,  restSeconds: 45, imageUrl: cdn('Plancha_lateral_xlup7o') },
          { name: 'Remo a un brazo',     sets: 3, reps: 12, weight: 28, restSeconds: 60, imageUrl: cdn('Remo_a_un_brazo_izmkjf') },
        ],
      },
    ];

    for (const r of routinesData) {
      await prisma.routine.create({
        data: {
          name: r.name,
          description: r.description,
          trainerId: demoUser.id,
          clientId: createdClients[r.clientIndex].id,
          exercises: r.exercises as any,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Demo seed completado',
      data: {
        trainer: demoUser.email,
        clients: createdClients.length,
        routines: routinesData.length,
      },
    });
  } catch (error: any) {
    console.error('[demo] seedDemo error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error interno del servidor' });
  }
};
