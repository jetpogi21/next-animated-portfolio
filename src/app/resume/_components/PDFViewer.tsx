"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { ResumeForm } from "@/app/resume/_components/ResumeForm";
import { ResumeSelector } from "@/app/resume/_components/ResumeSelector";
import { useResumeStore } from "@/app/resume/_store/resume-store";
import { SelectResumeInfo } from "@/db/schema";
import { PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

type PDFViewerProps = {
  initialResumeInfos: SelectResumeInfo[];
};

export const PDFViewer = ({ initialResumeInfos }: PDFViewerProps) => {
  const {
    resumeInfos,
    selectedResumeInfo,
    isLoading,
    error,
    setResumeInfos,
    setSelectedResumeInfo,
    updateResumeInfo,
  } = useResumeStore();

  useEffect(() => {
    setResumeInfos(initialResumeInfos);
  }, [initialResumeInfos, setResumeInfos]);

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }
  }, [error]);

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-1/3 h-full">
        <ResumeSelector
          resumeInfos={resumeInfos}
          selectedResume={selectedResumeInfo?.id ?? ""}
          setSelectedResume={setSelectedResumeInfo}
        />
        <ScrollArea className="flex-1">
          {selectedResumeInfo && (
            <ResumeForm
              resumeInfo={selectedResumeInfo.info}
              onSave={updateResumeInfo}
              isLoading={isLoading}
            />
          )}
        </ScrollArea>
        {selectedResumeInfo && (
          <Button
            type="submit"
            form="resume-form"
            className="w-full"
            data-testid="save-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : null}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>
      {selectedResumeInfo ? (
        <ReactPDFViewer
          height={"100%"}
          width={"100%"}
        >
          <MyDocument values={selectedResumeInfo.info} />
        </ReactPDFViewer>
      ) : (
        <Card className="flex flex-1 justify-center items-center text-muted-foreground">
          Select a resume to view and edit
        </Card>
      )}
    </div>
  );
};
