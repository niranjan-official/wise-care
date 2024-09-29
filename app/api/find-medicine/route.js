import { NextResponse } from "next/server";
import formidable from "formidable";
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export async function POST(req) {
  const form = formidable({ multiples: false });
  
  try {
    // Convert the Web API request body into a buffer
    const bodyBuffer = await streamToBuffer(req.body);
    
    // Parse the form data from the buffer
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(bodyBuffer, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    
    const file = files.file;

    // Do your processing, e.g., forward it to another API or save the file locally

    // Respond with a success message
    return NextResponse.json({ message: 'File uploaded successfully' });
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: 'Failed to upload file' }, { status: 500 });
  }
}
