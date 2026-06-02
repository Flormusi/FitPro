import { Router, Request, Response, NextFunction } from 'express';
import { listTrainers, updateSubscriptionStatus } from '../controllers/admin.controller';

const router = Router();

/** Middleware: valida que el header X-Admin-Key coincida con ADMIN_SECRET */
const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    res.status(500).json({ success: false, message: 'ADMIN_SECRET no configurado en el servidor' });
    return;
  }
  if (req.headers['x-admin-key'] !== secret) {
    res.status(401).json({ success: false, message: 'Clave de admin inválida' });
    return;
  }
  next();
};

router.get('/trainers', adminAuth, listTrainers);
router.patch('/trainers/:trainerId/subscription', adminAuth, updateSubscriptionStatus);

export default router;
