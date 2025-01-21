"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { X } from "lucide-react";
import { useState } from "react";

type PillInputProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  testIdPrefix: string;
};

export const PillInput = ({
  label,
  values,
  onChange,
  testIdPrefix,
}: PillInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex gap-1 items-center px-3 py-1 rounded-full bg-primary/10 text-primary"
            data-testid={`${testIdPrefix}-pill-${index}`}
          >
            <span className="text-sm">{value}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="p-0 w-4 h-4 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleRemove(index)}
              data-testid={`${testIdPrefix}-remove-${index}`}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add ${label.toLowerCase()}`}
          data-testid={`${testIdPrefix}-input`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          data-testid={`${testIdPrefix}-add`}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
