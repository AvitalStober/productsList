
import connect from "@/app/lib/db/mongoDB";
import Shoes from "@/app/lib/models/Shoes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Shoes.find();
    return NextResponse.json({ message: "successfull", data });
  } catch (error) {
    // throw new Error("Error" + error);
    return NextResponse.json("error in get route" + error)
  }
}