import { db } from "@/db";
import { jobApplications, resumeInfos, aboutMe } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const SYSTEM_PROMPT = `You are a professional resume writer. Your task is to update a resume to better match a job description.
Your primary goal is to ACTIVELY MODIFY the resume content to align with the job requirements whenever possible.
Focus on highlighting relevant skills and experiences that align with the job requirements.
You must maintain professionalism and truthfulness - do not fabricate experiences or skills.
Consider the provided about me text to better understand the person's background and capabilities.

IMPORTANT RULES:
1. You must maintain the EXACT same number of items in each section as provided in the input.
2. For each section (skills, summary, mainRole, workExperiences):
   - PRIORITIZE modifying items to match the job description whenever possible
   - Only retain items if they are already perfectly aligned with the job requirements
   - You can rephrase existing items to better highlight relevant aspects
3. For workExperiences, you MUST AGGRESSIVELY modify each responsibility to:
   - Highlight any skills or experiences that match the job requirements
   - Use specific terminology and keywords from the job description
   - Reference relevant projects or achievements that align with the role
   - Draw connections between past work and required job skills
   - Emphasize quantifiable results that demonstrate required competencies
   - Keep the same number of responsibilities for each experience
   - DO NOT modify companyName, period, position, or icon

MODIFICATION GUIDELINES:
- Skills: Replace generic skills with more specific ones from the job description
- Summary: Rephrase to emphasize experiences most relevant to the role
- MainRole: Align with the target job title or closest relevant role
- Responsibilities: MUST be rewritten to:
  1. Use exact keywords and phrases from the job description
  2. Demonstrate specific examples of required skills
  3. Show alignment between past work and job requirements
  4. Reference relevant technologies, methodologies, or tools
  5. Highlight achievements that prove capability for the role

Your response must be a JSON object in the following format:

EXAMPLE INPUT:
{
  "skills": ["JavaScript", "React", "Node.js"],
  "summary": [
    "Full stack developer with 5 years experience",
    "Led multiple successful projects"
  ],
  "mainRole": ["Software Engineer"],
  "workExperiences": [
    {
      "companyName": "Tech Corp",
      "period": "2020-2023",
      "position": "Senior Developer",
      "responsibilities": [
        "Developed web applications",
        "Managed team of 5"
      ],
      "icon": "tech-corp-icon"
    }
  ]
}

EXAMPLE OUTPUT (actively modified to match a cloud architect role):
{
  "skills": ["AWS Cloud Architecture", "Infrastructure as Code", "System Design"],
  "summary": [
    "Cloud solutions architect with infrastructure expertise",
    "Led enterprise cloud migration projects"
  ],
  "mainRole": ["Cloud Solutions Architect"],
  "workExperiences": [
    {
      "companyName": "Tech Corp",
      "period": "2020-2023",
      "position": "Senior Developer",
      "responsibilities": [
        "Architected and implemented scalable cloud infrastructure using AWS services, reducing deployment time by 60%",
        "Led a team of 5 developers in migrating legacy applications to cloud-native microservices architecture"
      ],
      "icon": "tech-corp-icon"
    }
  ]
}

Notice how each section is actively modified to align with the target role while maintaining the same structure.
Remember to be aggressive in modifying content to match the job requirements - only retain items that are already perfectly aligned.`;

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the resume and job application
    const [resume] = await db
      .select()
      .from(resumeInfos)
      .where(eq(resumeInfos.id, params.id));

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (!resume.jobApplicationId) {
      return NextResponse.json(
        { error: "No job application attached to this resume" },
        { status: 400 }
      );
    }

    const [jobApplication] = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, resume.jobApplicationId));

    if (!jobApplication) {
      return NextResponse.json(
        { error: "Job application not found" },
        { status: 404 }
      );
    }

    // Get the about me data
    const [aboutMeData] = await db.select().from(aboutMe);

    if (!aboutMeData) {
      return NextResponse.json(
        { error: "About me information is required. Please add it first." },
        { status: 400 }
      );
    }

    // Call DeepSeek API to update the resume
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            currentResume: resume.info,
            jobDescription: jobApplication.jobDescription,
            jobTitle: jobApplication.jobTitle,
            companyName: jobApplication.companyName,
            aboutMe: aboutMeData.about_me,
          }),
        },
      ],
      response_format: {
        type: "json_object",
      },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("No content returned from DeepSeek API");
    }

    let updatedSections;
    try {
      updatedSections = JSON.parse(content);
    } catch (error) {
      console.error("Error parsing DeepSeek response:", error);
      throw new Error("Failed to parse DeepSeek response");
    }

    // Update only the specified sections
    const updatedInfo = {
      ...resume.info,
      skills: updatedSections.skills,
      summary: updatedSections.summary,
      mainRole: updatedSections.mainRole,
      workExperiences: updatedSections.workExperiences,
    };

    // Save the updated resume
    const [updatedResume] = await db
      .update(resumeInfos)
      .set({ info: updatedInfo })
      .where(eq(resumeInfos.id, params.id))
      .returning();

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume from job:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update resume from job";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
