import { Router } from 'express';
const router = Router();

// Importa el controlador de órdenes
import { createOrder, getUserOrders, markOrderCompleted, markOrderCancelled } from '../controllers/ordersController.js';

// Importa el middleware de autenticación JWT
import authenticateJWT from '../middleware/authenticateJWT.js';

// Rutas para órdenes
router.post('/', authenticateJWT, createOrder);
router.get('/me', authenticateJWT, getUserOrders);

// Rutas protegidas por JWT
router.patch('/:id', authenticateJWT, markOrderCompleted);
router.delete('/:id', authenticateJWT, markOrderCancelled);

export default router;
