"use client";
import { PDFViewer } from "@/app/resume/_components/PDFViewer";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";

/* export const Resume = ({}: ResumeProps) => {
  return (
    <PageTransitionContainer>
      
      <div className="flex w-full h-full justify-center gap-2 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm  scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin pb-8">
        <PDFViewer />
      </div>
    </PageTransitionContainer>
  );
};
 */
export const Resume = () => {
  return (
    <PageTransitionContainer disableAnimation={false}>
      {/* Main container */}
      <div className="flex w-full h-full justify-center gap-2 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm  scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin pb-8">
        <PDFViewer />
      </div>
    </PageTransitionContainer>
  );
};
