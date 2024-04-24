import { Router } from "express";
import { getAllUser } from "../controllers/user.controllers";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/", getAllUser);

export default router;
