// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Attach the decoded token to the request object for later use
    req.user = decoded;
    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
