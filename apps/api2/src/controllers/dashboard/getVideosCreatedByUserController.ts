import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const getVideosCreatedByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const workspaceId = req.params.workspaceId;
    // console.log("userId", userId);

    // Create a new SendVideo record
    // console.log("entered getVideosCreatedByUser");

    const userCreatedVideosWithDetails = await prisma.video.findMany({
      where: {
        creatorId: userId,
        workspace_id: workspaceId,
      },
      include: {
        creator: true,
        sendVideos: {
          include: {
            recipients: {
              include: {
                user: true, // Include full details of the user associated with recipients
              },
            },
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          include: {
            user: true,
          },
        },
      },
    });
    // console.log("userCreatedVideosWithDetails", userCreatedVideosWithDetails);

    res.json(userCreatedVideosWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
