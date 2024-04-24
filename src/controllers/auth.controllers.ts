import { Request, Response } from "express";
import { signUpSchema } from "../validators/user.validators";
import { getUserByEmail, getUserByUsername } from "../services/user.services";
import bcrypt from "bcrypt";
import db from "../db";
import { user } from "../models/user.models";
import { generateTokenAndSetCookie } from "../utils/generateToken";
export const signUp = async (req: Request, res: Response) => {
  const data = req.body;
  const signUpData = signUpSchema.safeParse(data);

  if (!signUpData.success) {
    return res.status(400).json({ error: signUpData.error.issues });
  }

  const existingUser = await getUserByEmail(signUpData.data.email);

  if (existingUser) {
    return res.status(400).json({ error: "Email is already taken" });
  }

  const existingUsername = await getUserByUsername(signUpData.data.email);

  if (existingUsername) {
    return res.status(400).json({ error: "Username is already taken" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(signUpData.data.password, salt);

  try {
    const newUser = await db
      .insert(user)
      .values({
        name: signUpData.data.name,
        email: "123",
        username: signUpData.data.username,
        password: hashedPassword,
        bio: signUpData.data.bio
      })
      .returning({ id: user.id });
    if (newUser) {
      generateTokenAndSetCookie(newUser[0].id, res);
      res.status(200).json({ message: "New user has been signedup." });
    }
  } catch (err) {
    return res.status(500).json({ error: "User failed to signup" });
  }
};
