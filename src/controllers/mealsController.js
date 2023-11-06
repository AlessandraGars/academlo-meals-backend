import { Meal } from '../models/mealModel.js'; // Importa el modelo de comida

// Controlador para crear una nueva comida en un restaurante
const createMeal = async (req, res) => {
    try {
        const { name, price, restaurantId } = req.body;
        // Validar y crear la comida
        const newMeal = new Meal({ name, price, restaurantId, status: 'active' });
        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear comida' });
    }
}

// Controlador para obtener todas las comidas con status activo
const getAllMeals = async (req, res) => {
    try {
        // Implementa la lógica para obtener todas las comidas activas
        const meals = await Meal.find({ status: 'active' });
        res.status(200).json(meals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener comidas' });
    }
}

// Controlador para obtener detalles de una comida por su ID
const getMealDetails = async (req, res) => {
    try {
        const mealId = req.params.id;
        // Implementa la lógica para obtener detalles de una comida
        const meal = await Meal.findById(mealId);
        if (!meal || meal.status !== 'active') {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }
        res.status(200).json(meal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalles de la comida' });
    }
}

// Controlador para actualizar una comida
const updateMeal = async (req, res) => {
    try {
        const mealId = req.params.id;
        const { name, price } = req.body;
        // Implementa la lógica para actualizar una comida
        const meal = await Meal.findById(mealId);
        if (!meal || meal.status !== 'active') {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }
        meal.name = name;
        meal.price = price;
        await meal.save();
        res.status(200).json({ message: 'Comida actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la comida' });
    }
}

// Controlador para deshabilitar una comida
const disableMeal = async (req, res) => {
    try {
        const mealId = req.params.id;
        // Implementa la lógica para deshabilitar una comida
        const meal = await Meal.findById(mealId);
        if (!meal || meal.status !== 'active') {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }
        meal.status = 'disabled';
        await meal.save();
        res.status(200).json({ message: 'Comida deshabilitada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar la comida' });
    }
}

export default {
    createMeal,
    getAllMeals,
    getMealDetails,
    updateMeal,
    disableMeal,
};
