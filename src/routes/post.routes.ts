import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostDetails,
  updatePost
} from "../controllers/post.controllers";

const router = Router();

router.get("/", getAllPosts);
router.post("/create", createPost);
router.delete("/:id", deletePost);
router.get("/:id", getPostDetails);
router.put("/:id", updatePost);

export default router;
