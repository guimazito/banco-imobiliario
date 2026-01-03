import { Router } from "express";
import authController from "./auth.controller";
import { validate } from '../../middlewares/validate';
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema
} from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  validate(signUpSchema),
  authController.signup
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetpassword
);

export default router;
