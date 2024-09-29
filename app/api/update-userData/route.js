import { hashPassword, comparePassword } from "@/app/Functions";
import { db } from "@/firebase";
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const hashedId = await hashPassword(data.user.id);
    console.log("Hashed ID:", hashedId);

    // Fetch all documents from userData collection
    const userCollection = collection(db, "userData");
    const querySnapshot = await getDocs(userCollection);

    let userExists = false;
    let existingDocId = null;

    // Check if any document's userId matches the hashed ID
    querySnapshot.forEach(doc => {
      const userData = doc.data();
      // Compare the hashed IDs directly
      console.log(data.user.id);
      
      if (comparePassword(data.user.id, userData.userId)) {
        userExists = true;
        existingDocId = doc.id;
        console.log(userExists);
        console.log(existingDocId);
      }
    });

    if (userExists) {
      // User already exists, update the document
      const docRef = doc(db, "userData", existingDocId);
      
      await updateDoc(docRef, {
        userId: hashedId,
        age: data.age,
        allergies: data.allergies,
        bloodGroup: data.bloodGroup,
        bmi: data.bmi,
        chronicDiseases: data.chronicDiseases,
        height: data.height,
        weight: data.weight,
      });

      return NextResponse.json({ message: "Data updated successfully" });
    } else {
      // User doesn't exist, create a new document
      const docRef = await addDoc(collection(db, "userData"), {
        userId: hashedId,
        age: data?.age,
        allergies: data?.allergies,
        bloodGroup: data?.bloodGroup,
        bmi: data?.bmi,
        chronicDiseases: data?.chronicDiseases,
        height: data?.height,
        weight: data?.weight,
      });

      return NextResponse.json({ message: "Document created successfully", docId: docRef.id });
    }
  } catch (error) {
    console.error("Error updating or creating data:", error);
    return NextResponse.json(
      { message: "Failed to update or create data" },
      { status: 500 },
    );
  }
}
