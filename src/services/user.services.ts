import { eq } from "drizzle-orm";
import db from "../db";
import { user } from "../models/user.models";

export const getUser = async () => {
  const data = await db.query.user.findMany();
  if (!data) {
    throw new Error("Server error. Please try again.");
  }
  return data;
};

export const getUserByEmail = async (email: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.email, email)
  });
  return data;
};
export const getUserByUsername = async (username: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.username, username)
  });
  return data;
};

export const getUserById = async (id: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.id, id)
  });
  return data;
};
