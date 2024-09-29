import { comparePassword,hashPassword } from "@/app/Functions";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    // Fetch all documents from userData collection
    const userCollection = collection(db, "userData");
    const querySnapshot = await getDocs(userCollection);

    let userDataFound = null;

    // Use for...of to await inside the loop
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      console.log("Stored userId:", userData.userId);
      const hashedId = await hashPassword(data.userId);
      console.log("Hashed ID:", hashedId);
  
      // Compare the provided user ID against the stored hashed user ID
      const isMatch = await comparePassword(data.userId, userData.userId);
      if (isMatch) {
        userDataFound = {
          id: doc.id,
          ...userData, // Spread the user data
        };
        console.log("User data found:", userDataFound);
        break; // Exit the loop if a match is found
      }
    }

    if (userDataFound) {
      return NextResponse.json({ message: "User data retrieved successfully", userData: userDataFound });
    } else {
      
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { message: "Failed to retrieve user data" },
      { status: 500 },
    );
  }
}
