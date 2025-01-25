"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { SelectJobApplication } from "@/db/schema";
import type { FormEvent } from "react";

type JobApplicationDialogProps = {
  trigger?: React.ReactNode;
  defaultValues?: SelectJobApplication;
  onSubmit: (data: {
    companyName: string;
    jobTitle: string;
    jobDescription?: string;
    status?: string;
    notes?: string;
  }) => void;
  title: string;
};

export const JobApplicationDialog = ({
  trigger,
  defaultValues,
  onSubmit,
  title,
}: JobApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: defaultValues?.companyName || "",
    jobTitle: defaultValues?.jobTitle || "",
    jobDescription: defaultValues?.jobDescription || "",
    status: defaultValues?.status || "Applied",
    notes: defaultValues?.notes || "",
  });

  // Reset form data when dialog is closed or defaultValues change
  useEffect(() => {
    setFormData({
      companyName: defaultValues?.companyName || "",
      jobTitle: defaultValues?.jobTitle || "",
      jobDescription: defaultValues?.jobDescription || "",
      status: defaultValues?.status || "Applied",
      notes: defaultValues?.notes || "",
    });
  }, [defaultValues, open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-testid="job-application-form"
        >
          <div className="grid overflow-y-hidden grid-cols-2 gap-6 p-2">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  required
                  data-testid="company-name-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      jobTitle: e.target.value,
                    }))
                  }
                  required
                  data-testid="job-title-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  data-testid="status-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="h-[120px]"
                  data-testid="notes-input"
                />
              </div>
            </div>

            {/* Right Column - Job Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    jobDescription: e.target.value,
                  }))
                }
                data-testid="job-description-input"
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="submit-button"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
