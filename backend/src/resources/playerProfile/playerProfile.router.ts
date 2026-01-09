import { Router } from "express";
import { validate } from "../../middlewares/validate";
import playerProfileController from "./playerProfile.controller";
import {
    createPlayerProfileSchema,
    playerProfileIdSchema,
    updatePlayerProfileSchema,
} from "./playerProfile.schema";

const router = Router();

router.get(
    "/",
    playerProfileController.index
);

router.post(
  "/",
  validate(createPlayerProfileSchema),
  playerProfileController.create
);

router.get(
  "/:id",
  validate(playerProfileIdSchema),
  playerProfileController.read
);

router.put(
  "/:id",
  validate(updatePlayerProfileSchema),
  playerProfileController.update
);

router.delete(
  "/:id",
  validate(playerProfileIdSchema),
  playerProfileController.remove
);

export default router;
