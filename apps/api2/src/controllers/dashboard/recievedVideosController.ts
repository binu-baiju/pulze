import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const recievedVideos = async (req: Request, res: Response) => {
  // console.log("entered recieved Videos");

  const userId = req.params.userId;
  const workspaceId = req.params.workspaceId;
  // console.log("userId from recievedVideos", userId);

  try {
    const recievedVideos = await prisma.recipient.findMany({
      where: {
        userId: userId,
        sendVideo: {
          workspaceId: workspaceId, // Filter by workspace_id
        },
      },
      include: {
        sendVideo: {
          include: {
            video: true,
            recipients: {
              include: {
                user: true, // Include full details of the user associated with recipients
              },
            },
            sender: true,
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
