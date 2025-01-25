import { db } from "@/db";
import { resumeInfos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allResumes = await db
      .select()
      .from(resumeInfos)
      .orderBy(desc(resumeInfos.id));

    return NextResponse.json(allResumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { info, title, jobApplicationId } = await request.json();

    const [newResume] = await db
      .insert(resumeInfos)
      .values({
        info,
        title,
        jobApplicationId,
      })
      .returning();

    return NextResponse.json(newResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}
