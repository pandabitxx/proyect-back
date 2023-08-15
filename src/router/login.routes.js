import { Router } from "express";
import indexCtrl from "../dao/DataBaseManager/login.controller.js";

const loginRouter = Router();
const {renderPrincipal, 
    renderRegister,
    renderRecoveryPassword,
    renderReal} = indexCtrl

//Login principal
loginRouter.get('/', renderPrincipal);

//Registrar un nuevo usuario
loginRouter.get('/registrar-usuario', renderRegister);

//recuperar contraseña
loginRouter.get('/recovery-password', renderRecoveryPassword);

loginRouter.get('/renderReal', renderReal);


export default loginRouter