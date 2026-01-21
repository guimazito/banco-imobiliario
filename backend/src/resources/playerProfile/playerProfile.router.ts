import { Router } from "express";
import { validate } from "../../middlewares/validate";
import playerProfileController from "./playerProfile.controller";
import {
    createPlayerProfileSchema,
    playerProfileIdSchema,
    updatePlayerProfileSchema,
} from "./playerProfile.schema"
import { isAdmin } from '../../middlewares/isAdmin';
import { authenticateJWT } from "../../middlewares/authenticateJWT";

const router = Router();

router.get(
    "/",
    authenticateJWT,
    isAdmin,
    playerProfileController.index
);

router.post(
  "/",
  authenticateJWT,
  isAdmin,
  validate(createPlayerProfileSchema),
  playerProfileController.create
);

router.get(
  "/:id",
  authenticateJWT,
  isAdmin,
  validate(playerProfileIdSchema),
  playerProfileController.read
);

router.put(
  "/:id",
  authenticateJWT,
  isAdmin,
  validate(updatePlayerProfileSchema),
  playerProfileController.update
);

router.delete(
  "/:id",
  authenticateJWT,
  isAdmin,
  validate(playerProfileIdSchema),
  playerProfileController.remove
);

export default router;
