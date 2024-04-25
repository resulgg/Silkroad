import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as user from "../models/user.models";
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema: { ...user } });
export default db;
