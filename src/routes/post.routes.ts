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
router.post("/:id", getPostDetails);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
