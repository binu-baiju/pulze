import express, { Router } from "express";

import { getVideosCreatedByUser } from "../../controllers/dashboard/getVideosCreatedByUserController";
import { recievedVideos } from "../../controllers/dashboard/recievedVideosController";

const router: Router = express.Router();

router.get("/getvideos/:userId", getVideosCreatedByUser);
router.get("/recievedvideos/:userId", recievedVideos);

export default router;
