import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const user = await User.findOne({
      email: reqBody.email,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token " }, { status: 400 });
    }

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({ message: "Check your email ", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
