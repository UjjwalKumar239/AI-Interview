import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 

// GET /api/interview/[interviewId]
export async function GET(req, { params }) {
  try {
    const interviewId = params.interviewId;

    if (!interviewId) {
      return NextResponse.json(
        { error: "Missing interview ID." },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { error: "Interview not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("❌ GET /interview/:id failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
