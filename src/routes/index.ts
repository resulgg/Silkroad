import { Router } from "express";
import user from "./user.routes";

const router = Router();

router.use("/user", user);
export default router;
