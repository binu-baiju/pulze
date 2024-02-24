// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// import { config } from "dotenv";
// import { PrismaClient } from "../../../node_modules/.prisma/client";
// // import { timeStamp } from "console";

// const prisma = new PrismaClient();

// export const findingVideoId = async (req: Request, res: Response) => {
//   const { key } = req.params;

//   try {
//     const videoWhereUniqueInput: VideoWhereUniqueInput = {
//         Key: key,
//       };
//     const video = await prisma.video.findUnique({
//       where: {
//         Key: key,
//       },
//     });

//     if (!video) {
//       return res.status(404).json({ error: "Video not found" });
//     }

//     res.json({ videoId: video.video_id });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
