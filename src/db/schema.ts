import {
  jsonb,
  pgSchema,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export const portfolioSchema = pgSchema("portfolio");

export const resumeInfos = portfolioSchema.table("resume_infos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull().unique(),
  info: jsonb("info").$type<ResumeInfo>().notNull(),
  jobApplicationId: uuid("job_application_id").references(
    () => jobApplications.id
  ),
});

export const aboutMe = portfolioSchema.table("about_me", {
  id: uuid("id").primaryKey().defaultRandom(),
  about_me: text("about_me").notNull(),
});

export const jobApplications = portfolioSchema.table("job_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  jobTitle: text("job_title").notNull(),
  jobDescription: text("job_description"),
  dateApplied: timestamp("date_applied").defaultNow(),
  status: text("status").default("Applied"),
  notes: text("notes"),
});

export type InsertResumeInfo = typeof resumeInfos.$inferInsert;
export type SelectResumeInfo = typeof resumeInfos.$inferSelect;

export type InsertAboutMe = typeof aboutMe.$inferInsert;
export type SelectAboutMe = typeof aboutMe.$inferSelect;

export type InsertJobApplication = typeof jobApplications.$inferInsert;
export type SelectJobApplication = typeof jobApplications.$inferSelect;
