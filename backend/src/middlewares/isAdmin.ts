import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { PlayerProfileConstants } from "../resources/playerProfile/playerProfile.constants";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.player && req.player.profileId === PlayerProfileConstants.ADMIN) {
    next();
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ReasonPhrases.FORBIDDEN });
  }
};
