// import connect from "@/app/lib/db/mongoDB";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/app/lib/models/User";

// export async function GET(request: NextRequest) {
//   try {
//     await connect();
//     const r =  await request.json();
//     console.log("r ",r);
//     const { userName, password } = r;
//     // const { userName, password } = await request.json();
//     const user = await User.findOne({ userName, password });

//     // בדיקה אם המשתמש נמצא במאגר
//     if (user) {
//       return NextResponse.json({ message: "User found", user });
//     } else {
//       return NextResponse.json({ message: "User not found" }, { status: 200 });
//     }
//   } catch (error) {
//     throw new Error("Error" + error);
//   }
// }



import connect from "@/app/lib/db/mongoDB";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await User.find();
    return NextResponse.json({ message: "successfull", data });
  } catch (error) {
    throw new Error("Error" + error);
  }
}