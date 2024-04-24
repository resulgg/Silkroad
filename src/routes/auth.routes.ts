import { Router } from "express";
import { logOut, logIn, signUp } from "../controllers/auth.controllers";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", checkAuth, logOut);

export default router;
