// const express = require("express");
import express, { Express, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
const PORT = 8080;
import cors from "cors";
dotenv.config();

import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import videoRecorderCompletedRoutes from "./routes/videoRecorderCompletedRoutes";
import authentiicateTokenRoutes from "./routes/authenticateTokenRoutes";
import commentRoutes from "./routes/gettingResponse/commentRoutes";

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", videoRecorderCompletedRoutes);
app.use("/api", authentiicateTokenRoutes);
app.use("/api", commentRoutes);

app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Hello world! from normal express" });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
