import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const sendVideo = async (req: Request, res: Response) => {
  try {
    const {
      senderId,
      recipientData,
      videoId,
      responseTime,
      workspaceId,
      videoObject,
      titleFromFrontend,
      descriptionFromFrontend,
    } = req.body;
    // console.log("senderId", senderId);
    // console.log("recipientData", recipientData);
    // console.log("videoId", videoId);
    // console.log("responseTime", responseTime);
    // console.log("workspaceId", workspaceId);
    // console.log("videoObject:", videoObject);
    // console.log("title from frontend:", titleFromFrontend);
    // console.log("description from frontend:", descriptionFromFrontend);

    if (titleFromFrontend || descriptionFromFrontend) {
      // Retrieve the video using videoId
      const existingVideo = await prisma.video.findUnique({
        where: {
          video_id: videoId,
        },
      });

      // Check if the retrieved video exists and if its title and description are empty
      if (
        existingVideo &&
        (!existingVideo.title || !existingVideo.description)
      ) {
        // Update the video with the provided titleFromFrontend and descriptionFromFrontend
        await prisma.video.update({
          where: {
            video_id: videoId,
          },
          data: {
            title: titleFromFrontend || existingVideo.title,
            description: descriptionFromFrontend || existingVideo.description,
          },
        });
      }
    }

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
              FYI: recipient.isToggleOn ? recipient.isToggleOn : false,
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
