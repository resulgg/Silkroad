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
