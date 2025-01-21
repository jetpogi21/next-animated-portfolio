import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { FormikProps, FieldArray } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";
import { EditableListItem } from "../common/EditableListItem";
import { AddListItem } from "../common/AddListItem";
import { Plus } from "lucide-react";

type WorkExperienceSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const WorkExperienceSection = ({
  formik,
}: WorkExperienceSectionProps) => {
  const { values, handleChange, setFieldValue } = formik;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldArray
          name="workExperiences"
          render={(arrayHelpers) => (
            <div className="space-y-4">
              {values.workExperiences.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`workExperiences.${index}.companyName`}>
                        Company Name
                      </Label>
                      <Input
                        name={`workExperiences.${index}.companyName`}
                        value={exp.companyName}
                        onChange={handleChange}
                        data-testid={`company-name-input-${index}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`workExperiences.${index}.period`}>
                        Period
                      </Label>
                      <Input
                        name={`workExperiences.${index}.period`}
                        value={exp.period}
                        onChange={handleChange}
                        data-testid={`period-input-${index}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`workExperiences.${index}.position`}>
                        Position
                      </Label>
                      <Input
                        name={`workExperiences.${index}.position`}
                        value={exp.position}
                        onChange={handleChange}
                        data-testid={`position-input-${index}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Responsibilities</Label>
                      <FieldArray
                        name={`workExperiences.${index}.responsibilities`}
                        render={(respHelpers) => (
                          <div className="space-y-2">
                            {exp.responsibilities.map((resp, respIndex) => (
                              <EditableListItem
                                key={respIndex}
                                item={resp}
                                index={respIndex}
                                testIdPrefix={`responsibility-${index}`}
                                dialogTitle="Edit Responsibility"
                                onEdit={(newValue, respIdx) => {
                                  const newResponsibilities = [
                                    ...exp.responsibilities,
                                  ];
                                  newResponsibilities[respIdx] = newValue;
                                  setFieldValue(
                                    `workExperiences.${index}.responsibilities`,
                                    newResponsibilities
                                  );
                                }}
                                onRemove={(respIdx) =>
                                  respHelpers.remove(respIdx)
                                }
                              />
                            ))}
                            <AddListItem
                              testIdPrefix={`responsibility-${index}`}
                              dialogTitle="Add Responsibility"
                              buttonText="Add Responsibility"
                              placeholder="Enter responsibility"
                              onAdd={(value) => respHelpers.push(value)}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => arrayHelpers.remove(index)}
                      data-testid={`remove-experience-button-${index}`}
                    >
                      Remove Experience
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  arrayHelpers.push({
                    companyName: "",
                    period: "",
                    position: "",
                    responsibilities: [],
                  })
                }
                data-testid="add-experience-button"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Work Experience
              </Button>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
