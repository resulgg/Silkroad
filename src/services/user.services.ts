import { eq } from "drizzle-orm";
import db from "../db";
import { block, follow, user } from "../models/user.models";
import { UserUpdate } from "../types/user";

export const getAllUsers = async () => {
  const data = await db.query.user.findMany({
    with: {
      follower: true,
      following: true,
      blocked: true,
      blockedBy: true
    },
    limit: 10
  });
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

export const followUser = async (followerId: string, followingId: string) => {
  const data = await db.insert(follow).values({
    followerId,
    followingId
  });
  return data;
};
export const unFollowUser = async (followerId: string, followingId: string) => {
  const data = await db
    .delete(follow)
    .where(eq(follow.followerId, followingId));
  return data;
};

export const checkExistingFollow = async (followingId: string) => {
  const data = await db.query.follow.findFirst({
    where: eq(follow.followingId, followingId)
  });
  return data;
};

export const banUser = async (
  userId: string,
  blockedBy: string,
  description: string
) => {
  const data = await db.insert(block).values({
    userId,
    blockedBy,
    description
  });
  return data;
};

export const unBanUser = async (userId: string) => {
  const data = await db.delete(block).where(eq(block.userId, userId));
  return data;
};

export const checkExistingBan = async (userId: string) => {
  const data = await db.query.block.findFirst({
    where: eq(block.userId, userId)
  });
  return data;
};

export const updateUser = async (userId: string, updateData: UserUpdate) => {
  const data = await db.update(user).set(updateData).where(eq(user.id, userId));
  return data;
};
