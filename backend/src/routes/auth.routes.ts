// src/routes/auth.routes.ts

import { Router } from 'express';
import {
  register,
  login,
} from '../controllers/auth.controller';
import { demoLogin } from '../controllers/demo.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/demo', demoLogin);
// router.get('/me', protect, getMe); // Comentado
// router.post('/forgotpassword', forgotPassword); // Comentado
// router.put('/resetpassword/:resettoken', resetPassword); // Comentado
// router.put('/updateprofile', protect, updateProfile); // Comentado

export default router;