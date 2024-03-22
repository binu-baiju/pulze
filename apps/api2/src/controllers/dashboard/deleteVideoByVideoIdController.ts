import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from ".prisma/client";

// // import { timeStamp } from "console";

const prisma = new PrismaClient();

export const deleteVideo = async (req: Request, res: Response) => {
  if (req.method === "DELETE") {
    const { videoId } = req.body;
    // console.log("videoId from deleteVideo", videoId);

    try {
      // Step 1: Find the video
      const video = await prisma.video.findUnique({
        where: {
          video_id: videoId,
        },
        include: {
          sendVideos: {
            include: {
              recipients: true,
            },
          },
          comments: true,
        },
      });

      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Step 2: Delete related records

      // Delete related records in Recipient first
      for (const sendVideo of video.sendVideos) {
        for (const recipient of sendVideo.recipients) {
          await prisma.recipient.delete({
            where: {
              id: recipient.id,
            },
          });
        }
      }

      // Delete related records in SendVideo
      for (const sendVideo of video.sendVideos) {
        await prisma.sendVideo.delete({
          where: {
            id: sendVideo.id,
          },
        });
      }

      // Delete related comments
      for (const comment of video.comments) {
        await prisma.comment.delete({
          where: {
            id: comment.id,
          },
        });
      }

      // Step 3: Delete the video itself
      await prisma.video.delete({
        where: {
          video_id: videoId,
        },
      });

      return res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// export const deleteVideo = async (req: Request, res: Response) => {
//   if (req.method === "DELETE") {
//     const { videoId } = req.body;
//     console.log("videoId from deleteVideo", videoId);

//     try {
//       // Step 1: Find the video
//       const video = await prisma.video.findUnique({
//         where: {
//           video_id: videoId,
//         },
//         include: {
//           sendVideos: true,
//           comments: true,
//         },
//       });

//       if (!video) {
//         return res.status(404).json({ message: "Video not found" });
//       }

//       // Step 2: Delete related records

//       // Delete related records in Recipient first
//       if (video.sendVideos.length > 0) {
//         for (const sendVideo of video.sendVideos) {
//           await prisma.recipient.deleteMany({
//             where: {
//               sendVideoId: sendVideo.id,
//             },
//           });
//         }
//       }

//       // Delete related records in SendVideo
//       if (video.sendVideos.length > 0) {
//         await prisma.sendVideo.deleteMany({
//           where: {
//             videoId: videoId,
//           },
//         });
//       }

//       // Delete related records in Recipient
//       if (video.sendVideos.length > 0) {
//         await prisma.recipient.deleteMany({
//           where: {
//             sendVideoId: videoId,
//           },
//         });
//       }

//       // Delete related comments
//       if (video.comments.length > 0) {
//         for (const comment of video.comments) {
//           await prisma.comment.delete({
//             where: {
//               id: comment.id,
//             },
//           });
//         }
//       }

//       // Step 3: Delete the video itself
//       await prisma.video.delete({
//         where: {
//           video_id: videoId,
//         },
//       });

//       return res.status(200).json({ message: "Video deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.setHeader("Allow", ["DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
