import { Router } from 'express';
const router = Router();

// Importa los controladores de reseñas
import {
    createReview,
    updateReview,
    markReviewDeleted,
} from '../controllers/reviewsController.js';

// Importa el middleware de autenticación JWT
import authenticateJWT from '../middleware/authenticateJWT.js';

// Rutas para reseñas
router.post('/:restaurantId', authenticateJWT, createReview);

// Rutas protegidas por JWT
router.patch('/:restaurantId/:id', authenticateJWT, updateReview);
router.delete('/:restaurantId/:id', authenticateJWT, markReviewDeleted);

export default router;

