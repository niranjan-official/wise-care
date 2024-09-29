import { NextResponse } from "next/server";
import formidable from "formidable";
import { promisify } from "util";

// Configure formidable
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

// Promisify formidable's parse method
const parseForm = promisify(formidable({ multiples: false }).parse);

export async function POST(req) {
  try {
    const body = req.body
    const formData = await parseForm(req);

    // Access the uploaded file
    const file = formData.file; // Assuming you appended the file as 'file'

    // Log file details for debugging
    console.log('Uploaded file:', file);

    // Here, you can handle the uploaded file (e.g., save it to a directory, process it, etc.)

    return NextResponse.json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
}
