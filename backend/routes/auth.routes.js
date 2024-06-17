import { Router } from "express";   
import * as authControlador from "../controllers/auth.controller.js";
import * as verifySignUp from "../middlewares/verifySignUp.js";

const router = Router();

router.post('/registro', [verifySignUp.checkDuplicateUser, verifySignUp.checkRolesExisted], authControlador.registro);

router.post('/login', authControlador.login);

export default router;

