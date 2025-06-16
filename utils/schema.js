import { pgTable, serial, varchar, text, json } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMocResp: json("jsonMocResp").notNull(), // ✅ Changed from text to json
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 1000 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 100 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});
