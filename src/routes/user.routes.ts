import { Router } from "express";
import {
  banUserById,
  followUserById,
  getTenUser,
  getUserDetailsByUsername,
  unBanUserById,
  unfollowUserById,
  updateUserProfile
} from "../controllers/user.controllers";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth, getTenUser);
router.get("/:username", checkAuth, getUserDetailsByUsername);
router.put("/:id/update", checkAuth, updateUserProfile);
router.post("/:id/follow", checkAuth, followUserById);
router.post("/:id/unfollow", checkAuth, unfollowUserById);
router.post("/ban", checkAuth, banUserById);
router.post("/:id/unban", checkAuth, unBanUserById);

export default router;
