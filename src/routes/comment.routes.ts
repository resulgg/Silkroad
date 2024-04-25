import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentDetails,
  updateComment
} from "../controllers/comment.controllers";

const router = Router();

router.get("/:id", getCommentDetails);
router.post("/:id/create", createComment);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

export default router;
