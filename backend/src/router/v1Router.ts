import { Router } from "express";
import gameRouter from "../resources/game/game.router";
import authRouter from "../resources/auth/auth.router";
import playerRouter from "../resources/player/player.router";
import gamePlayerRouter from "../resources/gamePlayer/gamePlayer.router";
import transactionRouter from "../resources/transaction/transaction.router";

const router = Router();

router.use(
    "/auth",
    // #swagger.tags = ['Authentication']
    authRouter
);

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

router.use(
    "/game-players",
    // #swagger.tags = ['GamePlayers']
    gamePlayerRouter
);

export default router;