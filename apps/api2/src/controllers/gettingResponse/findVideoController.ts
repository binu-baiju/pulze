import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from ".prisma/client";
// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const findingVideoId = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  // console.log("videoId from get videoId", videoId);

  try {
    const video = await prisma.video.findUnique({
      where: {
        video_id: videoId,
      },
      include: {
        creator: true,
      },
    });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    const creator = video.creator;
    res.json({ key: video.Key, createdon: video.createdOn, creator });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
