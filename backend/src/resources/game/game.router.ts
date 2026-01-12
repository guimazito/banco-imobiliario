import { Router } from 'express';
import gameController from './game.controller';
import {
    createGameSchema,
    updateGameSchema,
    gameIdSchema
} from './game.schema';
import { validate } from '../../middlewares/validate';

const router = Router();

router.get(
    "/",
    gameController.index
);

router.get(
    "/:id",
    validate(gameIdSchema),
    gameController.listGameById
);

router.get(
    "/invite/:invite",
    gameController.listGameByInvite
);

router.post(
    "/",
    validate(createGameSchema),
    gameController.create
);

router.put(
    "/:id",
    validate(updateGameSchema),
    gameController.update
);

export default router;