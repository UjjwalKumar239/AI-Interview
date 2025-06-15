import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_C0jIM5AKqPNB@ep-lingering-dew-a8jshuol-pooler.eastus2.azure.neon.tech/mock-interview?sslmode=require",
  },
});
