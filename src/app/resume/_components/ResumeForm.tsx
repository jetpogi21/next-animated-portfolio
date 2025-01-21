"use client";

import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { Formik, Form } from "formik";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { WorkExperienceSection } from "./sections/WorkExperienceSection";

type ResumeFormProps = {
  resumeInfo: ResumeInfo;
  onSave: (updatedInfo: ResumeInfo) => void;
  isLoading?: boolean;
};

export const ResumeForm = ({
  resumeInfo,
  onSave,
  isLoading,
}: ResumeFormProps) => {
  return (
    <Formik
      initialValues={resumeInfo}
      onSubmit={(values) => {
        onSave(values);
      }}
      enableReinitialize
    >
      {(formik) => (
        <Form
          id="resume-form"
          className="space-y-4"
        >
          <PersonalInfoSection formik={formik} />
          <ContactInfoSection formik={formik} />
          <SummarySection formik={formik} />
          <EducationSection formik={formik} />
          <SkillsSection formik={formik} />
          <WorkExperienceSection formik={formik} />
        </Form>
      )}
    </Formik>
  );
};
