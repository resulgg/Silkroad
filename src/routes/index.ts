import { Router } from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import post from "./post.routes";

const router = Router();

router.use("/health", (req, res) => {
  res.sendStatus(200);
});

router.use("/auth", auth);
router.use("/users", user);
router.use("/posts", post);
export default router;
