import { Router } from 'express';
import gameController from './game.controller';
import {
    createGameSchema,
    updateGameSchema,
    gameIdSchema
} from './game.schema';
import { isAuth } from '../../middlewares/isAuth';
import { validate } from '../../middlewares/validate';
import { authenticateJWT } from "../../middlewares/authenticateJWT";

const router = Router();

router.get(
    "/",
    authenticateJWT,
    isAuth,
    gameController.index
);

router.get(
    "/:id",
    authenticateJWT,
    isAuth,
    validate(gameIdSchema),
    gameController.listGameById
);

router.get(
    "/invite/:invite",
    authenticateJWT,
    isAuth,
    gameController.listGameByInvite
);

router.post(
    "/",
    authenticateJWT,
    isAuth,
    validate(createGameSchema),
    gameController.create
);

router.put(
    "/:id",
    authenticateJWT,
    isAuth,
    validate(updateGameSchema),
    gameController.update
);

export default router;