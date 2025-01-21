"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { ResumeForm } from "@/app/resume/_components/ResumeForm";
import { ResumeSelector } from "@/app/resume/_components/ResumeSelector";
import { useResumeStore } from "@/app/resume/_store/resume-store";
import { PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useResumes, useUpdateResume } from "../_hooks/use-resume";

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
    // Add more fields here as needed
  };

  const handleSave = async (info: any) => {
    if (!selectedResumeId) return;

    const tempTitle = getTempValue(selectedResumeId, "title");
    await updateResume({
      id: selectedResumeId,
      data: {
        info,
        ...(tempTitle && { title: tempTitle }),
      },
    });
    clearAllTempChanges();
  };

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-1/3 h-full">
        <ResumeSelector />
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
      {effectiveResumeInfo ? (
        <ReactPDFViewer
          height={"100%"}
          width={"100%"}
        >
          <MyDocument values={effectiveResumeInfo.info} />
        </ReactPDFViewer>
      ) : (
        <Card className="flex flex-1 justify-center items-center text-muted-foreground">
          Select a resume to view and edit
        </Card>
      )}
    </div>
  );
};
