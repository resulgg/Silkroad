import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.models";
import { relations } from "drizzle-orm";

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: varchar("title", { length: 120 }),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date())
});

export const postRelations = relations(post, ({ one, many }) => ({
  userId: one(user, {
    fields: [post.id],
    references: [user.id],
    relationName: "post"
  }),
  comment: many(comment)
}));

export const comment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  postId: uuid("post_id").notNull(),
  parentId: uuid("user_id").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date())
});

export const commentRelations = relations(comment, ({ one }) => ({
  userId: one(user, {
    fields: [comment.userId],
    references: [user.id]
  }),
  postId: one(post, {
    fields: [comment.postId],
    references: [post.id]
  }),
  parentId: one(comment, {
    fields: [comment.parentId],
    references: [comment.id]
  })
}));
