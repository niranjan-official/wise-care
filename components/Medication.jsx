"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdAddToPhotos } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Medication = ({userId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [times, setTimes] = useState([""]); 
  const [data, setData] = useState({
    medicineName: "",
    duration: "1day",
    times: [],
  });

  const changeInterval = async () => {
    setLoad(true);
    
    // First, update the `data` state with the current `times`
    setData((prevData) => ({
      ...prevData,
      times, // Update the times array
    }));

    // Since setData is async, we can handle form submission after updating the state
    // Perform any other logic needed for submission here
    console.log({
      ...data,
      times, // This will ensure that times is properly logged after setting it in state
    });
    try {
      const res = await fetch('/api/add-medication', {
        method: "POST",
        body: JSON.stringify({userId, ...data, times}
        ),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if (result.success) {
        setInterval(newInterval);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
    setIsOpen(false);
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...times];
    updatedTimes[index] = value;
    setTimes(updatedTimes);
  };

  const addTimeField = () => {
    setTimes([...times, ""]);
  };

  const removeTimeField = (index) => {
    const updatedTimes = times.filter((_, i) => i !== index);
    setTimes(updatedTimes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleClick = async() =>{
  //   try {
  //     const res = await axios.get('/get-data');
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

  return (
    <div
      className={`bg-primary-yellow flex h-36 w-full flex-col justify-between rounded-[0.7rem] bg-green-500 p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <div className="flex h-full flex-col justify-between">
              <MdAddToPhotos size={50} />
              <p className="mt-3 text-xl font-semibold text-white/80">
                Add Medication
              </p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background" asChild>
            <div className="flex flex-col items-center justify-center text-black">
              <AlertDialogTitle>
                <p className="text-center text-2xl">Add Medication</p>
              </AlertDialogTitle>
              <form className="flex w-full flex-col gap-4">
                <label htmlFor="medicineName" className="flex flex-col gap-1">
                  Medicine Name:
                  <input
                    type="text"
                    id="medicineName"
                    name="medicineName"
                    value={data.medicineName}
                    onChange={handleInputChange}
                    className="w-full rounded-[0.3rem] border border-black p-2"
                  />
                </label>

                <label htmlFor="duration" className="flex flex-col gap-1">
                  Duration:
                  <select
                    id="duration"
                    name="duration"
                    value={data.duration}
                    onChange={handleInputChange}
                    className="w-full rounded-[0.3rem] border border-black p-2"
                  >
                    <option value="1day">1 day</option>
                    <option value="2day">2 days</option>
                    <option value="7day">7 days</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 select-none">
                  Times:
                  {times.map((time, index) => (
                    <div key={index} className="flex items-center gap-2 relative">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          handleTimeChange(index, e.target.value)
                        }
                        className="w-full rounded-[0.3rem] border border-black p-2"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 absolute -right-8"
                          onClick={() => removeTimeField(index)}
                        >
                          <IoClose size={25} />
                        </button>
                      )}
                    </div>
                  ))}
                </label>

                <button
                  type="button"
                  className="flex w-fit items-center gap-2 text-blue-500"
                  onClick={addTimeField}
                >
                  <FaPlus /> Add Time
                </button>
              </form>

              <AlertDialogFooter>
                <button
                  disabled={load}
                  className="mt-2 w-full rounded-[0.4rem] border border-black p-2 text-black shadow"
                  onClick={() => {
                    setData({})
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={load}
                  className="w-full rounded-[0.4rem] bg-red-500 p-2 text-white shadow hover:bg-red-600"
                  onClick={changeInterval}
                >
                  {load ? (
                    <AiOutlineLoading
                      size={20}
                      className="animate-spin text-white/80"
                    />
                  ) : (
                    "Confirm"
                  )}
                </button>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Medication;
