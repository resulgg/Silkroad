import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "./src/models",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEON_DATABASE_URL!
  },
  verbose: true,
  strict: true
} satisfies Config;
