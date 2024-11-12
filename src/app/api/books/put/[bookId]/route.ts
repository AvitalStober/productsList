import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connect();
    const { bookId } = await params;
    console.log("shoesId", bookId);

    const { title, author } = await request.json();
    console.log("title, author", title, author);

    if (!bookId) {
      return NextResponse.json(
        {
          message: "Missing 'id' field",
        },
        { status: 400 }
      );
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { title, author },
      { new: true }
    );

    console.log("updatedBook", updatedBook);

    if (!updatedBook) {
      return NextResponse.json(
        {
          message: "Book not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Book updated successfully",
      book: updatedBook,
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
