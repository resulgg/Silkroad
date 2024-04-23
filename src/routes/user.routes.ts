import { Router } from "express";
import { getAllUser } from "../controllers/user.controllers";

const router = Router();

router.get("/", getAllUser);

export default router;
