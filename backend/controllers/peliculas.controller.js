import mongoose from "mongoose";
import { Pelicula } from "../models/Pelicula.js";

export const createPelicula = async (req, res) => {
    const {titulo, anyo, duracion, descripcion, genero, estreno, popular, premiada, hollywood} = req.body;
    const poster = req.files['poster'][0].path;
    const escena = req.files['escena'][0].path;
    const video = req.files['video'][0].path;

    const peliculaNueva = new Pelicula({
        _id: new mongoose.Types.ObjectId(),
        titulo, 
        anyo, 
        duracion, 
        descripcion,
        genero,
        poster,
        escena,
        video,
        estreno,
        popular,
        premiada,
        hollywood
    });
    
    await peliculaNueva.save()
        .then((ressult) => {
            return res.status(200).json(ressult);
        }).catch((err) => {
            return res.status(500).json(err);
        });
};

export const getPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();

        return res.status(200).json(peliculas);
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor"});
    }
};

export const getPeliculasEstrenadas = async (req, res) => {
    try {
        const peliculasEstrenadas = await Pelicula.find({ estreno: true })
        
        return res.status(200).json(peliculasEstrenadas);
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"})
    }
}

export const getPeliculasPopulares = async (req, res) => {
    try {
        const peliculasPopulares = await Pelicula.find({ popular: true })

        return res.status(200).json(peliculasPopulares);
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"})
    }
}

export const getPeliculasGenero = async (req, res) => {
    try {
        const {genero} = req.query;

        const peliculasGenero = await Pelicula.find({ genero: genero })

        if (peliculasGenero.length === 0) {
            return res.status(404).json({ error: "No se ha encontrado ese género" });
        }

        return res.status(200).json(peliculasGenero);
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"})
    }
}

export const getPeliculasPremiadas = async (req, res) => {
    try {
        const peliculasPremiadas = await Pelicula.find({ premiada: true });

        return res.status(200).json(peliculasPremiadas);
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const getPeliculasHollywood = async (req, res) => {
    try {
        const peliculasHollywood = await Pelicula.find({ hollywood: true });

        return res.status(200).json(peliculasHollywood);
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const getPeliculasSearch = async (req, res) => {
    try {
        const tituloRegex = new RegExp(req.query.q, 'i'); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

        const peliculas = await Pelicula.find({ titulo: tituloRegex });
        
        if (peliculas.length === 0) {
            return res.status(404).json({ error: "No se ha encontrado esa película"});
        }

        return res.status(200).json(peliculas);
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"});
    }
};

export const getPeliculaById = async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.peliculaId);
    
        if (!pelicula) return res.status(404).json({ error: "La película no existe" });
    
        return res.status(200).json(pelicula);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const updatePeliculaById = async (req, res) => {
    try {
        const peliculaModificada = await Pelicula.findByIdAndUpdate(req.params.peliculaId, {
            titulo: req.body.titulo,
            anyo: req.body.anyo,
            duracion: req.body.duracion,
            descripcion: req.body.descripcion,
            genero: req.body.genero,
            poster: req.files['poster'][0].path,
            escena: req.files['escena'][0].path,
            video: req.files['video'][0].path,
            estreno: req.body.estreno,
            popular: req.body.popular,
            premiada: req.body.premiada,
            hollywood: req.body.hollywood
        }, {
            new: true //Devuelve datos/objeto actualizados
        });

        return res.status(200).json(peliculaModificada);
    } catch (error) {
        res.json({ error: error.message })
    }
};

export const deletePeliculaById = async (req, res) => {
    try {
        const {peliculaId} = req.params;
        await Pelicula.findByIdAndDelete(peliculaId);
        
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"});
    }
};