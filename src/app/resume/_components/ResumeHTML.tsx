import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import Image from "next/image";

type ResumeHTMLProps = {};

export const ResumeHTML = ({}: ResumeHTMLProps) => {
  return (
    <PageTransitionContainer disableAnimation={true}>
      <div className="flex w-full min-h-full bg-white text-slate-950 p-4">
        {/* Side */}
        <div className="w-2/5 flex flex-col">
          {/* Image */}
          <div className="relative w-full h-[300px] lg:w-1/2 self-center">
            <Image
              className="object-contain"
              src="/resume photo.jpg"
              alt="hero"
              fill
            />
          </div>
          {/* Contact Bar */}
          <div>Contact Bar</div>
          {/* Summar of Qualifications */}
          <div>Summar of Qualifications</div>
          {/* Education */}
          <div>Education</div>
        </div>
        {/* Main */}
        <div className="w-3/5">
          {/* Name + Title */}
          <div>Name + Title</div>
          {/* Work Experience */}
          <div>Work Experience</div>
          {/* Responsibilities */}
          <div>Responsibilities</div>
          {/* Skills and Competencies */}
          <div>Skills and Competencies</div>
        </div>
      </div>
    </PageTransitionContainer>
  );
};
