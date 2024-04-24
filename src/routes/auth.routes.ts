import { Router } from "express";
import { signUp } from "../controllers/auth.controllers";

const router = Router();

router.post("/signup", signUp);
router.post("/login");
router.get("/logout");

export default router;
