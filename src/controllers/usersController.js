import User from '../models/userModel.js';
import { hash, compare } from 'bcryptjs'; // Para encriptar contraseñas
import { sign } from 'jsonwebtoken'; // Para generar tokens JWT
import { validationResult } from 'express-validator'; // Para validar datos de entrada

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encripta la contraseña antes de guardarla en la base de datos
    const hashedPassword = await hash(password, 10);

    // Crea el nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Genera un token JWT para la autenticación
    const token = sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Duración del token
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Controlador para actualizar perfil de usuario
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token JWT

    // Implementa la lógica para actualizar el perfil del usuario
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza los campos del perfil según sea necesario
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      // Encripta la nueva contraseña antes de actualizarla
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    }

    // Guarda los cambios en la base de datos
    await user.save();

    res.status(200).json({ message: 'Perfil de usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil de usuario' });
  }
};

// Controlador para deshabilitar cuenta de usuario
const disableUser = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token JWT

    // Implementa la lógica para deshabilitar la cuenta de usuario
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Cambia el estado de la cuenta a "deshabilitada" o realiza la acción necesaria
    user.status = 'disabled';

    // Guarda los cambios en la base de datos
    await user.save();

    res.status(200).json({ message: 'Cuenta de usuario deshabilitada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al deshabilitar la cuenta de usuario' });
  }
};

// Controlador para obtener todas las órdenes hechas por el usuario
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token JWT

    // Implementa la lógica para obtener todas las órdenes del usuario
    const orders = await Order.find({ userId: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las órdenes del usuario' });
  }
};

// Controlador para obtener detalles de una sola orden dado un ID
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Implementa la lógica para obtener detalles de una sola orden
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener detalles de la orden' });
  }
};

export default {
  createUser,
  loginUser,
  updateUser,
  disableUser,
  getUserOrders,
  getOrderDetails,
};
