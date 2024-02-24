import express, { Router } from "express";
import { authenticateToken } from "../controllers/authenticateTokenController";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Register/Login route
router.post("/authenticateToken", authenticateToken);

// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;
