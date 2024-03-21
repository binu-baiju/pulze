import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
import { config } from "dotenv";
import { PrismaClient } from "../../../node_modules/.prisma/client";

const prisma = new PrismaClient();

export const sendingVideoToWorspaceMembers = async (
  req: Request,
  res: Response
) => {
  // const { query } = req.query;
  // console.log(query);
  // console.log("hello from search");

  // try {
  //   const suggestions = await prisma.user.findMany({
  //     where: {
  //       email: {
  //         contains: (query as string) || "",
  //       },
  //     },
  //     take: 5, // Limit the number of suggestions
  //   });

  //   res.json({ suggestions });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
  const { query, workspaceId } = req.query;
  const { content, userId, timeStamp, type, parentCommentId } = req.body;

  try {
    if (!workspaceId) {
      return res.status(400).json({ error: "Workspace ID is required" });
    }

    const suggestions = await prisma.user.findMany({
      where: {
        workspaceMembers: {
          some: {
            workspace_id: workspaceId as string,
          },
        },
        OR: [
          { name: { contains: query as string } },
          { email: { contains: query as string } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true, // Include other fields you want to retrieve
      },
      take: 5, // Limit the number of suggestions
    });

    res.json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
