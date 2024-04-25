import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as user from "../models/user.models";
import * as post from "../models/post.models";
import * as comment from "../models/comment.models";

dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema: { ...user, ...post, ...comment } });

export default db;
