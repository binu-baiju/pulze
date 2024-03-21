import express, { Router } from "express";

import { findingVideoId } from "../../controllers/gettingResponse/findVideoController";

const router: Router = express.Router();

router.get("/getVideoId/:videoId", findingVideoId);

export default router;
