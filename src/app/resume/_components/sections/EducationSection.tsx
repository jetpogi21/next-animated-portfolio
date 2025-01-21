import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";
import { EditableListItem } from "../common/EditableListItem";
import { AddListItem } from "../common/AddListItem";

type EducationSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const EducationSection = ({ formik }: EducationSectionProps) => {
  const { values, handleChange, setFieldValue } = formik;

  const handleEdit = (newValue: string, index: number) => {
    const newSummary = [...values.education.summary];
    newSummary[index] = newValue;
    setFieldValue("education.summary", newSummary);
  };

  const handleRemove = (index: number) => {
    const newSummary = values.education.summary.filter((_, i) => i !== index);
    setFieldValue("education.summary", newSummary);
  };

  const handleAdd = (value: string) => {
    setFieldValue("education.summary", [...values.education.summary, value]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="education.school">School</Label>
          <Input
            id="education.school"
            name="education.school"
            value={values.education.school}
            onChange={handleChange}
            data-testid="school-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education.degree">Degree</Label>
          <Input
            id="education.degree"
            name="education.degree"
            value={values.education.degree}
            onChange={handleChange}
            data-testid="degree-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education.year">Year</Label>
          <Input
            id="education.year"
            name="education.year"
            value={values.education.year}
            onChange={handleChange}
            data-testid="year-input"
          />
        </div>
        <div className="space-y-4">
          <Label>Education Summary</Label>
          <div className="grid grid-cols-1 gap-4">
            {values.education.summary.map((item, index) => (
              <EditableListItem
                key={index}
                item={item}
                index={index}
                testIdPrefix="education-summary"
                dialogTitle="Edit Education Summary"
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <AddListItem
            testIdPrefix="education-summary"
            dialogTitle="Add Education Summary"
            buttonText="Add Education Summary"
            placeholder="Enter education summary"
            onAdd={handleAdd}
          />
        </div>
      </CardContent>
    </Card>
  );
};
