import { Router } from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import post from "./post.routes";
import comment from "./comment.routes";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.use("/health", (req, res) => {
  res.sendStatus(200);
});

router.use("/auth", auth);
router.use("/users", checkAuth, user);
router.use("/posts", checkAuth, post);
router.use("/comments", checkAuth, comment);

export default router;
