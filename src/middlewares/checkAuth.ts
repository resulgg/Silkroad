import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../services/user.services";
import { JwtPayloadId } from "../types/token";
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(400)
        .json({ error: "Unauthorized: no token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadId;
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: invalid token." });
    }

    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = {
      id: user.id,
      email: user.email,
      image: user.image,
      username: user.username
    };
    req.user = userData;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server eror" });
  }
};
