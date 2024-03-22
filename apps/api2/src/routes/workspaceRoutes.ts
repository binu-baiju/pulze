import express, { Router } from "express";
import { createNewWorkspaceContoller, getWorkspaceContoller, getWorkspaceByUserContoller, deleteWorkspaceContoller,leaveWorkspaceContoller,updateWorkspaceNameContoller, getWorkspaceMemberContoller,addWorkspaceMemberContoller } from "../controllers/workspaceController";

const router: Router = express.Router();
router.post("/create-new-workspace", createNewWorkspaceContoller);
router.get("/get-workspace", getWorkspaceContoller);
router.get("/get-workspace-by-user", getWorkspaceByUserContoller);
router.post("/delete-workspace", deleteWorkspaceContoller);
router.post("/update-workspace", deleteWorkspaceContoller);
router.post("/leave-workspace", leaveWorkspaceContoller);
router.post("/update-workspace-name", updateWorkspaceNameContoller)
router.get("/get-workspace-members", getWorkspaceMemberContoller)
router.post("/add-workspace-members", addWorkspaceMemberContoller)

export default router;