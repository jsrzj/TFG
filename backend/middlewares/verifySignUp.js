import { ROLES } from "../models/Rol.js";
import { Usuario } from "../models/Usuario.js";

export const checkDuplicateUser = async (req, res, next) => {
    const usuarioEncontrado = await Usuario.findOne({correo: req.body.correo});

    if (usuarioEncontrado) return res.status(400).json({mensaje: "Ya existe un usuario con ese correo"});

    next();
};

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `El rol ${req.body.roles[i]} no existe`
                });
            }
        }
    }

    next();
}