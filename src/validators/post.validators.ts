import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .max(120, { message: "The title cannot be more than 120 characters." }),
  description: z.string()
});

export const postIdSchema = z.object({
  id: z.string().max(36, { message: "Invalid user id." })
});

export const postUpdateSchema = z.object({
  title: z
    .string()
    .max(120, { message: "The title cannot be more than 120 characters." })
    .optional(),
  description: z.string().optional()
});
