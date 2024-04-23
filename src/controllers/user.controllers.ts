import { Request, Response } from "express";
import { getUser } from "../services/user.services";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await getUser();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
