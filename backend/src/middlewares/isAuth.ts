import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.player?.profileId) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};
