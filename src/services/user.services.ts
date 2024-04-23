import db from "../db";

export const getUser = async () => {
  const data = await db.query.user.findMany();
  if (!data) {
    throw new Error("Server error. Please try again.");
  }
  return data;
};
