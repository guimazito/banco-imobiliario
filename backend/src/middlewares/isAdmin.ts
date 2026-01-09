import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { EmployeeProfileConstants } from "../resources/employeeProfile/employeeProfile.constants";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.player === EmployeeProfileConstants.ADMIN) {
    next();
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ReasonPhrases.FORBIDDEN });
  }
};
