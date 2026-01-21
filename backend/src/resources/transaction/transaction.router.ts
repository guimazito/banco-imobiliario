import { Router } from "express";
import transactionController from "./transaction.controller";
import {
  transactionIdSchema,
  createTransactionSchema,
} from "./transaction.schema";
import { isAuth } from '../../middlewares/isAuth';
import { isAdmin } from '../../middlewares/isAdmin';
import { validate } from "../../middlewares/validate";
import { authenticateJWT } from "../../middlewares/authenticateJWT";

const router = Router();

router.get(
    "/",
    authenticateJWT,
    isAdmin,
    transactionController.index
);

router.get(
  "/:id",
  authenticateJWT,
  isAuth,
  validate(transactionIdSchema),
  transactionController.listTransactionById
);

router.get(
  "/game/:gameId",
  authenticateJWT,
  isAuth,
  validate(transactionIdSchema),
  transactionController.listTransactionsByGameId
);

router.post(
  "/",
  authenticateJWT,
  isAuth,
  validate(createTransactionSchema),
  transactionController.create
);

export default router;