import { NextFunction, Request, Response } from "express";
import { Languages } from "../resources/language/language.constants";

export const setCookieLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!("lang" in req.cookies)) {
    res.cookie("lang", process.env.DEFAULT_LANGUAGE ?? Languages.ptBR);
  }
  next();
};
