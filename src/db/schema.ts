import { jsonb, pgSchema, uuid, varchar, text } from "drizzle-orm/pg-core";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export const portfolioSchema = pgSchema("portfolio");

export const resumeInfos = portfolioSchema.table("resume_infos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull().unique(),
  info: jsonb("info").$type<ResumeInfo>().notNull(),
});

export const aboutMe = portfolioSchema.table("about_me", {
  id: uuid("id").primaryKey().defaultRandom(),
  about_me: text("about_me").notNull(),
});

export type InsertResumeInfo = typeof resumeInfos.$inferInsert;
export type SelectResumeInfo = typeof resumeInfos.$inferSelect;

export type InsertAboutMe = typeof aboutMe.$inferInsert;
export type SelectAboutMe = typeof aboutMe.$inferSelect;
