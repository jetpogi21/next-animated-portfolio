"use client";

import { JobApplications } from "@/app/resume/_components/JobApplications";
import { MyDocument } from "@/app/resume/_components/MyDocument";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectResumeInfo } from "@/db/schema";
import { PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { ResumeJsonEditor } from "./ResumeJsonEditor";
import { Code2 } from "lucide-react";

export const ResumeTabs = ({
  effectiveResumeInfo,
}: {
  effectiveResumeInfo: SelectResumeInfo | undefined;
}) => {
  return (
    <Tabs
      defaultValue="resume"
      className="flex flex-col gap-4 w-full [&_div]:mt-0 overflow-hidden"
    >
      <TabsList className="justify-start w-min">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="job-applications">Job Applications</TabsTrigger>
        <TabsTrigger
          value="json-editor"
          data-testid="json-editor-tab"
        >
          <Code2 className="mr-2 w-4 h-4" />
          JSON Editor
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="resume"
        className="flex-1"
      >
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
      </TabsContent>
      <TabsContent
        value="job-applications"
        className="flex-1"
      >
        <JobApplications />
      </TabsContent>
      <TabsContent
        value="json-editor"
        className="flex-1"
      >
        <ResumeJsonEditor />
      </TabsContent>
    </Tabs>
  );
};
