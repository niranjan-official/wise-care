"use client";
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";


const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userid, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    name: "vineeth Doe",
    age: 30,
    bloodGroup: "O+",
    height: "5'10\"",
    weight: "70 kg",
    bmi: "22.5",
    chronicDiseases: "None",
    allergies: "Peanuts, Dust",
  });
  // Sample data (you can replace this with actual data from props or state)
  const profileData = {
    name: "John Doe",
    age: 30,
    bloodGroup: "O+",
    height: "5'10\"",
    weight: "70 kg",
    bmi: "22.5",
    chronicDiseases: "None",
    allergies: "Peanuts, Dust",
  };
  //  setUserId(user.id)

  const changeInterval = async () => {
    console.log(data);
    try {
      // const response = fetch("/api/push-notification", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     type: "appointment",
      //     date: data.date,
      //     time: data.time,
      //   }),
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      const res = await fetch("/api/update-userData", {
        method: "POST",
        body: JSON.stringify({ user, ...data }),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json()
      if (result.success) {
        setInterval(newInterval);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Profile Information</h1>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Name:</span>
            <span className="text-gray-600">{profileData.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Age:</span>
            <span className="text-gray-600">{profileData.age}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Blood Group:</span>
            <span className="text-gray-600">{profileData.bloodGroup}</span>
            <button onClick={changeInterval}>vlick</button>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Height:</span>
            <span className="text-gray-600">{profileData.height}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Weight:</span>
            <span className="text-gray-600">{profileData.weight}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">BMI:</span>
            <span className="text-gray-600">{profileData.bmi}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700 font-medium">Chronic Diseases:</span>
            <span className="text-gray-600">{profileData.chronicDiseases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Allergies:</span>
            <span className="text-gray-600">{profileData.allergies}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
    