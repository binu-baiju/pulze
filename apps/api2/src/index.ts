// const express = require("express");
import express, { Express,Request,Response} from "express";
const app = express();
const PORT = 8080;
import cors from "cors";

import authRoutes from "./routes/authRoutes";


app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/api/home",(req:Request,res:Response)=>{
    res.json({ message:"Hello world! from normal express"});
});

app.listen(PORT, () => {
  
    console.log('listening on port ' + PORT)
  });