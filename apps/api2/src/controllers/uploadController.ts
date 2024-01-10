import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
import { config } from "dotenv";
import { PrismaClient } from '@prisma/client'
import stream from 'stream';

import { createUploadStream } from "../../../api/src/modules/stream";
const prisma = new PrismaClient();

// Load environment variables
config();


// interface MyRequest extends Request {
//     file: {
//       filename: string;
//       createReadStream: () => NodeJS.ReadableStream;
//       // Add any other properties you expect in the file object
//     };
//   }

export const uploadVideo = async (req: Request, res: Response) => {
  console.log("Hello from backend");
  // console.log("Request object:", req);
  
    const { file } = req as any; // Assuming you are using a middleware to handle file uploads
 console.log(file);
 
  
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
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
  
      res.json({ success: true, result });
    } catch (error: any) {
      console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
      res.status(500).json({ error: `Error uploading file ${originalname} hello`,originalname });
    }
  }

//   try {
//     const uploadStream = createUploadStream(filename);
//     stream.pipe(uploadStream.writeStream);
//     const result = await uploadStream.promise;

//     res.json({ success: true, result });
//   } catch (error: any) {
//     console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
//     res.status(500).json({ error: `Error uploading file ${filename} hello`,filename });
//   }
// }


// export const dashboard = async (req: Request, res: Response) => {
//   const token = req.header("x-access-token");
//   try {
//     const decoded: any = jwt.verify(token!, process.env.SECRET_KEY!);
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     if (user) {
//       const name = user.email.split("@")[0];
//       res.json({ message: "Authenticated email found", name: name, status: "ok" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Invalid token" });
//   }
// };
