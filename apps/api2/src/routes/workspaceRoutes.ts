import express, { Router } from "express";
import { createNewWorkspaceContoller, getWorkspaceContoller, getWorkspaceByUserContoller, deleteWorkspaceContoller } from "../controllers/workspaceController";

const router: Router = express.Router();
router.post("/create-new-workspace", createNewWorkspaceContoller);
router.get("/get-workspace", getWorkspaceContoller);
router.get("/get-workspace-by-user", getWorkspaceByUserContoller);
router.post("/delete-workspace", deleteWorkspaceContoller);
router.post("/update-workspace", deleteWorkspaceContoller);
router.post("/leave-workspace", deleteWorkspaceContoller);

export default router;