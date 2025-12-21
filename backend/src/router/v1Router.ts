import { Router } from "express";
import playerRouter from "../resources/player/player.router";
import transactionRouter from "../resources/transaction/transaction.router";

const router = Router();

router.use(
    "/players",
    // #swagger.tags = ['Players']
    playerRouter
);

router.use(
    "/transactions",
    // #swagger.tags = ['Transactions']
    transactionRouter
);

export default router;