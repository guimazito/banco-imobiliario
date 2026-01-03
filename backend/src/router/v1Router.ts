import { Router } from "express";
import gameRouter from "../resources/game/game.router";
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

router.use(
    "/games",
    // #swagger.tags = ['Games']
    gameRouter
);

export default router;