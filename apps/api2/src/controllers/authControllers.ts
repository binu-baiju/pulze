import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import User from "../model/usermodel";
import { config } from "dotenv";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Load environment variables
config();


export const registerOrLogin = async (req: Request, res: Response) => {
console.log("hello login called");



    console.log(req.body);
    
  const { email, password,phonenumber } = req.body;
  let oneUser;
  try {
    const token = jwt.sign({
      email: email,
    }, process.env.SECRET_KEY!);

    const user = await prisma.user.findUnique({where:{ email: email }});
    console.log(user);
    
    if (!user) {
      // No user, registration will be done
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);

      const name = req.body.email.split('@')[0];
       console.log(name);
       
    //   await prisma.user.create({
    //     data:{
    //         email: req.body.email,
    //         password: hashedPassword,
    //         name:name
    //     }
        
    //   });
    
     oneUser =  await prisma.user.create({
        data:{
            email: req.body.email,
            name:name,
            password: hashedPassword,
            phonenumber:phonenumber
        }
        
      });
      try {
        const workspace = await prisma.workspace.create({
          data: {
            name: name,
            workspace_creator_id: oneUser.id,
          }
        });
  
        // Create WorkspaceMember and connect to the created Workspace
        const workspaceMember = await prisma.workspaceMember.create({
          data: {
            user_id: oneUser.id,
            workspace_id: workspace.workspace_id,
          }
        });
      console.log(workspace);

        
      } catch (error) {
        console.error("Error creating workspace:", error);
        return res.status(500).json({ status: "error", error: "Workspace creation failed" });
      }
     

      console.log(oneUser);
      
      return res.json({ message: "Registration Successful", token: token });
    } else {
      if (user.password !== null) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      // User exists, login will be done
      if (isPasswordValid) {
        return res.json({ message: "Login Successful", token: token });
      } else {
        console.log(isPasswordValid);
        
        return res.status(401).json({ status: "error", error: "Incorrect password" });
      }
    }
    }
  } catch (error) {
    

    res.json({ status: "error", error: "Authentication error occurredence",user:oneUser });
  }
};

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
