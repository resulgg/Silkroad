import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.models";
import { relations } from "drizzle-orm";
import { comment } from "./comment.models";

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
  comment: many(comment, { relationName: "postId" })
}));
