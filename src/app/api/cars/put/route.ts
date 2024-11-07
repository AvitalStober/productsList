import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connect();
    const { id, year, carModel, color } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Missing 'id' field",
        },
        { status: 400 }
      );
    }

    const updatedCar = await Car.findOneAndUpdate(
      { _id: id }, 
      { year, carModel, color }, 
      { new: true } 
    );

    if (!updatedCar) {
      return NextResponse.json(
        {
          message: "Car not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Car updated successfully",
      car: updatedCar,
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
