import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config();

const url = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url,
  },
});
