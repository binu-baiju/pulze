import express, { Router } from "express";
import { registerOrLogin } from "../controllers/authControllers";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Register/Login route
router.post("/registerOrLogin", registerOrLogin);


// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;