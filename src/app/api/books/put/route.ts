import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connect();
    const { id, title, author } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Missing 'id' field",
        },
        { status: 400 }
      );
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: id }, 
      { title, author }, 
      { new: true } 
    );

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
