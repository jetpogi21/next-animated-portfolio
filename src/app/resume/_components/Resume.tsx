"use client";
import { PDFViewer } from "@/app/resume/_components/PDFViewer";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { SelectResumeInfo } from "@/db/schema";

type ResumeProps = {
  initialResumeInfos: SelectResumeInfo[];
};

/* export const Resume = ({}: ResumeProps) => {
  return (
    <PageTransitionContainer>
      
      <div className="flex gap-2 justify-center pb-8 w-full h-full scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin">
        <PDFViewer />
      </div>
    </PageTransitionContainer>
  );
};
 */
export const Resume = ({ initialResumeInfos }: ResumeProps) => {
  return (
    <PageTransitionContainer disableAnimation={false}>
      {/* Main container */}
      <div className="flex gap-2 justify-center p-2 pb-8 w-full h-full scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin">
        <PDFViewer initialResumeInfos={initialResumeInfos} />
      </div>
    </PageTransitionContainer>
  );
};
