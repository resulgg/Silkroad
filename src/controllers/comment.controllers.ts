import { Request, Response } from "express";
import {
  commentDataSchema,
  commentIdSchema,
  commentUpdateDataSchema
} from "../validators/comment.validators";
import {
  checkExistingComment,
  deleteCommentById,
  getCommentsDetailsById,
  saveComment,
  updateCommentById
} from "../services/comment.services";

export const createComment = async (req: Request, res: Response) => {
  const userId = req.user as { id: string };

  if (!userId.id) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  const commentId = req.params;
  const commentIdData = commentIdSchema.safeParse(commentId);

  if (!commentIdData.success) {
    return res.status(400).json({ error: commentIdData.error.issues });
  }

  const commentBody = req.body;
  const commentData = commentDataSchema.safeParse(commentBody);

  if (!commentData.success) {
    return res.status(400).json({ error: commentData.error.issues });
  }

  try {
    const createdComment = await saveComment(
      userId.id,
      commentIdData.data.id,
      commentData.data
    );
    if (!createComment) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }
    return res.status(201).json(createdComment);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getCommentDetails = async (req: Request, res: Response) => {
  const commentId = req.params;
  const commentIdData = commentIdSchema.safeParse(commentId);

  if (!commentIdData.success) {
    return res.status(400).json({ error: commentIdData.error.issues });
  }

  try {
    const commentDetails = await getCommentsDetailsById(commentIdData.data.id);
    if (!commentDetails) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }
    return res.status(200).json(commentDetails);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params;
  const commentIdData = commentIdSchema.safeParse(commentId);

  if (!commentIdData.success) {
    return res.status(400).json({ error: commentIdData.error.issues });
  }

  try {
    const isCommentExist = await checkExistingComment(commentIdData.data.id);

    if (!isCommentExist) {
      return res.status(400).json({ error: "No comment found to delete." });
    }

    const deletedComment = await deleteCommentById(commentIdData.data.id);

    if (!deletedComment) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res.status(200).json(deletedComment);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params;
  const commentIdData = commentIdSchema.safeParse(commentId);

  if (!commentIdData.success) {
    return res.status(400).json({ error: commentIdData.error.issues });
  }
  const commentData = req.body;
  const commentUpdateData = commentUpdateDataSchema.safeParse(commentData);

  if (!commentUpdateData.success) {
    return res.status(400).json({ error: commentUpdateData.error.issues });
  }

  try {
    const isCommentExist = await checkExistingComment(commentIdData.data.id);

    if (!isCommentExist) {
      return res.status(400).json({ error: "No comment found to updatwe." });
    }

    const updatedComment = await updateCommentById(
      commentIdData.data.id,
      commentUpdateData.data
    );

    if (!updatedComment) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
