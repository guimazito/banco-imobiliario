import { Router } from "express";
import authController from "./auth.controller";
import { isAuth } from '../../middlewares/isAuth';
import { isAdmin } from '../../middlewares/isAdmin';
import { validate } from '../../middlewares/validate';
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema
} from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  authenticateJWT,
  isAdmin,
  validate(signUpSchema),
  authController.signup
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/logout",
  authenticateJWT,
  isAuth,
  authController.logout
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetpassword
);

export default router;
