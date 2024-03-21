import express, { Router } from "express";
import { sendVideo } from "../../controllers/recordingCompleted/sendVideoController";

const router: Router = express.Router();

router.post("/sendvideo", sendVideo);

export default router;
