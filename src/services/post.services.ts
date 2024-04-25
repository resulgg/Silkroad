import { eq, isNull } from "drizzle-orm";
import db from "../db";
import { post } from "../models/post.models";
import { PostData, PostUpdateData } from "../types/post";
import { comment } from "../models/comment.models";

export const savePost = async (userId: string, postData: PostData) => {
  const data = await db
    .insert(post)
    .values({
      userId,
      title: postData.title,
      description: postData.description
    })
    .returning();
  return data[0];
};

export const getPostDetailsById = async (postId: string) => {
  const data = await db.query.post.findFirst({
    where: eq(post.id, postId),
    with: {
      comment: {
        where: isNull(comment.parentId)
      }
    }
  });
  return data;
};

export const deletePostById = async (postId: string) => {
  const data = await db.delete(post).where(eq(post.id, postId));
  return data;
};

export const checkExistingPost = async (postId: string) => {
  const data = await db.query.post.findFirst({
    where: eq(post.id, postId)
  });
  return data;
};
export const updatePostById = async (
  postId: string,
  postData: PostUpdateData
) => {
  const data = await db.update(post).set(postData).where(eq(post.id, postId));
  return data;
};

export const getPosts = async () => {
  const data = await db.query.post.findMany({
    limit: 15,
    with: {
      comment: true
    }
  });
  return data;
};
