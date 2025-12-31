import { Router } from "express";
import playerController from "./player.controller";
import {
    playerIdSchema,
    createPlayerSchema,
    updatePlayerSchema
} from "./player.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.get(
    "/",
    playerController.index
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