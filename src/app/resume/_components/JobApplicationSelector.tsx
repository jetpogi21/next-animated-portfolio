"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useJobApplications } from "../_hooks/use-job-applications";
import { SelectJobApplication } from "@/db/schema";

type JobApplicationSelectorProps = {
  selectedJobApplicationId?: string | null;
  onSelect: (jobApplicationId: string | null) => void;
  className?: string;
};

export const JobApplicationSelector = ({
  selectedJobApplicationId,
  onSelect,
  className,
}: JobApplicationSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const { data: jobApplications, isLoading } = useJobApplications();

  const selectedApplication = jobApplications?.find(
    (app) => app.id === selectedJobApplicationId
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between w-full", className)}
          disabled={isLoading}
          data-testid="job-application-selector"
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {selectedApplication
              ? `${selectedApplication.companyName} - ${selectedApplication.jobTitle}`
              : "Select job application..."}
          </span>
          <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Search job applications..." />
          <CommandList>
            <CommandEmpty>No job applications found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onSelect(null);
                  setOpen(false);
                }}
                className="cursor-pointer"
                data-testid="clear-job-application"
              >
                <Check
                  className={cn(
                    "mr-2 w-4 h-4",
                    !selectedJobApplicationId ? "opacity-100" : "opacity-0"
                  )}
                />
                Clear selection
              </CommandItem>
              {jobApplications?.map((application) => (
                <CommandItem
                  key={application.id}
                  onSelect={() => {
                    onSelect(application.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                  data-testid={`job-application-option-${application.id}`}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedJobApplicationId === application.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {application.companyName} - {application.jobTitle}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
