import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "180d"
  });
  res.cookie("jwt", token, {
    maxAge: 180 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};
