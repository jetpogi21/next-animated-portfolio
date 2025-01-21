import { Resume } from "@/app/resume/_components/Resume";
import { db } from "@/db";
import { resumeInfos as resumeInfosTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const ResumePage = async () => {
  const resumeInfos = await db
    .select()
    .from(resumeInfosTable)
    .orderBy(desc(resumeInfosTable.id));

  return <Resume initialResumeInfos={resumeInfos} />;
};

export default ResumePage;
