import { jsonb, pgSchema, uuid, varchar } from "drizzle-orm/pg-core";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export const portfolioSchema = pgSchema("portfolio");

export const resumeInfos = portfolioSchema.table("resume_infos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  info: jsonb("info").$type<ResumeInfo>().notNull(),
});

export type InsertResumeInfo = typeof resumeInfos.$inferInsert;
export type SelectResumeInfo = typeof resumeInfos.$inferSelect;
