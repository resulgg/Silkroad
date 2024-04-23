import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  timestamp,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("text", { length: 50 }).notNull(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  image: text("image"),
  email: varchar("email", { length: 64 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  password: varchar("password", { length: 64 }).notNull(),
  bio: varchar("bio", { length: 150 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .$onUpdate(() => new Date()),
  isTwoFactorEnabled: boolean("is_two_factor_enabled").default(false),
});

export const follow = pgTable(
  "follow",
  {
    followerId: uuid("follower_id")
      .notNull()
      .references(() => user.id),
    followingId: uuid("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followerId, table.followingId] }),
    };
  }
);

export const block = pgTable("block", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  blockedBy: uuid("blocked_by")
    .notNull()
    .references(() => user.id),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const token = pgTable("token", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
});

export const twoFactorConfirmation = pgTable("two_factor_confirmation", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
});
