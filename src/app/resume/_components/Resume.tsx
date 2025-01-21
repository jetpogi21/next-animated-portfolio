"use client";
import { PDFViewer } from "@/app/resume/_components/PDFViewer";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { useResumes, useUpdateResume } from "../_hooks/use-resume";
import { Loader2 } from "lucide-react";
import { useResumeStore } from "../_store/resume-store";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { useFormik } from "formik";
import { ResumeInfo } from "../_lib/resume-info";

const emptyResumeInfo: ResumeInfo = {
  name: "",
  title: "",
  mainRole: [],
  phoneNumber: "",
  emailAddress: "",
  location: "",
  website: "",
  freelancer: "",
  linkedin: "",
  summary: [],
  education: {
    school: "",
    degree: "",
    year: "",
    summary: [],
  },
  skills: [],
  workExperiences: [],
};

export const Resume = () => {
  const { data: resumeInfos, isLoading } = useResumes();
  const { selectedResumeId } = useResumeStore();
  const updateResumeMutation = useUpdateResume();

  const selectedResume = resumeInfos?.find((r) => r.id === selectedResumeId);

  const formik = useFormik<ResumeInfo>({
    initialValues: selectedResume?.info || emptyResumeInfo,
    onSubmit: async (values) => {
      if (!selectedResumeId) return;
      await updateResumeMutation.mutateAsync({
        id: selectedResumeId,
        data: { info: values },
      });
    },
    enableReinitialize: true,
  });

  const handleResumeNameChange = async (title: string) => {
    if (!selectedResumeId) return;
    await updateResumeMutation.mutateAsync({
      id: selectedResumeId,
      data: {
        info: formik.values,
        title,
      },
    });
  };

  if (isLoading) {
    return (
      <PageTransitionContainer>
        <div className="flex justify-center items-center w-full h-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </PageTransitionContainer>
    );
  }

  return (
    <PageTransitionContainer disableAnimation={false}>
      {/* Main container */}
      <div className="flex gap-2 justify-center p-2 pb-8 w-full h-full scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin">
        <PDFViewer />
      </div>
    </PageTransitionContainer>
  );
};
