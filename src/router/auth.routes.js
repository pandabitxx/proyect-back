import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
  renderRecovery
} from "../dao/DataBaseManager/authController.js";
import authMiddleware from "../utils/auth.middleware.js";

const router = Router();

// Routes
router.get("/auth/signup", renderSignUpForm);

router.post("/auth/signup", signup);

router.get("/", authMiddleware.isNotLoggIn, renderSigninForm);

router.post("/auth/signin", authMiddleware.isNotLoggIn, signin);

router.get("/auth/logout", authMiddleware.isLoggIn, logout);

router.get("/auth/recovery", renderRecovery);

export default router;