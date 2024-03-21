import express, { Router } from "express";

import { getVideosCreatedByUser } from "../../controllers/dashboard/getVideosCreatedByUserController";
import { recievedVideos } from "../../controllers/dashboard/recievedVideosController";
import { deleteVideo } from "../../controllers/dashboard/deleteVideoByVideoIdController";

const router: Router = express.Router();

router.get("/getvideos/:userId", getVideosCreatedByUser);
router.get("/recievedvideos/:userId", recievedVideos);
router.delete("/deletevideo", deleteVideo);

export default router;
