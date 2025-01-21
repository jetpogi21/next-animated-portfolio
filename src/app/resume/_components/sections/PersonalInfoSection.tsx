import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PillInput } from "../PillInput";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";

type PersonalInfoSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const PersonalInfoSection = ({ formik }: PersonalInfoSectionProps) => {
  const { values, handleChange, setFieldValue } = formik;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            data-testid="name-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            data-testid="title-input"
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
