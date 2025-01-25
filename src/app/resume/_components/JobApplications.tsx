"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  useJobApplications,
  useCreateJobApplication,
  useUpdateJobApplication,
  useDeleteJobApplication,
} from "../_hooks/use-job-applications";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { JobApplicationDialog } from "./JobApplicationDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export const JobApplications = () => {
  const { data: jobApplications, isLoading } = useJobApplications();
  const { mutate: createJobApplication, isPending: isCreating } =
    useCreateJobApplication();
  const { mutate: updateJobApplication, isPending: isUpdating } =
    useUpdateJobApplication();
  const { mutate: deleteJobApplication, isPending: isDeleting } =
    useDeleteJobApplication();

  if (isLoading) {
    return (
      <Card className="flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Job Applications</CardTitle>
        <JobApplicationDialog
          trigger={
            <Button
              variant="outline"
              size="sm"
              disabled={isCreating}
            >
              <Plus className="mr-2 w-4 h-4" /> Add Application
            </Button>
          }
          title="Add Job Application"
          onSubmit={createJobApplication}
        />
      </CardHeader>
      <CardContent>
        {jobApplications?.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No job applications yet
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobApplications?.map((application) => (
              <Card
                key={application.id}
                data-testid={`job-application-${application.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">
                        {application.companyName}
                      </h3>
                      <p className="text-muted-foreground">
                        {application.jobTitle}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <JobApplicationDialog
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            disabled={isUpdating}
                            data-testid={`edit-application-${application.id}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        }
                        title="Edit Job Application"
                        defaultValues={application}
                        onSubmit={(data) =>
                          updateJobApplication({ id: application.id, data })
                        }
                      />
                      <ConfirmDialog
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            disabled={isDeleting}
                            data-testid={`delete-application-${application.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        }
                        title="Delete Job Application"
                        description="Are you sure you want to delete this job application? This action cannot be undone."
                        onConfirm={() => deleteJobApplication(application.id)}
                        confirmText="Delete"
                      />
                    </div>
                  </div>
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
