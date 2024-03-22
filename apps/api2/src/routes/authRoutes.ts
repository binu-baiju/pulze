import express, { Router } from "express";
import { registerOrLogin,getUserInfoContoller,updateUserNameContoller } from "../controllers/authControllers";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";

const router: Router = express.Router();

// Register/Login route
router.post("/registerOrLogin", registerOrLogin);
router.get("/get-user-info", getUserInfoContoller)
router.post("/update-user-name", updateUserNameContoller);

// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);

export default router;