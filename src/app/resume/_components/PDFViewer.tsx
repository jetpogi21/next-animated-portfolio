"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { resumeInfos } from "@/app/resume/_lib/resume-info";
import dynamic from "next/dynamic";

const PDFViewerNative = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const PDFViewer = () => {
  const resumeInfo = resumeInfos.basic;
  return (
    <PDFViewerNative
      height={"100%"}
      width={"100%"}
    >
      <MyDocument values={resumeInfo} />
    </PDFViewerNative>
  );
};
