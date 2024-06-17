import { Router } from "express";
import * as peliculasControlador from "../controllers/peliculas.controller.js";
//import { createPelicula, getPeliculas, ...} from "../controllers/peliculas.controller.js";
import * as authJwt from "../middlewares/authJwt.js";
import { upload } from "../middlewares/fileUpload.js"

const router = Router();

router.post("/create", [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'escena',  maxCount: 1 },
        { name: 'video',  maxCount: 1 },
    ])
], 
peliculasControlador.createPelicula);

router.get("/", authJwt.verifyToken, peliculasControlador.getPeliculas);

router.get("/estrenadas", authJwt.verifyToken, peliculasControlador.getPeliculasEstrenadas);

router.get("/populares", authJwt.verifyToken, peliculasControlador.getPeliculasPopulares);

router.get("/genero", authJwt.verifyToken, peliculasControlador.getPeliculasGenero);

router.get("/premiadas", authJwt.verifyToken, peliculasControlador.getPeliculasPremiadas);

router.get("/hollywood", authJwt.verifyToken, peliculasControlador.getPeliculasHollywood);

router.get("/search", authJwt.verifyToken, peliculasControlador.getPeliculasSearch);

router.get("/:peliculaId", authJwt.verifyToken, peliculasControlador.getPeliculaById);

router.put("/put/:peliculaId", [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'escena',  maxCount: 1 },
        { name: 'video',  maxCount: 1 },
    ])
], 
peliculasControlador.updatePeliculaById);

router.delete("/delete/:peliculaId", [authJwt.verifyToken, authJwt.isAdmin], peliculasControlador.deletePeliculaById);

export default router;

