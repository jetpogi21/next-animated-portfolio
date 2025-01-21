"use client";

import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { Button } from "@/components/ui/Button";
import { Formik, Form } from "formik";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="flex absolute inset-0 flex-col">
      <ScrollArea className="flex-1">
        <div className="pr-4 pb-16">
          <Formik
            initialValues={resumeInfo}
            onSubmit={(values) => {
              onSave(values);
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-4">
                <PersonalInfoSection formik={formik} />
                <ContactInfoSection formik={formik} />
                <SummarySection formik={formik} />
                <EducationSection formik={formik} />
                <SkillsSection formik={formik} />
                <WorkExperienceSection formik={formik} />
              </Form>
            )}
          </Formik>
        </div>
      </ScrollArea>
      <Button
        type="submit"
        className="absolute right-0 bottom-0 left-0"
        data-testid="save-button"
      >
        Save Changes
      </Button>
    </div>
  );
};
