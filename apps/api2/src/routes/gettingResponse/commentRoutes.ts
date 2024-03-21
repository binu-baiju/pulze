import express, { Router } from "express";
const multer = require("multer");
import {
  createComments,
  deleteComment,
  fetchComments,
  uploadVideoAndCreateComment,
} from "../../controllers/gettingResponse/commentsController";

const router: Router = express.Router();

// Multer configuration
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });
router.get("/comments/:videoId", fetchComments);
router.post("/comments/createcomment/:videoId", createComments);
router.post(
  "/comments/createvideocomment/:videoId",
  upload.single("file"),
  uploadVideoAndCreateComment
);
router.delete("/comments/deletecomment/:commentId", deleteComment);

export default router;
