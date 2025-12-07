import { Router } from "express";
import playerController from "./player.controller";
import {
    playerIdSchema,
    createPlayerSchema
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

export default router;