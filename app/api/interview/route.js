import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = auth();
    console.log("Authenticated userId:", userId);

    let email = "anonymous";

    if (userId) {
      try {
        const user = await clerkClient.users.getUser(userId);
        console.log("Fetched user from Clerk:", user);

        const primaryEmail = user.emailAddresses?.find(
          (e) => e.id === user.primaryEmailAddressId
        );
        console.log("Primary email object:", primaryEmail);

        if (primaryEmail?.emailAddress) {
          email = primaryEmail.emailAddress;
        }
      } catch (e) {
        console.warn("⚠️ Failed to fetch user from Clerk:", e.message);
      }
    }

    console.log("Final email to be saved:", email);

    const body = await request.json();
    console.log("Incoming request body:", body);

    const { position, description, experience, questions } = body;

    if (!position || !description || !experience || !questions?.length) {
      console.error("❌ Missing required fields.");
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const newRecord = {
      jobPosition: position,
      jobDesc: description,
      jobExperience: experience.toString(),
      jsonMocResp: JSON.stringify(questions),
      createdBy: email,
      createdAt: new Date().toISOString(),
      mockId: uuidv4(),
    };

    console.log("Prepared record for insertion:", newRecord);

    const inserted = await db.insert(MockInterview).values(newRecord).returning();

    console.log("✅ Inserted Record:", inserted[0]);

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (error) {
    console.error("🔥 API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
