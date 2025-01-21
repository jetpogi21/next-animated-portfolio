import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FormikProps } from "formik";
import { ResumeInfo } from "../../_lib/resume-info";

type ContactInfoSectionProps = {
  formik: FormikProps<ResumeInfo>;
};

export const ContactInfoSection = ({ formik }: ContactInfoSectionProps) => {
  const { values, handleChange } = formik;

  return (
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
  );
};
