import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export const basicResumeInfo: ResumeInfo = {
  name: "Jonathan Pradas",
  title: "CPA",
  mainRole: [
    "software developer",
    "full-stack developer",
    "programming specialist",
  ],
  phoneNumber: "+639760064276",
  emailAddress: "jet_pradas@yahoo.com",
  location: "Valenzuela, Philippines",
  website: "https://jet-dev-puce.vercel.app",
  freelancer: "https://www.freelancer.com/u/jonathanpradas",
  linkedin: "https://linkedin.com/in/jet-dev/",
  summary: [
    "Specializes in full-stack web development with a strong foundation in both front-end and back-end technologies.",
    "Proven track record of delivering scalable and maintainable web applications using modern tech stacks.",
    "Passionate about leveraging programming skills to create intuitive and efficient software solutions.",
    "Certified Public Accountant with a keen interest in applying financial knowledge to software development projects.",
  ],
  education: {
    school: "University of the East - Caloocan",
    degree: "Bachelor of Science - Major in Accountancy",
    year: "May 2014",
    summary: [
      "Certified Public Accountant",
      "Passed the Philippine CPA Board Exam, Oct 2014 with GPA of 87%",
      "Consistent Dean's Lister and University Scholar",
      "Magna Cum Laude",
    ],
  },
  skills: [
    "Proficiency in Programming (JavaScript, Python, HTML, CSS, SQL)",
    "Full Stack Development (MEAN/MERN stack, Django)",
    "Database Management (MySQL, PostgreSQL, MongoDB)",
    "Version Control/Git",
    "API Integration and Development",
    "Web Security Best Practices",
    "Testing and Debugging Techniques",
    "Continuous Integration/Continuous Deployment (CI/CD)",
  ],

  workExperiences: [
    {
      companyName: "Freelancer.ph",
      period: "May 2016 - Present",
      position: "Freelance Full-stack Developer",
      responsibilities: [
        "Developed and maintained responsive web applications using JavaScript, HTML, and CSS, ensuring a seamless user experience across various platforms.",
        "Designed and implemented efficient MySQL and PostgreSQL database solutions, leading to improved data management and accessibility.",
        "Collaborated effectively with clients to understand their financial management needs and challenges, resulting in tailored services that meet client expectations.",
        "Streamlined operations processes by developing custom solutions using MS Access, MS Excel, and VBA, enhancing efficiency and improving reporting accuracy.",
        "Provided ongoing support and maintenance for existing web applications and programs, ensuring consistent functionality and user satisfaction.",
      ],
      icon: "/freelancer-icon.png",
    },
    {
      companyName: "Vibram Manufacturing Corporation",
      period: "May 2014 - Present",
      position: "Accounting Officer",
      responsibilities: [
        "Streamlined accounting operations by designing, developing, and implementing robust programs and processes.",
        "Fostered cross-functional collaboration to understand business requirements and translated them into functional programs.",
        "Identified areas for improvement, automation, and optimization in existing systems and implemented necessary changes.",
        "Customized and configured accounting software to align with organizational workflows and reporting requirements.",
        "Managed the recording of Sales and Payment transactions to the accounting systems, generating periodic reports (Accounts Receivable, Aging Reports, Collections Summary) for upper management.",
        "Developed a program using MS Access, still in use to date.",
        "Handled the recording of Payroll transactions, including hours worked, overtime and night differential pay, and employee deductions for each payroll period using a self-developed MS Access program.",
        "Ensured compliance with government regulations by timely filing and payment of taxes.",
        "Conducted periodic inventory audits to ensure recorded data matches physical count.",
      ],
    },
  ],
};
