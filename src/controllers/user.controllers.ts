import { Request, Response } from "express";
import {
  banUser,
  checkExistingBan,
  checkExistingFollow,
  followUser,
  getAllUsers,
  getUserByUsername,
  unBanUser,
  unFollowUser,
  updateUser
} from "../services/user.services";
import {
  banSchema,
  followOrUnfollowIdSchema,
  unBanSchema,
  userIdSchema,
  usernameSchema,
  userSchema
} from "../validators/user.validators";

export const getTenUser = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export const getUserDetailsByUsername = async (req: Request, res: Response) => {
  const params = req.params;
  const userData = usernameSchema.safeParse(params);

  if (!userData.success) {
    return res.status(400).json({ error: userData.error.message });
  }

  try {
    const user = await getUserByUsername(userData.data.username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      name: user.name,
      username: user.username,
      bio: user.bio,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const followUserById = async (req: Request, res: Response) => {
  const followerId = req.user as { id: string };

  if (!followerId) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const followingUsername = req.params;

  const followingUserData =
    followOrUnfollowIdSchema.safeParse(followingUsername);

  if (!followingUserData.success) {
    return res.status(400).json({ error: followingUserData.error.issues });
  }

  if (followerId.id === followingUserData.data.id) {
    return res.status(403).json({ error: "You cannot follow yourself." });
  }

  try {
    const existingFollow = await checkExistingFollow(followingUserData.data.id);

    if (existingFollow) {
      return res.status(404).json({ error: "You are already following" });
    }

    const follow = await followUser(followerId.id, followingUserData.data.id);
    if (!follow) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }
    return res.status(201).json({ message: "You followed successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const unfollowUserById = async (req: Request, res: Response) => {
  const followerId = req.user as { id: string };

  if (!followerId) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const followingUsername = req.params;
  const followingUserData =
    followOrUnfollowIdSchema.safeParse(followingUsername);

  if (!followingUserData.success) {
    return res.status(400).json({ error: followingUserData.error.issues });
  }

  if (followerId.id === followingUserData.data.id) {
    return res.status(403).json({ error: "You cannot unfollow yourself." });
  }

  try {
    const existingFollow = await checkExistingFollow(followingUserData.data.id);

    if (!existingFollow) {
      return res.status(404).json({ error: "You are not following." });
    }

    const data = await unFollowUser(followerId.id, followingUserData.data.id);

    if (!data) {
      res
        .status(500)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res.status(201).json({ message: "You unfollowed successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const banUserById = async (req: Request, res: Response) => {
  const blockedBy = req.user as { id: string };

  if (!blockedBy) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const banData = req.body;
  const banUserIdData = banSchema.safeParse(banData);

  if (!banUserIdData.success) {
    return res.status(400).json({ error: banUserIdData.error.issues });
  }

  if (blockedBy.id === banUserIdData.data.userId) {
    return res.status(403).json({ error: "You cannot block yourself." });
  }

  try {
    const existingBan = await checkExistingBan(banUserIdData.data.userId);

    if (existingBan) {
      return res.status(404).json({ error: "Already blocked." });
    }

    const data = await banUser(
      banUserIdData.data.userId,
      blockedBy.id,
      banUserIdData.data.description
    );

    if (!data) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server.Please try again." });
    }
    return res.status(201).json({ message: "You blocked successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const unBanUserById = async (req: Request, res: Response) => {
  const blockedBy = req.user as { id: string };

  if (!blockedBy) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const banData = req.params;
  const banUserIdData = unBanSchema.safeParse(banData);

  if (!banUserIdData.success) {
    return res.status(400).json({ error: banUserIdData.error.issues });
  }

  if (blockedBy.id === banUserIdData.data.id) {
    return res.status(403).json({ error: "You cannot unblock yourself." });
  }

  try {
    const existingBan = await checkExistingBan(banUserIdData.data.id);
    if (!existingBan) {
      return res.status(404).json({ error: "No blocking found." });
    }

    const data = await unBanUser(banUserIdData.data.id);

    if (!data) {
      return res
        .status(500)
        .json({ error: "An error occurred on the server.Please try again." });
    }

    return res.status(201).json({ message: "You unblocked successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.params;
  const updateUserId = userIdSchema.safeParse(userId);
  const ownId = req.user as { id: string };

  if (!ownId) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  if (!updateUserId.success) {
    return res.status(400).json({ error: updateUserId.error.issues });
  }

  if (updateUserId.data.id !== ownId.id) {
    return res
      .status(401)
      .json({ message: "You can only update your own profile." });
  }

  const userData = req.body;
  const updateData = userSchema.safeParse(userData);

  if (!updateData.success) {
    return res.status(400).json({ error: updateData.error.issues });
  }

  try {
    const data = await updateUser(updateUserId.data.id, updateData.data);

    if (!data) {
      return res
        .status(400)
        .json({ error: "An error occurred on the server. Please try again." });
    }

    return res
      .status(200)
      .json({ message: "Your profile has been successfully updated." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
