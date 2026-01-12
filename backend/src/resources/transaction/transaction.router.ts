import { Router } from "express";
import transactionController from "./transaction.controller";
import {
  transactionIdSchema,
  createTransactionSchema,
} from "./transaction.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.get(
    "/",
    transactionController.index
);

router.get(
  "/:id",
  validate(transactionIdSchema),
  transactionController.listTransactionById
);

router.get(
  "/game/:gameId",
  validate(transactionIdSchema),
  transactionController.listTransactionsByGameId
);

router.post(
  "/",
  validate(createTransactionSchema),
  transactionController.create
);

export default router;