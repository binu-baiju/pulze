// const express = require("express");
import express, { Express, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
const PORT = 8080;
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
dotenv.config();

import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import videoRecorderCompletedRoutes from "./routes/videoRecorderCompletedRoutes";
import authentiicateTokenRoutes from "./routes/authenticateTokenRoutes";
import commentRoutes from "./routes/gettingResponse/commentRoutes";
import sendRoutes from "./routes/recordingCompleted/sendVideoRoute";
import videoRoutes from "./routes/dashboard/videoRoutes";
import updateRecipientStatusRoute from "./routes/gettingResponse/updateRecipientStatusRoute";
import findingVideoIdRoute from "./routes/gettingResponse/findingVideoRoute";
import workspaceRoutes from "./routes/workspaceRoutes";
// import { User } from "../../web/types/index";

app.use(cors());

app.use(express.json());

// Create http server using Express app
const server: http.Server = http.createServer(app);

// Create socket.io server
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

interface User {
  userId: string;
}

const rooms: { [key: string]: User[] } = {};
io.on("connection", (socket) => {
  // console.log(`A user connected:${socket.id}`);

  socket.on(
    "sendVideo",
    ({
      recipients,
      videoObjectFromRecorder,
    }: {
      recipients: User[];
      videoObjectFromRecorder: any;
    }) => {
      // console.log("send video backedn recipients", recipients);
      // console.log(
      //   "send video backedn videoobjectfromrecorder",
      //   videoObjectFromRecorder
      // );

      const room = generateRoom(recipients);
      // console.log(room);

      // Broadcast video object to all users in the room
      io.to(room).emit("receiveVideo", videoObjectFromRecorder);
    }
  );

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
  });
});

const generateRoom = (users: User[]): string => {
  // Generate a room name based on user IDs
  const userIds = users
    .map((user) => user.userId)
    .sort()
    .join("-");
  const room = `room-${userIds}`;

  // Store users in the room
  rooms[room] = users;

  // Join all users to the room
  users.forEach((user) => {
    io.to(user.userId).emit("roomCreated", room);
    io.sockets.sockets.get(user.userId)?.join(room);
  });

  return room;
};

app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", videoRecorderCompletedRoutes);
app.use("/api", authentiicateTokenRoutes);
app.use("/api", commentRoutes);
app.use("/api", sendRoutes);
app.use("/api", videoRoutes);
app.use("/api", updateRecipientStatusRoute);
app.use("/api", findingVideoIdRoute);
app.use("/api", workspaceRoutes);


app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Hello world! from normal express" });
});

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});