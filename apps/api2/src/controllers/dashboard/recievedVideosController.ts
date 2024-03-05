import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const recievedVideos = async (req: Request, res: Response) => {
  console.log("entered recieved Videos");

  const userId = req.params.userId;
  console.log("userId from recievedVideos", userId);

  try {
    const recievedVideos = await prisma.recipient.findMany({
      where: {
        userId: userId,
      },
      include: {
        sendVideo: {
          include: {
            video: true,
          },
        },
      },
    });

    res.json(recievedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
