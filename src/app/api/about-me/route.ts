import { db } from "@/db";
import { aboutMe } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [aboutMeData] = await db.select().from(aboutMe);
    return NextResponse.json(aboutMeData);
  } catch (error) {
    console.error("Error fetching about me:", error);
    return NextResponse.json(
      { error: "Failed to fetch about me" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const { about_me } = await request.json();

    // Check if record exists
    const [existingRecord] = await db.select().from(aboutMe);

    if (existingRecord) {
      // Update existing record
      const [updatedAboutMe] = await db
        .update(aboutMe)
        .set({ about_me })
        .returning();
      return NextResponse.json(updatedAboutMe);
    }

    // Insert new record
    const [newAboutMe] = await db
      .insert(aboutMe)
      .values({ about_me })
      .returning();

    return NextResponse.json(newAboutMe);
  } catch (error) {
    console.error("Error updating about me:", error);
    return NextResponse.json(
      { error: "Failed to update about me" },
      { status: 500 }
    );
  }
}
