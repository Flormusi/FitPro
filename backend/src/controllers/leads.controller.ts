import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const captureLead = async (req: Request, res: Response): Promise<void> => {
  const { email, name } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, message: 'Email inválido.' });
    return;
  }

  try {
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Lead" (id, email, name, source, "createdAt")
       VALUES (gen_random_uuid()::text, $1, $2, 'landing', NOW())
       ON CONFLICT (email) DO NOTHING`,
      email.toLowerCase().trim(),
      name?.trim() || null
    );

    res.json({ success: true, message: '¡Gracias! Te avisamos cuando esté listo.' });
  } catch (error) {
    console.error('[leads] Error:', error);
    res.status(500).json({ success: false, message: 'Error al guardar. Intentá de nuevo.' });
  }
};

export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await prisma.$queryRawUnsafe(
      `SELECT * FROM "Lead" ORDER BY "createdAt" DESC`
    );
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener leads.' });
  }
};
