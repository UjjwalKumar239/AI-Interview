import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMocResp: text("jsonMocResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 1000 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 100 }).notNull(),
  creaatedBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});
