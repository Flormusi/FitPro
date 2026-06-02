import { Router } from 'express';
// Importar funciones del controlador mejorado
import {
  getDashboardData,
  getExercises,
  createExercise,
  getTrainerClients,
  getAnalytics
} from '../controllers/trainer.controller.improved';

// Importar el resto de funciones del controlador original
import {
  getUnassignedWorkoutPlans,
  getAllWorkoutPlans,
  createWorkoutPlan,
  deleteWorkoutPlan,
  updateExercise,
  deleteExercise,
  getRoutines,
  getRoutineById,
  createClientRoutine as createRoutine,
  updateRoutine,
  deleteRoutine,
  assignRoutineToClient,
  getRoutineAssignments,
  removeRoutineAssignment,
  removeClientRoutine,
  resendRoutineEmail,
  updateClientInfo,
  getNutritionPlans,
  createNutritionPlan,
  updateNutritionPlan,
  deleteNutritionPlan,
  getProfile,
  updateProfile,
  getClientNotifications,
  markNotificationAsRead,
  getClientProgressByTrainer,
  markAllNotificationsAsRead,
  getUnreadNotifications,
  createTestNotification
} from '../controllers/trainerController';
import { addClientByTrainer, getClientById, getClientRoutines } from '../controllers/client.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { requestMiddleware } from '../middleware/request.middleware';
import { requireActiveSubscription, blockDemoWrites } from '../middleware/subscription.middleware';
import { Role } from '@prisma/client';
import { RequestWithUser } from '../types/express';

const router = Router();

// Todas las rutas de trainer requieren suscripción activa; demo es solo lectura
const trainerGuard = [protect, requestMiddleware, authorize([Role.TRAINER]), requireActiveSubscription, blockDemoWrites];

// Client management
router.get('/clients', ...trainerGuard, getTrainerClients);
router.post('/clients', ...trainerGuard, addClientByTrainer);
router.get('/clients/:clientId', ...trainerGuard, getClientById);
router.put('/clients/:clientId', ...trainerGuard, updateClientInfo);
router.get('/clients/:clientId/routines', ...trainerGuard, getClientRoutines);
router.delete('/clients/:clientId/routines/:routineId', ...trainerGuard, removeClientRoutine);
router.post('/clients/:clientId/routines/:routineId/resend-email', ...trainerGuard, resendRoutineEmail);
router.get('/clients/:clientId/progress', ...trainerGuard, getClientProgressByTrainer);

router.get('/dashboard', ...trainerGuard, getDashboardData);

// Workout Plans management - ORDEN CORREGIDO
router.get('/workout-plans/unassigned', ...trainerGuard, getUnassignedWorkoutPlans);
router.get('/workout-plans', ...trainerGuard, getAllWorkoutPlans);
router.post('/workout-plans', ...trainerGuard, createWorkoutPlan);
router.delete('/workout-plans/:id', ...trainerGuard, deleteWorkoutPlan);

router.get('/exercises', ...trainerGuard, getExercises);
router.post('/exercises', ...trainerGuard, createExercise);
router.put('/exercises/:id', ...trainerGuard, updateExercise);
router.delete('/exercises/:id', ...trainerGuard, deleteExercise);

router.get('/routines', ...trainerGuard, getRoutines);
router.get('/routines/:id', ...trainerGuard, getRoutineById);
router.post('/routines', ...trainerGuard, createRoutine);
router.post('/routines/assign', ...trainerGuard, assignRoutineToClient);
router.get('/routines/assignments', ...trainerGuard, getRoutineAssignments);
router.delete('/routines/assignments/:assignmentId', ...trainerGuard, removeRoutineAssignment);
router.put('/routines/:id', ...trainerGuard, updateRoutine);
router.delete('/routines/:id', ...trainerGuard, deleteRoutine);

router.get('/nutrition-plans', ...trainerGuard, getNutritionPlans);
router.post('/nutrition-plans', ...trainerGuard, createNutritionPlan);
router.put('/nutrition-plans/:id', ...trainerGuard, updateNutritionPlan);
router.delete('/nutrition-plans/:id', ...trainerGuard, deleteNutritionPlan);

router.get('/profile', ...trainerGuard, getProfile);
router.put('/profile', ...trainerGuard, updateProfile);

router.get('/analytics', ...trainerGuard, getAnalytics);

// Obtener notificaciones del cliente
router.get('/notifications', ...trainerGuard, getClientNotifications);

// Marcar notificación como leída
router.put('/notifications/:notificationId/read', ...trainerGuard, markNotificationAsRead);

// Obtener notificaciones no leídas
router.get('/notifications/unread', ...trainerGuard, getUnreadNotifications);

// Marcar todas las notificaciones como leídas
router.put('/notifications/mark-all-read', ...trainerGuard, markAllNotificationsAsRead);

// Crear notificación de prueba (para testing)
router.post('/notifications/test', ...trainerGuard, createTestNotification);

export default router;