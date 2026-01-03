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