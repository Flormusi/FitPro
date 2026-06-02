import { Response, NextFunction, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_EMAIL = 'demo@fitpro.com';

/**
 * Bloquea operaciones de escritura para la cuenta demo.
 * GET siempre pasa; POST/PUT/PATCH/DELETE devuelven 403.
 */
export const blockDemoWrites = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userEmail = req.user?.email;
  if (userEmail === DEMO_EMAIL && req.method !== 'GET') {
    res.status(403).json({
      success: false,
      message: 'La cuenta demo es de solo lectura. Creá tu cuenta para usar esta función.',
      isDemo: true,
    });
    return;
  }
  next();
};

/**
 * Verifica que el trainer autenticado tenga una suscripción activa.
 * Debe usarse DESPUÉS de `protect` y `authorize([Role.TRAINER])`.
 * Devuelve 403 si el plan está INACTIVE o CANCELLED.
 */
export const requireActiveSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'No autenticado' });
      return;
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { status: true },
    });

    const status = subscription?.status ?? 'INACTIVE';
    if (status === 'ACTIVE' || status === 'TRIALING') {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Tu suscripción no está activa. Contactanos para activar tu plan.',
      subscriptionStatus: status,
    });
  } catch (error) {
    console.error('[subscriptionMiddleware] Error:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
