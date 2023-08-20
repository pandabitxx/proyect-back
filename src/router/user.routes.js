import {Router} from 'express'
const userRouter = Router()

import * as userController from '../dao/DataBaseManager/users.controller.js'
import { verifyToken, isModerator, isAdmin } from "../middlewares/authRoles.js";
import { checkExistingRole } from '../middlewares/verify.signup.js';

userRouter.post('/', [
    verifyToken,
    isAdmin,
    checkExistingRole
],userController.createUser);


export default userRouter;