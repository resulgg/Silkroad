import { z } from "zod";
import {
  commentDataSchema,
  commentUpdateDataSchema
} from "../validators/comment.validators";

export type commentData = z.infer<typeof commentDataSchema>;
export type commentUpdateData = z.infer<typeof commentUpdateDataSchema>;
