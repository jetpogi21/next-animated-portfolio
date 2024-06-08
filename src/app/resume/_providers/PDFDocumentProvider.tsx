import React, { ReactNode, useContext, useState } from "react";

// Define the shape of the context
interface PDFDocumentContextType {
  fontFamily: string;
  fontSize: number;
  debug?: boolean;
}

// Create the context
const PDFDocumentContext = React.createContext<
  PDFDocumentContextType | undefined
>(undefined);

type PDFDocumentProviderProps = {
  children: ReactNode;
} & PDFDocumentContextType;

export const PDFDocumentProvider = ({
  children,
  fontFamily,
  fontSize,
  debug,
}: PDFDocumentProviderProps) => {
  return (
    <PDFDocumentContext.Provider value={{ fontFamily, fontSize, debug }}>
      {children}
    </PDFDocumentContext.Provider>
  );
};

export const usePDFDocument = (): PDFDocumentContextType => {
  const context = useContext(PDFDocumentContext);
  if (!context) {
    throw new Error("usePDFDocument must be used within a PDFDocumentProvider");
  }
  return context;
};
