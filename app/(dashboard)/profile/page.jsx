"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, setData] = useState(null); // State to hold fetched data
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({}); // State for form inputs

  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn && user) {
        try {
          const res = await fetch("/api/get-userData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),
          });
          const result = await res.json();
          if (res.ok) {
            setData(result.userData);
            setFormData({
              height: result.userData.height,
              weight: result.userData.weight,
            }); // Initialize form data
          } else {
            console.error("Error fetching user data:", result.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchUserData();
  }, [isSignedIn, user]);

  const changeInterval = async () => {
    try {
      const res = await fetch("/api/update-userData", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, ...formData }), // Send updated data
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.message === "Data updated successfully") {
        setIsOpen(false); // Close dialog
        setData((prev) => ({ ...prev, ...formData })); // Update local data
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Calculate BMI if height and weight are present
      if (updatedFormData.height && updatedFormData.weight) {
        updatedFormData.bmi = calculateBMI(
          updatedFormData.height,
          updatedFormData.weight,
        );
      } else {
        updatedFormData.bmi = ""; // Reset BMI if height or weight is missing
      }

      return updatedFormData;
    });
  };

  const calculateBMI = (weight, height) => {
    if (height > 3) {
      height = height / 100; // Convert cm to meters
    }
    return (weight / (height * height)).toFixed(2); // Return BMI rounded to 2 decimal places
  };

  if (!data) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-row items-center justify-center gap-7">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Profile Information
          </h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="rounded bg-blue-500 px-4 py-2 text-white">
                Edit
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Height and Weight</DialogTitle>
                <DialogDescription>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      changeInterval();
                    }}
                  >
                    <div>
                      <label>
                        Height (m):
                        <input
                          type="number"
                          name="height"
                          value={formData.height || ""}
                          onChange={handleInputChange}
                          className="w-full rounded border p-1"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Weight (kg):
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight || ""}
                          onChange={handleInputChange}
                          className="w-full rounded border p-1"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Chronic Dieases:
                        <input
                          type="text"
                          name="chronicDieases"
                          value={formData.chronicDieases || ""}
                          onChange={handleInputChange}
                          className="w-full rounded border p-1"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        BMI:
                        <input
                          type="text"
                          name="bmi"
                          value={calculateBMI(formData.height, formData.weight)}
                          onChange={handleInputChange}
                          className="w-full rounded border p-1"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Allergies:
                        <input
                          type="text"
                          name="allergies"
                          value={formData.allergies || ""}
                          onChange={handleInputChange}
                          className="w-full rounded border p-1"
                        />
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                      Update
                    </button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-600">{user.username}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Age:</span>
            <span className="text-gray-600">{data.age}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Blood Group:</span>
            <span className="text-gray-600">{data.bloodGroup}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Height:</span>
            <span className="text-gray-600">{data.height}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Weight:</span>
            <span className="text-gray-600">{data.weight}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">BMI:</span>
            <span className="text-gray-600">
              {calculateBMI(data.weight, data.height)}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Chronic Diseases:</span>
            <span className="text-gray-600">{data.chronicDiseases}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Allergies:</span>
            <span className="text-gray-600">{data.allergies}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
