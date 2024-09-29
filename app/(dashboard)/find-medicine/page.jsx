"use client";
import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import axios from "axios";

const Page = () => {
  const [fileData, setFileData] = useState(null);
  const [load, setLoad] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileData(file);
    }
  };

  const handleClick = async () => {
    setLoad(true);
    if (!fileData) return;

    try {
      const formData = new FormData();
      formData.append("image", fileData); // Use "image" as the key

      const response = await axios.post("http://localhost:3001/api/find-medicine", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoad(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-200 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <p className="text-center text-xl font-semibold text-gray-700">
          Upload the information side of the medicine or tablet
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-6 w-full cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-500 focus:outline-none"
        />
        {fileData && (
          <div className="mt-4">
            <p className="text-sm text-green-600">
              File uploaded: {fileData.name}
            </p>
          </div>
        )}
        <button
          onClick={handleClick}
          disabled={!fileData || load}
          className="mt-4 w-full flex justify-center items-center rounded-[0.6rem] bg-blue-500 p-2 px-4 font-semibold text-white shadow disabled:opacity-80"
        >
          {load ? (
            <VscLoading size={20} className="animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default Page;
