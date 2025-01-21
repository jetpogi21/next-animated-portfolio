import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";
import { EditableListItem } from "../common/EditableListItem";
import { AddListItem } from "../common/AddListItem";

type SkillsSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const SkillsSection = ({ formik }: SkillsSectionProps) => {
  const { values, setFieldValue } = formik;

  const handleEdit = (newValue: string, index: number) => {
    const newSkills = [...values.skills];
    newSkills[index] = newValue;
    setFieldValue("skills", newSkills);
  };

  const handleRemove = (index: number) => {
    const newSkills = values.skills.filter((_, i) => i !== index);
    setFieldValue("skills", newSkills);
  };

  const handleAdd = (value: string) => {
    setFieldValue("skills", [...values.skills, value]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {values.skills.map((skill, index) => (
              <EditableListItem
                key={index}
                item={skill}
                index={index}
                testIdPrefix="skill"
                dialogTitle="Edit Skill"
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <AddListItem
            testIdPrefix="skill"
            dialogTitle="Add Skill"
            buttonText="Add Skill"
            placeholder="Enter skill"
            onAdd={handleAdd}
          />
        </div>
      </CardContent>
    </Card>
  );
};
