import { userSchema } from "../validators/user.validators";
import { z } from "zod";
export type UserUpdate = z.infer<typeof userSchema>;
