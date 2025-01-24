"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useCreateJobApplication } from "../_hooks/use-job-applications";
import { useState } from "react";
import type { FormEvent } from "react";

export const JobApplicationForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    status: "Applied",
    notes: "",
  });

  const { mutate: createJobApplication, isPending } = useCreateJobApplication();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createJobApplication(formData);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Company Name</Label>
        <Input
          value={formData.companyName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              companyName: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Job Title</Label>
        <Input
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              jobTitle: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Job Description</Label>
        <Textarea
          value={formData.jobDescription}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              jobDescription: e.target.value,
            }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Input
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Application"}
        </Button>
      </div>
    </form>
  );
};
