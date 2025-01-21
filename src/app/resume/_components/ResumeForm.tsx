"use client";

import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Formik, Form, FieldArray } from "formik";
import { PillInput } from "./PillInput";
import { RemovableTextArea } from "./RemovableTextArea";
import { ScrollArea } from "@/components/ui/scroll-area";

type ResumeFormProps = {
  resumeInfo: ResumeInfo;
  onSave: (updatedInfo: ResumeInfo) => void;
};

export const ResumeForm = ({ resumeInfo, onSave }: ResumeFormProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <Formik
        initialValues={resumeInfo}
        onSubmit={(values) => {
          onSave(values);
        }}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="space-y-4">
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

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    data-testid="phone-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleChange}
                    data-testid="email-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    data-testid="location-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    data-testid="website-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={values.linkedin}
                    onChange={handleChange}
                    data-testid="linkedin-input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldArray
                  name="summary"
                  render={(arrayHelpers) => (
                    <div className="space-y-2">
                      {values.summary.map((item, index) => (
                        <RemovableTextArea
                          key={index}
                          name={`summary.${index}`}
                          value={item}
                          onChange={handleChange}
                          onRemove={() => arrayHelpers.remove(index)}
                          testId={`summary-input-${index}`}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => arrayHelpers.push("")}
                        data-testid="add-summary-button"
                      >
                        Add Summary
                      </Button>
                    </div>
                  )}
                />
              </CardContent>
            </Card>

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
                <PillInput
                  label="Education Summary"
                  values={values.education.summary}
                  onChange={(newValues) =>
                    setFieldValue("education.summary", newValues)
                  }
                  testIdPrefix="education-summary"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <PillInput
                  label="Skills"
                  values={values.skills}
                  onChange={(newValues) => setFieldValue("skills", newValues)}
                  testIdPrefix="skill"
                />
              </CardContent>
            </Card>

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
                              <Label
                                htmlFor={`workExperiences.${index}.companyName`}
                              >
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
                              <Label
                                htmlFor={`workExperiences.${index}.period`}
                              >
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
                              <Label
                                htmlFor={`workExperiences.${index}.position`}
                              >
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
                                    {exp.responsibilities.map(
                                      (resp, respIndex) => (
                                        <RemovableTextArea
                                          key={respIndex}
                                          name={`workExperiences.${index}.responsibilities.${respIndex}`}
                                          value={resp}
                                          onChange={handleChange}
                                          onRemove={() =>
                                            respHelpers.remove(respIndex)
                                          }
                                          testId={`responsibility-input-${index}-${respIndex}`}
                                        />
                                      )
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => respHelpers.push("")}
                                      data-testid={`add-responsibility-button-${index}`}
                                    >
                                      Add Responsibility
                                    </Button>
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
                        Add Work Experience
                      </Button>
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              data-testid="save-button"
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </ScrollArea>
  );
};
