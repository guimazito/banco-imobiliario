import { Router } from "express";
import playerRouter from "../resources/player/player.router";

const router = Router();

router.use(
    "/players",
    // #swagger.tags = ['Players']
    playerRouter
);

export default router;