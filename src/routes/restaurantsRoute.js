import { Router } from 'express';
import { check, validationResult } from 'express-validator'; // Importa express-validator
const router = Router();

// Importa los controladores de restaurantes
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantDetails,
    updateRestaurant,
    disableRestaurant,
} from '../controllers/restaurantsController.js';

// Importa el middleware de autenticación JWT
import authenticateJWT from '../middleware/authenticateJWT.js';

// Ruta para crear restaurantes con validación
router.post('/', [
    // Aplica las reglas de validación
    check('name').notEmpty().withMessage('El nombre del restaurante es obligatorio'),
    check('address').notEmpty().withMessage('La dirección del restaurante es obligatoria'),
    check('rating').isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número del 1 al 5'),
], (req, res) => {
    // Maneja los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Llama al controlador para crear restaurantes
    createRestaurant(req, res);
});

// Ruta para obtener todos los restaurantes
router.get('/', getAllRestaurants);

// Ruta para obtener detalles de un restaurante por su ID
router.get('/:id', getRestaurantDetails);

// Rutas protegidas por JWT
router.patch('/:id', authenticateJWT, updateRestaurant);
router.delete('/:id', authenticateJWT, disableRestaurant);

export default router;
