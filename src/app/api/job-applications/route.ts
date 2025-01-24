import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allJobApplications = await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.dateApplied));

    return NextResponse.json(allJobApplications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { companyName, jobTitle, jobDescription, status, notes } =
      await request.json();

    const [newJobApplication] = await db
      .insert(jobApplications)
      .values({
        companyName,
        jobTitle,
        jobDescription,
        status,
        notes,
      })
      .returning();

    return NextResponse.json(newJobApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    return NextResponse.json(
      { error: "Failed to create job application" },
      { status: 500 }
    );
  }
}
