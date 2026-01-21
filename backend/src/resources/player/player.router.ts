import { Router } from "express";
import playerController from "./player.controller";
import {
    createPlayerSchema,
    updatePlayerSchema,
    playerUsernameSchema
} from "./player.schema";
import { isAuth } from '../../middlewares/isAuth';
import { isAdmin } from '../../middlewares/isAdmin';
import { validate } from "../../middlewares/validate";
import { authenticateJWT } from "../../middlewares/authenticateJWT";

const router = Router();

router.get(
    "/",
    authenticateJWT,
    isAdmin,
    playerController.index
);

router.get(
    "/username/:username",
    authenticateJWT,
    isAuth,
    validate(playerUsernameSchema),
    playerController.listPlayerByUsername
);

router.post(
    "/",
    authenticateJWT,
    isAuth,
    validate(createPlayerSchema),
    playerController.create
);

router.put(
    "/:id",
    authenticateJWT,
    isAuth,
    validate(updatePlayerSchema),
    playerController.update
);

export default router;