// import { Request, Response } from "express";
// import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
// import { config } from "dotenv";
import prisma from "../../lib/prisma";

import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// Load environment variables
// config();

export async function POST(request) {
  console.log("hello login called");

  // console.log(req.body);

  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  let oneUser;
  try {
    // const token = jwt.sign({
    //   email: email,
    // }, process.env.SECRET_KEY!);
    let user;
    try {
      user = await prisma.user.findUnique({ where: { email: email } });
      console.log("user from registerorlogin", user);
    } catch (error) {
      console.error("error to find user", error);
    }

    if (user) {
      console.log("entered login");

      if (user.password !== null) {
        console.log("entered user.password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // User exists, login will be done
        console.log("ispasswordValid", isPasswordValid);

        if (isPasswordValid) {
          console.log("entered isPasswordValid true ");

          return NextResponse.json({
            message: "Login Successful",
            // token: token,
            success: true,
          });
        } else {
          console.log("entered isPasswordValid false ");

          return NextResponse.json({
            message: "Incorrect password",
            // ok: false,
            success: false,
            status: 401, // Unauthorized
          });
        }
      }
      //   return NextResponse.json({
      //     message: "Login Successfull",
      //     success: true,
      //   });
    } else {
      return NextResponse.json({
        message: "User not found! Signup First",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: "Authentication error occurredence",
      user: oneUser,
    });
  }
}
