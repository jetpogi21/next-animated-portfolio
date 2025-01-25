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
import { useQueryClient } from "@tanstack/react-query";
import { resumeKeys } from "../_hooks/use-resume";
import { SelectResumeInfo } from "@/db/schema";

export const PDFViewer = () => {
  const { data: resumeInfos } = useResumes();
  const { selectedResumeId } = useResumeStore();
  const queryClient = useQueryClient();
  const { mutate: updateResume, isPending: isUpdating } = useUpdateResume();

  const selectedResumeInfo = resumeInfos?.find(
    (r) => r.id === selectedResumeId
  );

  const handleSave = async (info: any, jobApplicationId: string | null) => {
    if (!selectedResumeId || !selectedResumeInfo) return;

    // Optimistically update the UI
    queryClient.setQueryData<SelectResumeInfo[]>(resumeKeys.lists(), (old) =>
      old?.map((resume) =>
        resume.id === selectedResumeId
          ? {
              ...resume,
              info,
              jobApplicationId,
            }
          : resume
      )
    );

    // Perform the actual update
    updateResume({
      id: selectedResumeId,
      data: {
        info,
        jobApplicationId,
      },
    });
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
                  selectedResumeInfo?.jobApplicationId ?? null
                }
                onSelect={(jobApplicationId) => {
                  if (selectedResumeId && selectedResumeInfo) {
                    // Optimistically update the UI
                    queryClient.setQueryData<SelectResumeInfo[]>(
                      resumeKeys.lists(),
                      (old) =>
                        old?.map((resume) =>
                          resume.id === selectedResumeId
                            ? {
                                ...resume,
                                jobApplicationId,
                              }
                            : resume
                        )
                    );

                    // Perform the actual update
                    updateResume({
                      id: selectedResumeId,
                      data: {
                        info: selectedResumeInfo.info,
                        jobApplicationId,
                      },
                    });
                  }
                }}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {selectedResumeInfo && (
              <ResumeForm
                resumeInfo={selectedResumeInfo.info}
                onSave={handleSave}
                isLoading={isUpdating}
                selectedResumeInfo={selectedResumeInfo}
                onResumeNameChange={(title) => {
                  if (selectedResumeId && selectedResumeInfo) {
                    // Optimistically update the UI
                    queryClient.setQueryData<SelectResumeInfo[]>(
                      resumeKeys.lists(),
                      (old) =>
                        old?.map((resume) =>
                          resume.id === selectedResumeId
                            ? {
                                ...resume,
                                title,
                              }
                            : resume
                        )
                    );

                    // Perform the actual update
                    updateResume({
                      id: selectedResumeId,
                      data: {
                        info: selectedResumeInfo.info,
                        title,
                      },
                    });
                  }
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
        <ResumeTabs effectiveResumeInfo={selectedResumeInfo} />
      </div>
    </div>
  );
};
