import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import { Rol } from "../models/Rol.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({mensaje: "No se proporcionó un token"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuarioId = decoded.id;
    
        const usuario = await Usuario.findById(req.usuarioId, {password: 0});
        if(!usuario) return res.status(404).json({mensaje: "Usuario no encontrado"});
    
        next();
    } catch (error) {
        return res.status(401).json({mensaje: "No autorizado"});
    }
};

export const isAdmin = async (req, res, next) => {
    const usuario = await Usuario.findById(req.usuarioId);
    const roles = await Rol.find({_id: { $in: usuario.roles }});

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === "admin") {
            next(); //Continua
            return;
        }
    }
    
    return res.status(403).json({mensaje: "Necesitas el rol de Admin"});
};