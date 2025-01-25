import { db } from "@/db";
import { resumeInfos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { info, title, jobApplicationId } = await request.json();

    const updateData = {
      ...(info && { info }),
      ...(title && { title }),
      jobApplicationId,
    };

    const [updatedResume] = await db
      .update(resumeInfos)
      .set(updateData)
      .where(eq(resumeInfos.id, params.id))
      .returning();

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(resumeInfos).where(eq(resumeInfos.id, params.id));
    return NextResponse.json(params.id);
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
