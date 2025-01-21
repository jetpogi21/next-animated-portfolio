"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { ResumeForm } from "@/app/resume/_components/ResumeForm";
import { ResumeSelector } from "@/app/resume/_components/ResumeSelector";
import {
  resumeInfos as initialResumeInfos,
  ResumeInfo,
} from "@/app/resume/_lib/resume-info";
import dynamic from "next/dynamic";
import { useState } from "react";

const PDFViewerNative = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const PDFViewer = () => {
  const [selectedResume, setSelectedResume] =
    useState<keyof typeof initialResumeInfos>("Basic");
  const [resumeInfos, setResumeInfos] =
    useState<typeof initialResumeInfos>(initialResumeInfos);

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-1/3">
        <ResumeSelector
          resumeInfos={resumeInfos}
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
        />
        <ResumeForm
          resumeInfo={resumeInfos[selectedResume]}
          onSave={(updatedInfo: ResumeInfo) => {
            setResumeInfos((prev) => ({
              ...prev,
              [selectedResume]: updatedInfo,
            }));
          }}
        />
      </div>
      <PDFViewerNative
        height={"100%"}
        width={"100%"}
      >
        <MyDocument values={resumeInfos[selectedResume]} />
      </PDFViewerNative>
    </div>
  );
};
