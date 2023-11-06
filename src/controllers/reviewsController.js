import { Review } from '../models/reviewsModel.js'; // Importa el modelo de reseña

// Controlador para crear una nueva reseña en un restaurante
const createReview = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        const restaurantId = req.params.restaurantId; // Obtén el ID del restaurante desde la ruta
        // Validar y crear la reseña
        const newReview = new Review({ userId, comment, restaurantId, rating, status: 'active' });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear reseña' });
    }
}

// Controlador para actualizar una reseña
const updateReview = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const restaurantId = req.params.restaurantId;
        const reviewId = req.params.id;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Implementa la lógica para actualizar una reseña
        const review = await Review.findOne({ _id: reviewId, restaurantId, userId });
        if (!review || review.status !== 'active') {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        review.comment = comment;
        review.rating = rating;
        await review.save();
        res.status(200).json({ message: 'Reseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reseña' });
    }
}

// Controlador para marcar una reseña como eliminada
const markReviewDeleted = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reviewId = req.params.id;
        const userId = req.user.id; // Obtén el ID del usuario autenticado desde el token
        // Implementa la lógica para marcar una reseña como eliminada
        const review = await Review.findOne({ _id: reviewId, restaurantId, userId });
        if (!review || review.status !== 'active') {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        review.status = 'deleted';
        await review.save();
        res.status(200).json({ message: 'Reseña marcada como eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al marcar la reseña como eliminada' });
    }
}

export default {
    createReview,
    updateReview,
    markReviewDeleted,
};
