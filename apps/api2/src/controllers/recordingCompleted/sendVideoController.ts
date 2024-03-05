import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const sendVideo = async (req: Request, res: Response) => {
  try {
    const { senderId, recipientData, videoId, responseTime, workspaceId } =
      req.body;
    console.log("senderId", senderId);
    console.log("recipientData", recipientData);
    console.log("videoId", videoId);
    console.log("responseTime", responseTime);
    console.log("workspaceId", workspaceId);

    // Create a new SendVideo record

    const sendVideo = await prisma.sendVideo.create({
      data: {
        videoId,
        senderId,
        responseTime,
        workspaceId,
        recipients: {
          create: recipientData.map(
            (recipient: { id: any; isToggleOn: any; email: any }) => ({
              userId: recipient.id,
              FYI: recipient.isToggleOn,
              email: recipient.email,
              // Add other recipient fields here
            })
          ),
        },
      },
      include: {
        recipients: true,
      },
    });

    res.json(sendVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
