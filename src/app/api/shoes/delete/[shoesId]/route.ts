import connect from "@/app/lib/db/mongoDB";
import Shoes from "@/app/lib/models/Shoes";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // התחברות ל-DB אם נדרש
    await connect();
    const { shoesId } = await params;

    if (!shoesId) {
      return NextResponse.json(
        {
          message: "Missing 'id' in request URL",
        },
        { status: 400 }
      );
    }
    console.log("shoesId",shoesId);
    
    const deletedShoes = await Shoes.findByIdAndDelete(shoesId);
    if (!deletedShoes) {
      return NextResponse.json(
        {
          message: "Shoes not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Shoes deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // טיפול בשגיאות
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
