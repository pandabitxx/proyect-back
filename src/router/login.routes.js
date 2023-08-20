import { Router } from "express";
import indexCtrl from "../dao/DataBaseManager/login.controller.js";

const loginRouter = Router();
const {renderSignin, 
    renderSignup,
    renderRecoveryPassword,
    renderReal} = indexCtrl

//Login principal
loginRouter.get('/', renderSignin);

//Registrar un nuevo usuario
loginRouter.get('/signup', renderSignup);

//recuperar contraseña
loginRouter.get('/recovery-password', renderRecoveryPassword);

export default loginRouter