import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { resumeInfo } from "../_lib/resume-info";

export const ResumeHTML = () => {
  const r = resumeInfo;
  return (
    <PageTransitionContainer disableAnimation={false}>
      <div
        className="max-w-4xl mx-auto my-8 shadow-lg"
        style={{ backgroundColor: "var(--color-body-bg)", fontFamily: "var(--font-karla)" }}
      >
        {/* Header */}
        <div
          className="px-10 py-8"
          style={{ backgroundColor: "var(--color-hero-bg)" }}
        >
          <h1
            className="text-4xl font-black tracking-tight mb-1"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text-on-dark)" }}
          >
            {r.name}
          </h1>
          <p
            className="text-sm tracking-[3px] uppercase mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            {r.title} · Full-Stack Developer
          </p>
          <div
            className="flex flex-wrap gap-4 text-xs"
            style={{ color: "var(--color-text-on-dark-muted)" }}
          >
            <span>{r.phoneNumber}</span>
            <span>{r.emailAddress}</span>
            <span>{r.location}</span>
            <span>{r.website}</span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div
            className="w-2/5 px-8 py-8 border-r"
            style={{
              borderColor: "var(--color-border-light)",
              backgroundColor: "var(--color-body-bg-alt)",
            }}
          >
            {/* Education */}
            <section className="mb-8">
              <h2
                className="text-xs tracking-[3px] uppercase font-semibold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                Education
              </h2>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--color-text-primary)" }}
              >
                {r.education.school}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {r.education.degree}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {r.education.year} · Magna Cum Laude
              </p>
            </section>

            {/* Summary */}
            <section className="mb-8">
              <h2
                className="text-xs tracking-[3px] uppercase font-semibold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                Summary
              </h2>
              <ul className="space-y-2">
                {r.summary.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs leading-relaxed flex gap-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <span style={{ color: "var(--color-accent)" }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section>
              <h2
                className="text-xs tracking-[3px] uppercase font-semibold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                Skills
              </h2>
              <div className="flex flex-col gap-2">
                {r.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs border"
                    style={{
                      borderColor: "var(--color-accent)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Main */}
          <div className="w-3/5 px-8 py-8">
            <section>
              <h2
                className="text-xs tracking-[3px] uppercase font-semibold mb-6"
                style={{ color: "var(--color-accent)" }}
              >
                Experience
              </h2>
              {r.workExperiences.map((job, i) => (
                <div
                  key={i}
                  className="mb-8 pl-4 border-l-2"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <p
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {job.companyName}
                  </p>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {job.position}
                  </p>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {job.period}
                  </p>
                  <ul className="space-y-1">
                    {job.responsibilities.map((resp, j) => (
                      <li
                        key={j}
                        className="text-xs leading-relaxed flex gap-2"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <span style={{ color: "var(--color-accent)" }}>·</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </PageTransitionContainer>
  );
};
