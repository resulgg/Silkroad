import { Request, Response } from "express";
import { loginSchema, signUpSchema } from "../validators/user.validators";
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

  try {
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

    const newUser = await db
      .insert(user)
      .values({
        name: signUpData.data.name,
        email: signUpData.data.email,
        username: signUpData.data.username,
        password: hashedPassword,
        bio: signUpData.data.bio
      })
      .returning({ id: user.id });
    if (newUser) {
      generateTokenAndSetCookie(newUser[0].id, res);
      res.status(201).json({ message: "New user has been signedup." });
    }
  } catch (err) {
    return res.status(500).json({ error: "User failed to signup" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  const data = req.body;
  const loginData = loginSchema.safeParse(data);

  if (!loginData.success) {
    return res.status(400).json({ error: loginData.error.issues });
  }

  try {
    const user = await getUserByUsername(loginData.data.username);
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.data.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user.id, res);
    res.status(200).json({ message: "Authentication completed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "User failed to login" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "User failed to logout" });
  }
};
