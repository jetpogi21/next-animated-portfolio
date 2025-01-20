"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { resumeInfos } from "@/app/resume/_lib/resume-info";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PDFViewerNative = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const PDFViewer = () => {
  const [selectedResume, setSelectedResume] =
    useState<keyof typeof resumeInfos>("Basic");

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Select
        value={selectedResume}
        onValueChange={(value) =>
          setSelectedResume(value as keyof typeof resumeInfos)
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a resume" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(resumeInfos).map((key) => (
            <SelectItem
              key={key}
              value={key}
            >
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <PDFViewerNative
        height={"100%"}
        width={"100%"}
      >
        <MyDocument values={resumeInfos[selectedResume]} />
      </PDFViewerNative>
    </div>
  );
};
