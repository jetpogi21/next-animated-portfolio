import { Resume } from "@/app/resume/_components/Resume";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { db } from "@/db";
import { resumeInfos as resumeInfosTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { resumeKeys } from "./_hooks/use-resume";
import { getQueryClient } from "@/lib/get-query-client";

export const ResumePage = async () => {
  const queryClient = getQueryClient();

  // Prefetch resumes
  const resumeInfos = await db
    .select()
    .from(resumeInfosTable)
    .orderBy(desc(resumeInfosTable.id));

  await queryClient.prefetchQuery({
    queryKey: resumeKeys.lists(),
    queryFn: () => resumeInfos,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Resume />
    </HydrationBoundary>
  );
};

export default ResumePage;
