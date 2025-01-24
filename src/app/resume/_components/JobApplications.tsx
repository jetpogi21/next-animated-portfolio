"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  useJobApplications,
  useCreateJobApplication,
} from "../_hooks/use-job-applications";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { JobApplicationForm } from "@/app/resume/_components/JobApplicationForm";

export const JobApplications = () => {
  const { data: jobApplications, isLoading } = useJobApplications();
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Job Applications</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="mr-2 w-4 h-4" /> Add Application
        </Button>
      </CardHeader>
      <CardContent>
        {isFormOpen && (
          <JobApplicationForm onClose={() => setIsFormOpen(false)} />
        )}
        {jobApplications?.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No job applications yet
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobApplications?.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{application.companyName}</h3>
                  <p className="text-muted-foreground">
                    {application.jobTitle}
                  </p>
                  <p className="text-sm">
                    Applied on:{" "}
                    {application.dateApplied &&
                      new Date(application.dateApplied).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Status: {application.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
