"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { ResumeForm } from "@/app/resume/_components/ResumeForm";
import { ResumeSelector } from "@/app/resume/_components/ResumeSelector";
import { useResumeStore } from "@/app/resume/_store/resume-store";
import { PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileIcon, Loader2 } from "lucide-react";
import { useResumes, useUpdateResume } from "../_hooks/use-resume";
import { AboutMe } from "./AboutMe";
import { ResumeTabs } from "@/app/resume/_components/ResumeTabs";
import { JobApplicationSelector } from "@/app/resume/_components/JobApplicationSelector";
import { Label } from "@/components/ui/Label";

export const PDFViewer = () => {
  const { data: resumeInfos } = useResumes();
  const { selectedResumeId, getTempValue, setTempValue, clearAllTempChanges } =
    useResumeStore();
  const { mutate: updateResume, isPending: isUpdating } = useUpdateResume();

  const selectedResumeInfo = resumeInfos?.find(
    (r) => r.id === selectedResumeId
  );

  // Get the temporary or actual values
  const getEffectiveValue = (field: string, defaultValue: any) =>
    selectedResumeId
      ? getTempValue(selectedResumeId, field) ?? defaultValue
      : defaultValue;

  const effectiveResumeInfo = selectedResumeInfo && {
    ...selectedResumeInfo,
    title: getEffectiveValue("title", selectedResumeInfo.title),
    jobApplicationId: getEffectiveValue(
      "jobApplicationId",
      selectedResumeInfo.jobApplicationId
    ),
  };

  const handleSave = async (info: any) => {
    if (!selectedResumeId) return;

    const tempTitle = getTempValue(selectedResumeId, "title");
    const tempJobApplicationId = getTempValue(
      selectedResumeId,
      "jobApplicationId"
    );
    await updateResume({
      id: selectedResumeId,
      data: {
        info,
        ...(tempTitle && { title: tempTitle }),
        jobApplicationId: tempJobApplicationId ?? null,
      },
    });
    clearAllTempChanges();
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div>
        <AboutMe />
      </div>
      {/* Form and actual resume */}
      <div className="flex overflow-y-auto gap-4">
        <div className="flex flex-col gap-4 w-[300px] shrink-0">
          <ResumeSelector />
          <div className="space-y-2">
            <Label>Link to Job Application</Label>
            <div className="overflow-hidden">
              <JobApplicationSelector
                selectedJobApplicationId={
                  effectiveResumeInfo?.jobApplicationId ?? null
                }
                onSelect={(jobApplicationId) => {
                  if (selectedResumeId) {
                    setTempValue(
                      selectedResumeId,
                      "jobApplicationId",
                      jobApplicationId
                    );
                  }
                }}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {effectiveResumeInfo && (
              <ResumeForm
                resumeInfo={effectiveResumeInfo.info}
                onSave={handleSave}
                isLoading={isUpdating}
                selectedResumeInfo={effectiveResumeInfo}
                onResumeNameChange={(title) => {
                  if (!selectedResumeId) return;
                  setTempValue(selectedResumeId, "title", title);
                }}
              />
            )}
          </ScrollArea>
          {selectedResumeInfo && (
            <Button
              type="submit"
              form="resume-form"
              className="w-full"
              data-testid="save-button"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : null}
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </div>
        <ResumeTabs effectiveResumeInfo={effectiveResumeInfo} />
      </div>
    </div>
  );
};
