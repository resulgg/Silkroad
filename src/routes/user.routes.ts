import { Router } from "express";
import {
  banUserById,
  followUserById,
  getUsers,
  getUserDetailsByUsername,
  unBanUserById,
  unfollowUserById,
  updateUserProfile
} from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:username", getUserDetailsByUsername);
router.put("/:id/update", updateUserProfile);
router.post("/:id/follow", followUserById);
router.post("/:id/unfollow", unfollowUserById);
router.post("/ban", banUserById);
router.post("/:id/unban", unBanUserById);

export default router;
