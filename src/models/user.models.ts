import { relations } from "drizzle-orm";
import {
  text,
  pgTable,
  uuid,
  varchar,
  timestamp,
  primaryKey
} from "drizzle-orm/pg-core";
import { post } from "./post.models";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("text", { length: 50 }).notNull(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  image: text("image"),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 64 }).notNull(),
  bio: varchar("bio", { length: 150 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date())
});

export const userRelations = relations(user, ({ many }) => ({
  following: many(follow, { relationName: "following" }),
  follower: many(follow, { relationName: "follower" }),
  blocked: many(block, { relationName: "blocked" }),
  blockedBy: many(block, { relationName: "blockedBy" }),
  post: many(post, { relationName: "post" })
}));

export const follow = pgTable(
  "follow",
  {
    followerId: uuid("follower_id").notNull(),
    followingId: uuid("following_id").notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followerId, table.followingId] })
    };
  }
);

export const followRelations = relations(follow, ({ one }) => ({
  follower: one(user, {
    fields: [follow.followerId],
    references: [user.id],
    relationName: "follower"
  }),
  following: one(user, {
    fields: [follow.followingId],
    references: [user.id],
    relationName: "following"
  })
}));

export const block = pgTable("block", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  blockedBy: uuid("blocked_by").notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const blockRelations = relations(block, ({ one }) => ({
  blocked: one(user, {
    fields: [block.userId],
    references: [user.id],
    relationName: "blocked"
  }),
  blockedBy: one(user, {
    fields: [block.blockedBy],
    references: [user.id],
    relationName: "blockedBy"
  })
}));
