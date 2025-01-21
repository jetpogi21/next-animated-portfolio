"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PillInput } from "../PillInput";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";
import { useResumeStore } from "../../_store/resume-store";

type PersonalInfoSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const PersonalInfoSection = ({ formik }: PersonalInfoSectionProps) => {
  const { values, handleChange, setFieldValue } = formik;
  const { selectedResumeInfo, updateResumeInfo } = useResumeStore();

  const handleResumeNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedResumeInfo) return;

    const updatedInfo = {
      ...values,
      resumeTitle: e.target.value, // This won't be used in the ResumeInfo type but helps track the value
    };
    await updateResumeInfo(updatedInfo);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resume-title">Resume Name</Label>
          <Input
            id="resume-title"
            name="resume-title"
            value={selectedResumeInfo?.title || ""}
            onChange={handleResumeNameChange}
            data-testid="resume-title-input"
            placeholder="Enter resume name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            data-testid="name-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            data-testid="title-input"
            placeholder="e.g. Software Engineer, Attorney, Doctor"
          />
        </div>
        <PillInput
          label="Main Roles"
          values={values.mainRole}
          onChange={(newValues) => setFieldValue("mainRole", newValues)}
          testIdPrefix="main-role"
        />
      </CardContent>
    </Card>
  );
};
