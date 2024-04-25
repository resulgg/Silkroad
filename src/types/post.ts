import { postSchema, postUpdateSchema } from "../validators/post.validators";
import { z } from "zod";
export type PostData = z.infer<typeof postSchema>;
export type PostUpdateData = z.infer<typeof postUpdateSchema>;
