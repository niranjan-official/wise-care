import { hashPassword } from "@/app/Functions";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const hashedId = await hashPassword(data.userId);
    const docRef = await addDoc(collection(db, "appointments"), {
      userId: hashedId,
      doctorName: data.doctorName,
      hospitalName: data.hospitalName,
      date: data.date,
      time: data.time,
    });

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Failed to update data" },
      { status: 500 },
    );
  }
}
