"use client";

import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { Button } from "@/components/ui/Button";
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
};

export const ResumeForm = ({ resumeInfo, onSave }: ResumeFormProps) => {
  return (
    <div className="flex relative flex-col h-full">
      <Formik
        initialValues={resumeInfo}
        onSubmit={(values) => {
          onSave(values);
        }}
        enableReinitialize
      >
        {(formik) => (
          <Form className="flex flex-col h-full">
            <div className="flex-1 pb-16 space-y-4">
              <PersonalInfoSection formik={formik} />
              <ContactInfoSection formik={formik} />
              <SummarySection formik={formik} />
              <EducationSection formik={formik} />
              <SkillsSection formik={formik} />
              <WorkExperienceSection formik={formik} />
            </div>
            <Button
              type="submit"
              className="sticky bottom-0 mt-4 w-full"
              data-testid="save-button"
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
