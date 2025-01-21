import { NextResponse } from "next/server";
import { db } from "@/db";
import { resumeInfos } from "@/db/schema";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { info, title } = body;

    // Validate required fields
    if (!info || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert new resume
    const [newResume] = await db
      .insert(resumeInfos)
      .values({
        title,
        info: info as ResumeInfo,
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
