import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";
import { EditableListItem } from "../common/EditableListItem";
import { AddListItem } from "../common/AddListItem";

type SummarySectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const SummarySection = ({ formik }: SummarySectionProps) => {
  const { values, setFieldValue } = formik;

  const handleEdit = (newValue: string, index: number) => {
    const newSummary = [...values.summary];
    newSummary[index] = newValue;
    setFieldValue("summary", newSummary);
  };

  const handleRemove = (index: number) => {
    const newSummary = values.summary.filter((_, i) => i !== index);
    setFieldValue("summary", newSummary);
  };

  const handleAdd = (value: string) => {
    setFieldValue("summary", [...values.summary, value]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {values.summary.map((item, index) => (
              <EditableListItem
                key={index}
                item={item}
                index={index}
                testIdPrefix="summary"
                dialogTitle="Edit Summary"
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <AddListItem
            testIdPrefix="summary"
            dialogTitle="Add Summary"
            buttonText="Add Summary"
            placeholder="Enter summary"
            onAdd={handleAdd}
          />
        </div>
      </CardContent>
    </Card>
  );
};
