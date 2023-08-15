import {Router} from 'express'
const userRouter = Router()

import * as userController from '../dao/DataBaseManager/users.controller.js'
import { verifyToken, isModerator, isAdmin } from "../middlewares/auth.jwt.js";

userRouter.post('/', [
    verifyToken,
    isAdmin,
],userController.createUser);


export default userRouter;