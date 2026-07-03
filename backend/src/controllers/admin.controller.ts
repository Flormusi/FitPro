import { Request, Response } from 'express';
import { PrismaClient, SubscriptionStatus, SubscriptionPlan } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/** GET /api/admin/trainers — lista todos los trainers con su suscripción */
export const listTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await prisma.user.findMany({
      where: { role: 'TRAINER' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        subscription: {
          select: { id: true, plan: true, status: true, updatedAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    console.error('[admin] listTrainers error:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

/** PATCH /api/admin/trainers/:trainerId/subscription — activa o desactiva el plan */
export const updateSubscriptionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { trainerId } = req.params;
    const { status, plan } = req.body as { status: SubscriptionStatus; plan?: SubscriptionPlan };

    const allowedStatuses = Object.values(SubscriptionStatus);
    if (!allowedStatuses.includes(status)) {
      res.status(400).json({ success: false, message: `Estado inválido. Opciones: ${allowedStatuses.join(', ')}` });
      return;
    }

    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
      select: { role: true, subscription: { select: { id: true } } },
    });

    if (!trainer || trainer.role !== 'TRAINER') {
      res.status(404).json({ success: false, message: 'Trainer no encontrado' });
      return;
    }

    let subscription;
    if (trainer.subscription) {
      subscription = await prisma.subscription.update({
        where: { userId: trainerId },
        data: {
          status,
          ...(plan && { plan }),
          ...(status === 'ACTIVE' && { currentPeriodStart: new Date() }),
        },
      });
    } else {
      subscription = await prisma.subscription.create({
        data: {
          userId: trainerId,
          plan: plan || 'BASIC',
          status,
          ...(status === 'ACTIVE' && { currentPeriodStart: new Date() }),
        },
      });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.error('[admin] updateSubscriptionStatus error:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

/** POST /api/admin/reset-password — resetea la contraseña de un usuario */
export const resetUserPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as { email: string };
    if (!email) {
      res.status(400).json({ success: false, message: 'Email requerido' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }

    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
    const hashed = await bcrypt.hash(tempPassword, 10);

    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    res.json({ success: true, tempPassword, name: user.name, email: user.email });
  } catch (error) {
    console.error('[admin] resetUserPassword error:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
