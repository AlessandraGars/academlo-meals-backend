import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configura middlewares y body parser
app.use(json());
app.use(urlencoded({ extended: false }));

// Define tus rutas aquí
import usersRoute from './routes/usersRoute';

import restaurantsRoute from './src/routes/restaurantsRoute';
import mealsRoute from './src/routes/mealsRoute';
import ordersRoute from './src/routes/ordersRoute';

// Agrega las rutas a Express
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/restaurants', restaurantsRoute);
app.use('/api/v1/meals', mealsRoute);
app.use('/api/v1/orders', ordersRoute);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
