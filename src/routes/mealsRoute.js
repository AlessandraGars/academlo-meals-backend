import { Router } from 'express';
const router = Router();

// Importa los controladores de comidas
import {
    createMeal,
    getAllMeals,
    getMealDetails,
    updateMeal,
    disableMeal,
} from '../controllers/mealsController.js';

// Importa el middleware de autenticación JWT
import authenticateJWT from '../middleware/authenticateJWT.js';

// Rutas para comidas
router.post('/:id', authenticateJWT, createMeal);
router.get('/', getAllMeals);
router.get('/:id', getMealDetails);

// Rutas protegidas por JWT
router.patch('/:id', authenticateJWT, updateMeal);
router.delete('/:id', authenticateJWT, disableMeal);

export default router;
