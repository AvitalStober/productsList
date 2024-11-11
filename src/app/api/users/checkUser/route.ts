import { NextRequest, NextResponse } from "next/server"; // Use NextRequest and NextResponse
import connect from "@/app/lib/db/mongoDB";
import User from "@/app/lib/models/User";

// Handle POST request (named export)
export async function GET(req: NextRequest) {
  try {
    await connect();

    const myId = req.nextUrl.searchParams.get("myId");
    const password = req.nextUrl.searchParams.get("password");

    console.log("password", password);
    const user = await User.findOne({ myId, password });

    if (user) {
      return NextResponse.json({
        exists: true,
        message: "User exists",
        user,
      });
    } else {
      return NextResponse.json({
        exists: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error checking user: " + error,
    });
  }
}
