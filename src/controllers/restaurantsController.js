import { Restaurant } from '../models/restaurantModel.js'; // Importa el modelo de restaurante

// Controlador para crear un nuevo restaurante
const createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;
    // Validar y crear el restaurante
    const newRestaurant = new Restaurant({ name, address, rating, status: 'active' });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear restaurante' });
  }
}

// Controlador para obtener todos los restaurantes con status activo
const getAllRestaurants = async (req, res) => {
  try {
    // Implementa la lógica para obtener todos los restaurantes con status activo
    const restaurants = await Restaurant.find({ status: 'active' });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
}

// Controlador para obtener detalles de un restaurante por su ID
const getRestaurantDetails = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    // Implementa la lógica para obtener detalles de un restaurante por su ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || restaurant.status !== 'active') {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener detalles del restaurante' });
  }
}

// Controlador para actualizar un restaurante
const updateRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const restaurantId = req.params.id;
    // Implementa la lógica para actualizar un restaurante
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || restaurant.status !== 'active') {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    if (name) {
      restaurant.name = name;
    }
    if (address) {
      restaurant.address = address;
    }
    await restaurant.save();
    res.status(200).json({ message: 'Restaurante actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el restaurante' });
  }
}

// Controlador para deshabilitar un restaurante
const disableRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    // Implementa la lógica para deshabilitar un restaurante
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || restaurant.status !== 'active') {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    restaurant.status = 'disabled';
    await restaurant.save();
    res.status(200).json({ message: 'Restaurante deshabilitado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al deshabilitar el restaurante' });
  }
}

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantDetails,
  updateRestaurant,
  disableRestaurant,
};
