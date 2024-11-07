import connect from "@/app/lib/db/mongoDB";
import { Params } from "next/dist/server/request/params";
import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connect();
    const { carId } = await params;

    if (!carId) {
      return NextResponse.json(
        {
          message: "Missing 'id' in request URL",
        },
        { status: 400 }
      );
    }

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return NextResponse.json(
        {
          message: "Car not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Car deleted successfully",
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