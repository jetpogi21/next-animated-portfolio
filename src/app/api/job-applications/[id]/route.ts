import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { companyName, jobTitle, jobDescription, status, notes } =
      await request.json();

    const updateData = {
      ...(companyName && { companyName }),
      ...(jobTitle && { jobTitle }),
      ...(jobDescription && { jobDescription }),
      ...(status && { status }),
      ...(notes && { notes }),
    };

    const [updatedJobApplication] = await db
      .update(jobApplications)
      .set(updateData)
      .where(eq(jobApplications.id, params.id))
      .returning();

    return NextResponse.json(updatedJobApplication);
  } catch (error) {
    console.error("Error updating job application:", error);
    return NextResponse.json(
      { error: "Failed to update job application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(jobApplications).where(eq(jobApplications.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job application:", error);
    return NextResponse.json(
      { error: "Failed to delete job application" },
      { status: 500 }
    );
  }
}
