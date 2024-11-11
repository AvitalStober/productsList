import connect from "@/app/lib/db/mongoDB";
import { Params } from "next/dist/server/request/params";
import Book from "@/app/lib/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connect();
    const { bookId } = await params;
    console.log(request.url);

    if (!bookId) {
      return NextResponse.json(
        {
          message: "Missing 'id' in request URL",
        },
        { status: 400 }
      );
    }
    
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return NextResponse.json(
        {
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Book deleted successfully",
      },
      { status: 200 }
    );
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
