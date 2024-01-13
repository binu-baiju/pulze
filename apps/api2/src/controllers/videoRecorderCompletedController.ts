import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
import { config } from "dotenv";
import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

export const recorderCompletedSearch =  async (req: Request, res: Response) => {
    const { query } = req.query;
  console.log("hello from search");
  
    try {
      const suggestions = await prisma.user.findMany({
        where: {
          email: {
            contains: query as string || '',
          },
        },
        take: 5, // Limit the number of suggestions
      });
  
      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }