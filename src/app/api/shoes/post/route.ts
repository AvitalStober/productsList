import connect from "@/app/lib/db/mongoDB";
import Shoes from "@/app/lib/models/Shoes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { type, size, color } = await request.json();
    const newShoes = new Shoes({ type, size, color });
    await newShoes.save();
    console.log(newShoes);
    
    return NextResponse.json({
      message: "",
      Shoes:newShoes,
    });
  } catch (error) {
    throw new Error("Error " + error);
  }
}
