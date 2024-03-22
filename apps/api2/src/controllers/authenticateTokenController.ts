import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
import { config } from "dotenv";
import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

// Load environment variables
config();

interface CustomRequest extends Request {
  user?: { email: string }; // Add the user property to Request
}

export const authenticateToken = async (req: CustomRequest, res: Response) => {
  // console.log("Helo from authenticate token");
  let token = req.headers["x-access-token"];
  if (Array.isArray(token)) {
    token = token[0]; // Take the first element of the array
  }
  if (!token) {
    return res.status(401).json({ status: "error", error: "Token is missing" });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
    const email = decoded.email;
    // console.log(token);
    req.user = { email }; // Attach user object to the request for further use
  } catch (error) {
    // console.log(error);
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
};
