import { basicResumeInfo } from "@/app/resume/_lib/resume-info/basic-resume";
import { workflowAnalystResumeInfo } from "@/app/resume/_lib/resume-info/worflow-analyst";

export type ResumeInfo = {
  name: string;
  title: string;
  mainRole: string[];
  phoneNumber: string;
  emailAddress: string;
  location: string;
  website: string;
  freelancer: string;
  linkedin: string;
  summary: string[];
  education: {
    school: string;
    degree: string;
    year: string;
    summary: string[];
  };
  skills: string[];
  workExperiences: {
    companyName: string;
    period: string;
    position: string;
    responsibilities: string[];
    icon?: string;
  }[];
};

export const resumeInfos = {
  Basic: basicResumeInfo,
  "Workflow Analyst": workflowAnalystResumeInfo,
};
