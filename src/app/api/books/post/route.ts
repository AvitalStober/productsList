import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { title, author } = await request.json();
    const newBook = new Book({ title, author });
    await newBook.save();
    return NextResponse.json({
      message: "",
      Book: { title: title, author: author },
    });
  } catch (error) {
    throw new Error("Error " + error);
  }
}
