"use client";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { PDFViewer as PDFViewerNative } from "@react-pdf/renderer";
type PDFViewerProps = {};

export const PDFViewer = ({}: PDFViewerProps) => {
  return (
    <PDFViewerNative
      height={"100%"}
      width={"100%"}
    >
      <MyDocument />
    </PDFViewerNative>
  );
};
