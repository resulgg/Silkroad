import { eq } from "drizzle-orm";
import db from "../db";
import { comment } from "../models/comment.models";
import { commentData, commentUpdateData } from "../types/comment";

export const saveComment = async (
  userId: string,
  postId: string,
  commentData: commentData
) => {
  const parentId = commentData.parentId;
  const data = await db
    .insert(comment)
    .values({
      userId,
      postId,
      description: commentData.description,
      parentId
    })
    .returning();
  return data;
};

export const getCommentsDetailsById = async (id: string) => {
  const data = await db.query.comment.findFirst({
    where: eq(comment.id, id),
    with: {
      comment: true
    }
  });
  return data;
};
export const deleteCommentById = async (id: string) => {
  const data = await db.delete(comment).where(eq(comment.id, id)).returning();
  return data;
};

export const checkExistingComment = async (id: string) => {
  const data = await db.query.comment.findFirst({
    where: eq(comment.id, id)
  });
  return data;
};
export const updateCommentById = async (
  id: string,
  commentUpdateData: commentUpdateData
) => {
  const data = await db
    .update(comment)
    .set(commentUpdateData)
    .where(eq(comment.id, id))
    .returning();
  return data;
};
