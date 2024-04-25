import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .max(50, { message: "Name cannot be more than 50 characters." }),
  username: z
    .string()
    .max(15, { message: "Username cannot be more than 15 characters." }),
  image: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid e-mail." })
    .max(64, { message: "Email cannot be more than 64 characters." }),
  password: z
    .string()
    .max(64, { message: "Password cannot be more than 64 characters." }),
  bio: z
    .string()
    .max(150, { message: "Biography cannot be more than 150 characters." })
    .optional()
});

export const loginSchema = z.object({
  username: z
    .string()
    .max(15, { message: "Username cannot be more than 15 characters." }),
  password: z
    .string()
    .max(64, { message: "Password cannot be more than 64 characters." })
});

export const usernameSchema = z.object({
  username: z.string().max(36, { message: "Invalid user id." })
});
export const userIdSchema = z.object({
  id: z.string().max(36, { message: "Invalid user id." })
});

export const followOrUnfollowIdSchema = z.object({
  id: z.string().max(36, { message: "Invalid user id." })
});

export const banSchema = z.object({
  userId: z.string().max(36, { message: "Invalid user id." }),
  description: z
    .string()
    .max(255, { message: "Description cannot be mroe than 255 characters." })
});

export const unBanSchema = z.object({
  id: z.string().max(36, { message: "Invalid user id." })
});

export const userSchema = z.object({
  name: z
    .string()
    .max(50, { message: "Name cannot be more than 50 characters." })
    .optional(),
  username: z
    .string()
    .max(15, { message: "Username cannot be more than 15 characters." })
    .optional(),
  image: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid e-mail." })
    .max(64, { message: "Email cannot be more than 64 characters." })
    .optional(),
  password: z
    .string()
    .max(64, { message: "Password cannot be more than 64 characters." })
    .optional(),
  bio: z
    .string()
    .max(150, { message: "Biography cannot be more than 150 characters." })
    .optional()
});
