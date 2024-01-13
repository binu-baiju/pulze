import express, { Router } from "express";
import { recorderCompletedSearch } from "../controllers/videoRecorderCompletedController";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Register/Login route
router.get("/videorecordercompleted/search", recorderCompletedSearch);


// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;