import express, { Router } from "express";
import { sendingVideoToWorspaceMembers } from "../../controllers/sendingToWorkspaceMembers/sendingVideoToWorkspaceMembersController";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Register/Login route
router.get("/sendingVideotoworkspacemembers", sendingVideoToWorspaceMembers);

// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;
