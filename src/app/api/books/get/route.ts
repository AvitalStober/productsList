
import connect from "@/app/lib/db/mongoDB";
import Books from "@/app/lib/models/Book";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Books.find();
    return NextResponse.json({ message: "successfull", data });
  } catch (error) {
    throw new Error("Error" + error);
  }
}