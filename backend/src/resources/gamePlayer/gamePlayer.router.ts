import { Router } from 'express';
import gamePlayerController from './gamePlayer.controller';
import {
    gamePlayerIdSchema,
    createGamePlayerSchema,
    updateGamePlayerSchema,
} from './gamePlayer.schema';
import { isAuth } from '../../middlewares/isAuth';
import { validate } from '../../middlewares/validate';
import { authenticateJWT } from "../../middlewares/authenticateJWT";

const router = Router();

router.get(
    "/",
    authenticateJWT,
    isAuth,
    gamePlayerController.index
);

router.get(
    "/game/:gameId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerByGameId
);

router.get(
    "/used-avatars/:gameId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerUsedAvatarByGameId
);

router.get(
    "/count/:gameId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerTotalCountByGameId
);

router.get(
    "/player/:playerId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerByPlayerId
);

router.get(
    "/ranking/:gameId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerRankingByGameId
);

router.get(
    "/:gameId/:playerId",
    authenticateJWT,
    isAuth,
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerById
);


router.post(
    "/",
    authenticateJWT,
    isAuth,
    validate(createGamePlayerSchema),
    gamePlayerController.create
);

router.put(
    "/:gameId/:playerId",
    authenticateJWT,
    isAuth,
    validate(updateGamePlayerSchema),
    gamePlayerController.update
);

export default router;