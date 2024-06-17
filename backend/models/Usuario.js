import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        //unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "roles",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: false,
    versionKey: false
});

usuarioSchema.statics.encriptarPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

usuarioSchema.statics.compararPassword = async (password, passwordRecibida) => {
    return await bcryptjs.compare(password, passwordRecibida); //retorna true o false (coinciden contraseñas = true, sino = false)
};

export const Usuario = new mongoose.model("usuarios", usuarioSchema);
