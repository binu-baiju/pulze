import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";
// import { createUploadStream } from "../../../../api/src/modules/stream";
import { createUploadStream } from "../../modules/stream";

import stream from "stream";
// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const fetchComments = async (req: Request, res: Response) => {
  const { videoId } = req.params;

  try {
    // const comments = await prisma.comment.findMany(
    //   {
    //   where: { videoId },
    //   select: {
    //     id: true,
    //     content: true,
    //     parentCommentId: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     replies: true,

    //     user: {
    //       select: {
    //         id: true,
    //         name: true,
    //         image: true,
    //       },
    //     },
    //   },
    // }
    // );
    const comments = await prisma.comment.findMany({
      where: { videoId },
      select: {
        id: true,
        content: true,
        parentCommentId: true,
        createdAt: true,
        updatedAt: true,
        timeStamp: true,
        type: true,
        replies: {
          select: {
            id: true,
            content: true,
            parentCommentId: true,
            createdAt: true,
            updatedAt: true,
            timeStamp: true,
            type: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createComments = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const { content, userId, timeStamp, type, parentCommentId } = req.body;
  // console.log(`parentId:${parentCommentId}`);
  // console.log(`type:${type}`);

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        type: type, // You may adjust the type based on your requirements
        timeStamp,
        userId,
        videoId,
        parentCommentId,
      },
      include: { user: true }, // Include user information for the created comment
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const uploadVideoAndCreateComment = async (
  req: Request,
  res: Response
) => {
  // console.log("Hello from uploadVideoAndCreateComment backend");
  // console.log("Request object:", req);
  const { file } = req as any;
  // const { title, description } = req.body as any; // Assuming you are using a middleware to handle file uploads
  // console.log(req.body);
  // console.log(`file:${file}`);
  // console.log(`title:${title}`);
  // console.log(`description:${description}`);

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const { buffer, originalname } = file;
  // console.log(filename);
  const stream1 = new stream.PassThrough();
  stream1.end(buffer);

  //   const { file } = req as any; // Assuming you are using a middleware to handle file uploads
  // console.log(file);

  //   if (!file) {
  //     return res.status(400).json({ error: 'No file provided' });
  //   }

  //   const { filename, createReadStream } = formData;

  //   const stream = createReadStream();

  try {
    const uploadStream = createUploadStream(originalname);
    stream1.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;
    // console.log(result);
    const { ETag, Location, Bucket, Key } = result;
    try {
      // const creatorId = "d68e3f11-bdab-430f-9dc2-54c2c088864d"; // Replace with the actual user ID
      // const workspaceId = "1bd89f4c-36eb-4411-9232-acb129219e8f";
      const { videoId } = req.params;
      const { userId, timeStamp, typeComment, parentCommentId } =
        req.body as any;
      // console.log(`userId:${userId}`);
      // console.log(req.body);
      // console.log(`parentId:${parentCommentId}`);
      // console.log(typeComment);

      const newComment = await prisma.comment.create({
        data: {
          content: `https://d1yt4919vxgwb5.cloudfront.net/${Key}`,
          type: typeComment, // You may adjust the type based on your requirements
          timeStamp,
          ETag,
          Location,
          Key,
          Bucket,
          userId,
          videoId,
          parentCommentId,
        },
        include: { user: true }, // Include user information for the created comment
      });

      // res.json();
      res.json({ success: true, result, newComment });
    } catch (error) {
      console.error(`failed to create Video Comment${error}`);
      res
        .status(500)
        .json({ error: `Error add video ${originalname} hello`, originalname });
    }
  } catch (error: any) {
    console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
    res.status(500).json({
      error: `Error uploading file ${originalname} hello`,
      originalname,
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  // console.log("reached delete comment");

  const { commentId } = req.params;

  // try {
  //   // Delete the comment with the provided commentId
  //   const deletedComment = await prisma.comment.delete({
  //     where: {
  //       id: commentId,
  //     },
  //   });

  //   res.status(204).send(deletedComment); // Comment successfully deleted
  // } catch (error) {
  //   console.error("Error deleting comment:", error);
  //   res
  //     .status(500)
  //     .json({ error: "An error occurred while deleting the comment." });
  // }
  try {
    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        replies: true,
        parentComment: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Check if the comment is a parent comment
    if (!comment.parentCommentId) {
      // Delete the replies of the parent comment
      await prisma.comment.deleteMany({
        where: {
          parentCommentId: commentId,
        },
      });

      // Delete the parent comment
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      res.status(204).send({ commentType: "parent" }); // Parent comment and replies successfully deleted
    } else {
      // Delete the reply comment
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      res.status(204).send({ commentType: "reply" }); // Reply comment successfully deleted
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment." });
  }
};
