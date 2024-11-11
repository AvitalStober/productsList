import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import User from "@/app/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    await connect();
    console.log("in post", req);

    // Parse the request body
    const { myId, password, userName, email } = await req.json();

    console.log("id", myId);

    // Check if the user already exists
    const existingUser = await User.findOne({ myId });
    if (existingUser) {
      return NextResponse.json({
        exists: true,
        message: "User already exists",
        status: 200,
      });
    }

    // Create a new user if not existing
    const newUser = new User({ myId, userName, email, password });
    await newUser.save();

    // Return success response
    return NextResponse.json({
      exists: false,
      message: "User registered successfully",
      user: { myId, userName, email },
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error registering user: " + error },
      { status: 500 }
    );
  }
}
