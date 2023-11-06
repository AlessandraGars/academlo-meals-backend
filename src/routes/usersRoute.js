import { Router } from 'express';
import { check, validationResult } from 'express-validator'; // Importa express-validator
const router = Router();

// Importa los controladores de usuarios
import {
    createUser,
    loginUser,
    updateUser,
    disableUser,
    getUserOrders,
    getOrderDetails,
} from '../controllers/usersController.js';

// Importa el middleware de autenticación JWT
import authenticateJWT from '../middleware/authenticateJWT.js';

// Ruta para crear usuarios con validación
router.post(
    '/signup',
    [
        // Aplica las reglas de validación
        check('name').notEmpty().withMessage('El nombre es obligatorio'),
        check('email').isEmail().withMessage('El correo electrónico no es válido'),
        check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    (req, res) => {
        // Maneja los errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Llama al controlador para crear usuarios
        createUser(req, res);
    }
);

// Ruta para iniciar sesión (login)
router.post('/login', loginUser);

// Rutas protegidas por JWT
router.patch('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, disableUser);
router.get('/orders', authenticateJWT, getUserOrders);
router.get('/orders/:id', authenticateJWT, getOrderDetails);

export default router;
