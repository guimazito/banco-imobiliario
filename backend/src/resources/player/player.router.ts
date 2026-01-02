import { Router } from "express";
import playerController from "./player.controller";
import {
    createPlayerSchema,
    updatePlayerSchema,
    playerNameSchema
} from "./player.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.get(
    "/",
    playerController.index
);

router.get(
    "/ranking",
    playerController.listPlayerRanking
);

router.get(
    "/name/:name",
    validate(playerNameSchema),
    playerController.listPlayerByName
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