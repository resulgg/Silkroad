import { z } from "zod";

export const commentDataSchema = z.object({
  parentId: z.string().max(36, { message: "Invalid user id." }).optional(),
  description: z.string()
});

export const commentIdSchema = z.object({
  id: z.string().max(36, { message: "Invalid user id." })
});

export const commentUpdateDataSchema = z.object({
  description: z.string()
});
