import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  let token = "";
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (typeof decoded === "object" && decoded !== null) {
        req.player = decoded as Express.Player;
        next();
      } else {
        return res.status(401).json({ message: "Invalid Token" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Token Not Provided" });
  }
}
