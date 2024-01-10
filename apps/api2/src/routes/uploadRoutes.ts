import express, { Router } from "express";
const multer = require('multer');

import { uploadVideo } from "../controllers/uploadController";
// import { registerOrLogin } from "../controllers/authControllers";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Multer configuration
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });
// Register/Login route
router.post("/uploadVideo",upload.single('file'),  uploadVideo);


// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;