"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import dynamic from "next/dynamic";

export const PDFViewer = () => {
  const PDFViewerNative = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  return (
    <PDFViewerNative
      height={"100%"}
      width={"100%"}
    >
      <MyDocument />
    </PDFViewerNative>
  );
};
