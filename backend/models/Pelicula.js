import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    anyo: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    escena: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    estreno: {
        type: Boolean,
        required: true
    },
    popular: {
        type: Boolean,
        required: true
    },
    premiada: {
        type: Boolean,
        required: true
    },
    hollywood: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
});

export const Pelicula = new mongoose.model("peliculas", peliculaSchema);    

