import { Router } from "express";
import { logOut, logIn, signUp, getMe } from "../controllers/auth.controllers";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", checkAuth, logOut);
router.get("/get-me", checkAuth, getMe);

export default router;
