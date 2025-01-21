"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { ResumeForm } from "@/app/resume/_components/ResumeForm";
import { ResumeSelector } from "@/app/resume/_components/ResumeSelector";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { SelectResumeInfo } from "@/db/schema";
import { PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type PDFViewerProps = {
  initialResumeInfos: SelectResumeInfo[];
};

export const PDFViewer = ({ initialResumeInfos }: PDFViewerProps) => {
  const [selectedResumeInfo, setSelectedResumeInfo] = useState<
    SelectResumeInfo | undefined
  >(initialResumeInfos[0]);

  const handleSave = (updatedInfo: ResumeInfo) => {
    if (!selectedResumeInfo) return;
    // TODO: Save to database
  };

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-1/3 h-full">
        <ResumeSelector
          resumeInfos={initialResumeInfos}
          selectedResume={selectedResumeInfo?.id ?? ""}
          setSelectedResume={(id) => {
            const selected = initialResumeInfos.find((info) => info.id === id);
            setSelectedResumeInfo(selected);
          }}
        />
        <ScrollArea className="flex-1">
          {selectedResumeInfo && (
            <ResumeForm
              resumeInfo={selectedResumeInfo.info}
              onSave={handleSave}
            />
          )}
        </ScrollArea>
      </div>
      <ReactPDFViewer
        height={"100%"}
        width={"100%"}
      >
        <MyDocument values={selectedResumeInfo?.info ?? ({} as ResumeInfo)} />
      </ReactPDFViewer>
    </div>
  );
};
