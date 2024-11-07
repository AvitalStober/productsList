
import connect from "@/app/lib/db/mongoDB";
import Cars from "@/app/lib/models/Car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Cars.find();
    return NextResponse.json({ message: "successfull", data });
  } catch (error) {
    throw new Error("Error" + error);
  }
}