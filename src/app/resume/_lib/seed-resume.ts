import { db } from "@/db";
import { resumeInfos } from "@/db/schema";
import { basicResumeInfo } from "./resume-info/basic-resume";
import { workflowAnalystResumeInfo } from "./resume-info/worflow-analyst";
import { sql } from "drizzle-orm";

export const seedResumes = async () => {
  try {
    await db
      .insert(resumeInfos)
      .values([
        {
          title: "Basic",
          info: basicResumeInfo,
        },
        {
          title: "Workflow Analyst",
          info: workflowAnalystResumeInfo,
        },
      ])
      .onConflictDoUpdate({
        target: resumeInfos.title,
        set: {
          info: sql`excluded.info`,
        },
      });
    console.log("Successfully seeded resume infos");
  } catch (error) {
    console.error("Error seeding resume infos:", error);
  }
};
