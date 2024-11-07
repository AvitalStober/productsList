import connect from "@/app/lib/db/mongoDB";
// import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request:NextRequest) {
  try {
    // התחברות ל-DB אם נדרש
    await connect();
console.log(request.url);

    // קבלת הפרמטרים מ-URL
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("id"); // מקבל את ה-id מהפרמטרים

    if (!carId) {
      return NextResponse.json(
        {
          message: "Missing 'id' in request URL",
        },
        { status: 400 }
      );
    }

    // כאן תוכל לבצע את המחיקה בפועל, לדוגמה:
    // const deletedCar = await Car.findByIdAndDelete(carId);

    // במידה והפריט לא נמצא
    // if (!deletedCar) {
    //   return NextResponse.json(
    //     {
    //       message: "Car not found",
    //     },
    //     { status: 404 }
    //   );
    // }

    // אם הכל עבר בהצלחה
    return NextResponse.json(
      {
        message: "Car deleted successfully",
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
