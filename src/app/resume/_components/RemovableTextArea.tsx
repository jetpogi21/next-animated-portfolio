"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { X } from "lucide-react";

type RemovableTextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRemove: () => void;
  name: string;
  testId: string;
};

export const RemovableTextArea = ({
  value,
  onChange,
  onRemove,
  name,
  testId,
}: RemovableTextAreaProps) => {
  return (
    <div className="relative group">
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        data-testid={testId}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 p-0 w-6 h-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        onClick={onRemove}
        data-testid={`${testId}-remove`}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
