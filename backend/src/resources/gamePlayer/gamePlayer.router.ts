import { Router } from 'express';
import gamePlayerController from './gamePlayer.controller';
import {
    gamePlayerIdSchema,
    createGamePlayerSchema,
    updateGamePlayerSchema,
} from './gamePlayer.schema';
import { validate } from '../../middlewares/validate';

const router = Router();

router.get(
    "/",
    gamePlayerController.index
);

router.get(
    "/game/:gameId",
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerByGameId
);

router.get(
    "/used-avatars/:gameId",
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerUsedAvatarByGameId
);

router.get(
    "/player/:playerId",
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerByPlayerId
);

router.get(
    "/ranking/:gameId",
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerRankingByGameId
);

router.get(
    "/:gameId/:playerId",
    validate(gamePlayerIdSchema),
    gamePlayerController.listGamePlayerById
);


router.post(
    "/",
    validate(createGamePlayerSchema),
    gamePlayerController.create
);

router.put(
    "/:gameId/:playerId",
    validate(updateGamePlayerSchema),
    gamePlayerController.update
);

export default router;