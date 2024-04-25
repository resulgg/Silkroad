import { Request, Response } from "express";
import {
  postIdSchema,
  postSchema,
  postUpdateSchema
} from "../validators/post.validators";
import {
  checkExistingPost,
  deletePostById,
  getPostDetailsById,
  getPosts,
  savePost,
  updatePostById
} from "../services/post.services";

export const createPost = async (req: Request, res: Response) => {
  const userId = req.user as { id: string };
  const postData = req.body;

  if (!userId.id) {
    return res.status(401).json({ error: "unauthorized access." });
  }

  const userPostData = postSchema.safeParse(postData);

  if (!userPostData.success) {
    return res.status(400).json({ error: userPostData.error.issues });
  }

  try {
    const savedPostdata = await savePost(userId.id, userPostData.data);

    if (!savedPostdata) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }
    return res.status(201).json(savedPostdata);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getPostDetails = async (req: Request, res: Response) => {
  const postId = req.params;
  const postIdData = postIdSchema.safeParse(postId);

  if (!postIdData.success) {
    return res.status(400).json({ error: postIdData.error.issues });
  }
  try {
    const postDetails = await getPostDetailsById(postIdData.data.id);
    console.log(postDetails);
    if (!postDetails) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res.status(200).json(postDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params;
  const postIdData = postIdSchema.safeParse(postId);

  if (!postIdData.success) {
    return res.status(400).json({ error: postIdData.error.issues });
  }

  try {
    const isPostExist = await checkExistingPost(postIdData.data.id);

    if (!isPostExist) {
      return res.status(400).json({ message: "No posts found to delete." });
    }

    const deletedPost = await deletePostById(postIdData.data.id);
    if (!deletedPost) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res
      .status(200)
      .json({ message: "The post has been deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params;
  const postData = req.body;

  const postIdData = postIdSchema.safeParse(postId);
  if (!postIdData.success) {
    return res.status(400).json({ error: postIdData.error.issues });
  }

  const userUpdateData = postUpdateSchema.safeParse(postData);

  if (!userUpdateData.success) {
    return res.status(400).json({ error: userUpdateData.error.issues });
  }

  try {
    const isPostExist = await checkExistingPost(postIdData.data.id);

    if (!isPostExist) {
      return res.status(400).json({ message: "No posts found to update." });
    }

    const updatePost = await updatePostById(
      postIdData.data.id,
      userUpdateData.data
    );

    if (!updatePost) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res
      .status(200)
      .json({ message: "The post has been updated successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const postData = await getPosts();
    if (!postData) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }
    return res.status(200).json(postData);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
