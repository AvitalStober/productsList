import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { year, carModel, color } = await request.json();
    const newCar = new Car({ year, carModel, color });
    await newCar.save();
    return NextResponse.json({
      message: "",
      Car: { year: year, carModel: carModel, color: color },
    });
  } catch (error) {
    throw new Error("Error " + error);
  }
}
