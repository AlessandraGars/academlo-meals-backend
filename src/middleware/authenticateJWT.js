import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from './config'; // Importa tu clave secreta desde una configuración adecuada

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user; // Almacena los datos del usuario en el objeto de solicitud (req)
        next();
    });
};

export default authenticateJWT;
