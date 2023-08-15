import { Router } from "express";
const authRouter = Router()

import { checkExistingRole, checkExistingUser } from "../middlewares/verify.signup.js";

import * as authController from "../dao/DataBaseManager/auth.controller.js"

authRouter.post('/signup', [checkExistingUser, checkExistingRole],authController.signUp);

authRouter.post('/signin', authController.signIn);

export default authRouter;
