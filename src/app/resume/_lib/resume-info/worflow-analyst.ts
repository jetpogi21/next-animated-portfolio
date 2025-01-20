import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export const workflowAnalystResumeInfo: ResumeInfo = {
  name: "Jonathan Pradas",
  title: "CPA",
  mainRole: ["accountant", "solutions expert"],
  phoneNumber: "0929 893 5715",
  emailAddress: "jet_pradas@yahoo.com",
  location: "Valenzuela, Philippines",
  website: "https://jet-dev-puce.vercel.app",
  freelancer: "https://www.freelancer.com/u/jonathanpradas",
  linkedin: "https://linkedin.com/in/jet-dev/",
  summary: [
    "Comprehensive experience spanning over 10 years in payroll, inventory and sales-related functions.",
    "Proficient in maintaining accurate records, task prioritization, scheduling, and managing business process flows within accounting systems.",
    "Detail-oriented and quick to learn, adept at troubleshooting complex business process errors.",
    "Self-taught programmer with a strong capability for system enhancements and driving digitalization initiatives.",
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
    "Proficiency in Programming (VBA, Python, HTML, CSS, Javascript)",
    "Proficiency in Microsoft Office (MS Excel, MS Access)",
    "Experience with Spreadsheets and Databases",
    "Excellent Attention to Detail",
    "Continuous Improvement Mindset",
    "Ability to Work Under Pressure",
    "Strong Analytical Skills",
    "Problem-Solving and Result-Oriented Mindset",
  ],

  workExperiences: [
    {
      companyName: "Freelancer.ph",
      period: "May 2016 - Present",
      position: "Freelance Full-stack Developer",
      responsibilities: [
        "Developed and maintained responsive web applications, ensuring a seamless user experience across various platforms.",
        "Designed and implemented efficient database solutions, leading to improved data management and accessibility.",
        "Worked closely with clients to understand their financial management needs and challenges, resulting in tailored solutions that meet client expectations.",
        "Optimized operations processes by developing custom solutions using MS Office Applications with VBA, enhancing efficiency and improving reporting accuracy.",
        "Provided ongoing support and maintenance for existing web applications and programs, ensuring consistent functionality and user satisfaction.",
      ],
      icon: "/freelancer-icon.png",
    },
    {
      companyName: "Vibram Manufacturing Corporation",
      period: "May 2014 - Present",
      position: "Accounting Officer",
      responsibilities: [
        "Optimized accounting and business operations by designing, developing, and implementing robust programs and processes.",
        "Fostered cross-functional collaboration to understand business requirements and translated them into functional programs.",
        "Identified areas for improvement, automation, and optimization in existing systems and processes, and implemented necessary changes.",
        "Managed the recording of Sales and Payment transactions to the accounting systems, generating periodic reports (Accounts Receivable, Aging Reports, Collections Summary) for upper management.",
        "Developed a program using MS Access, still in use to date.",
        "Handled the recording of Payroll transactions, including hours worked, overtime and night differential pay, and employee deductions for each payroll period using a self-developed MS Access program.",
        "Ensured compliance with government regulations by timely filing and payment of taxes.",
        "Conducted periodic inventory audits to ensure recorded data matches physical count.",
      ],
    },
  ],
};
