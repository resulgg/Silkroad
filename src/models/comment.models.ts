import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user.models";
import { post } from "./post.models";

export const comment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  postId: uuid("post_id").notNull(),
  parentId: uuid("parent_id"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date())
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  userId: one(user, {
    fields: [comment.userId],
    references: [user.id],
    relationName: "userId"
  }),
  postId: one(post, {
    fields: [comment.postId],
    references: [post.id],
    relationName: "postId"
  }),
  parentId: one(comment, {
    fields: [comment.parentId],
    references: [comment.id],
    relationName: "parentId"
  }),
  comment: many(comment, { relationName: "parentId" })
}));
