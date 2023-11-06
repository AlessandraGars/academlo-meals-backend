import { Order } from '../models/orderModel.js'; // Importa el modelo de orden

// Controlador para crear una nueva orden
const createOrder = async (req, res) => {
    try {
        const { quantity, mealId } = req.body;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Validar y crear la orden
        const totalPrice = calculateTotalPrice(mealId, quantity); // Implementa esta función según tus necesidades
        const newOrder = new Order({ mealId, userId, totalPrice, quantity, status: 'active' });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear orden' });
    }
}

// Controlador para obtener todas las órdenes del usuario autenticado
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Implementa la lógica para obtener todas las órdenes del usuario
        const orders = await Order.find({ userId, status: 'active' });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener órdenes del usuario' });
    }
}

// Controlador para marcar una orden como completada
const markOrderCompleted = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Implementa la lógica para marcar una orden como completada
        const order = await Order.findById(orderId);
        if (!order || order.status !== 'active') {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        if (order.userId !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
        }
        order.status = 'completed';
        await order.save();
        res.status(200).json({ message: 'Orden marcada como completada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al marcar la orden como completada' });
    }
}

// Controlador para marcar una orden como cancelada
const markOrderCancelled = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Implementa la lógica para marcar una orden como cancelada
        const order = await Order.findById(orderId);
        if (!order || order.status !== 'active') {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        if (order.userId !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
        }
        order.status = 'cancelled';
        await order.save();
        res.status(200).json({ message: 'Orden marcada como cancelada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al marcar la orden como cancelada' });
    }
}

export default {
    createOrder,
    getUserOrders,
    markOrderCompleted,
    markOrderCancelled,
};
