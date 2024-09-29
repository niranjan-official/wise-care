'use client'
import React, { useState } from 'react';

const Page = () => {
  const [fileData, setFileData] = useState(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileData(file);
    }
  };

  // Handle submit
  const handleClick = async () => {
    if (!fileData) return;

    const formData = new FormData();
    formData.append('file', fileData);

    try {
      const res = await fetch("/api/find-medicine", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log('File uploaded successfully:', data);
      } else {
        console.error('File upload failed:', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='flex flex-col w-full items-center min-h-screen bg-slate-200 p-6'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
        <p className='text-xl font-semibold text-center text-gray-700'>
          Upload the information side of the medicine or tablet
        </p>
        <input
          type="file"
          accept='image/*'
          onChange={handleFileChange}
          className='mt-6 w-full px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-md border border-gray-300 cursor-pointer focus:outline-none'
        />
        {fileData && (
          <div className='mt-4'>
            <p className='text-sm text-green-600'>
              File uploaded: {fileData.name}
            </p>
          </div>
        )}
        <button
          onClick={handleClick}
          disabled={!fileData}
          className='p-2 px-4 font-semibold bg-blue-500 text-white w-full rounded-[0.6rem] shadow mt-4 disabled:opacity-80'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
