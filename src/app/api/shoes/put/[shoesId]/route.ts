import connect from "@/app/lib/db/mongoDB";
import Shoes from "@/app/lib/models/Shoes";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connect();
    const { shoesId } = await params;
    console.log("shoesId",shoesId);

    const { type, size, color } = await request.json();
    console.log("type, size, color",type, size, color);

    if (!shoesId) {
      return NextResponse.json(
        {
          message: "Missing 'id' field",
        },
        { status: 400 }
      );
    }

    const updatedShoes = await Shoes.findOneAndUpdate(
      { _id: shoesId },
      { type, size, color },
      { new: true }
    );

    console.log("updatedShoes", updatedShoes);
    

    if (!updatedShoes) {
      return NextResponse.json(
        {
          message: "Shoes not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Shoes updated successfully",
      shoes: updatedShoes,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Error: " + error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
