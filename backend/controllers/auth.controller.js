import { Usuario } from "../models/Usuario.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Rol } from "../models/Rol.js";

export const registro = async (req, res) => {
    const {nombre, apellidos, correo, password, roles} = req.body;

    const usuarioNuevo = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        nombre,
        apellidos,
        correo,
        password: await Usuario.encriptarPassword(password)
    });
    
    //Chequea roles (se lo pasa el admin)
    if (roles) {
        const rolesEncontrados = await Rol.find({ nombre: {$in: roles}  }); //Busca el rol en la coleccion
        usuarioNuevo.roles = rolesEncontrados.map((rol) => rol._id); //Le asigna un rol al usuario
    }
    else { //Rol por defecto (usuario)
        const rol = await Rol.findOne({nombre: "usuario"});
        usuarioNuevo.roles = [rol._id];
    }
    
    const usuarioGuardado = await usuarioNuevo.save();

    //Token
    const token = jwt.sign({id: usuarioGuardado._id}, process.env.JWT_SECRET, {expiresIn: 86400});
    
    res.json({token});
};

export const login = async (req, res) => {
    const usuarioEncontrado = await Usuario.findOne({correo: req.body.correo}).populate("roles");

    if (!usuarioEncontrado) return res.status(400).json({mensaje: "Usuario no encontrado"});

    const matchPassword = await Usuario.compararPassword(req.body.password, usuarioEncontrado.password);
    if (!matchPassword) return res.status(401).json({token: null, mensaje: "Password inválida"});

    const token = jwt.sign(
        {
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            apellidos: usuarioEncontrado.apellidos,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.roles.map(rol => rol.nombre)
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: 86400}
    );
    
    res.json({token});
};