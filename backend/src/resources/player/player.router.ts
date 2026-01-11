import { Router } from "express";
import playerController from "./player.controller";
import {
    createPlayerSchema,
    updatePlayerSchema,
    playerUsernameSchema
} from "./player.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.get(
    "/",
    playerController.index
);

router.get(
    "/username/:username",
    validate(playerUsernameSchema),
    playerController.listPlayerByUsername
);

router.post(
    "/",
    validate(createPlayerSchema),
    playerController.create
);

router.put(
    "/:id",
    validate(updatePlayerSchema),
    playerController.update
);

export default router;