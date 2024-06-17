import mongoose from "mongoose";
export const ROLES = ["usuario", "admin"];

const rolSchema = new mongoose.Schema({
    nombre: {
        type: String
    }
}, {
    versionKey: false
});

export const Rol = new mongoose.model("roles", rolSchema);