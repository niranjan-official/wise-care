import express from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/find-medicine", upload.single("file"), async (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log(req.file);
  
  try {
    // Call your external AI API here
    const response = await axios.post("https://c8xflwrd-5000.inc1.devtunnels.ms/process_image", {
      image: req.file.buffer.toString("base64"), // Convert the buffer to base64 string
    });
    
    return res.json({
      message: "Data sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error updating data:", error.message);
    return res.status(500).json({
      message: "Failed to update data",
      error: error.message,
    });
  }
});

app.listen(3001, () => console.log("app listening on port 3001!"));
