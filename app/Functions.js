import bcrypt from "bcrypt";
import { Client } from "@gradio/client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const saltRounds = 10;

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

export async function dietPlan() {
  const data = await getData();
  const csvString = arrayToCSV(data);
  const client = await Client.connect(
    "sharmapacific/AI-Powered-Virtual-Health-Assistant",
  );
  const result = await client.predict("/predict_2", {
    report_text: csvString,
  });
  return result;
}

const getData = async () => {
  try {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "userData"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      array.push({ id: doc.id, ...doc.data() });
    });
    return array;
  } catch (error) {
    console.log(error);
    return null;;
  }
};

function arrayToCSV(array) {

  if (!array.length) return '';
  const headers = Object.keys(array[0]);

  const csvRows = [
    headers.join(','), // Header row
    ...array.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(',')) // Data rows
  ];

  return csvRows.join('\n');
}

export const cleanDietPlan = (inputArray) => {
  return inputArray
    .join(' ') // Combine array elements into a single string
    .replace(/\*\*/g, '') // Remove bold markers (**) 
    .replace(/\\n/g, '\n') // Replace newline characters with actual newlines
    .replace(/`/g, ''); // Remove backticks
};
