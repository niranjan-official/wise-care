"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdAddToPhotos } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const Appointment = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    doctorName: "",
    hospitalName: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      const res = await fetch("/api/add-appointment", {
        method: "POST",
        body: JSON.stringify({ userId, ...data }),
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
    <div
      className={`bg-primary-yellow flex h-36 w-full flex-col justify-between rounded-[0.7rem] bg-red-500 p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <div className="flex h-full flex-col justify-between">
              <MdAddToPhotos size={50} />
              <p className="mt-3 text-lg font-semibold text-white/80">
                Add Appointments
              </p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background" asChild>
            <div className="flex flex-col items-center justify-center text-black">
              <AlertDialogTitle>
                <p className="text-center text-2xl">Add New Appointment</p>
              </AlertDialogTitle>
              <form className="flex w-full flex-col gap-4">
                <label htmlFor="doctorName" className="flex flex-col gap-1">
                  Doctor name :
                  <input
                    type="text"
                    name="doctorName"
                    value={data.doctorName}
                    onChange={handleChange}
                    className="w-full rounded-[0.3rem] border border-black p-2"
                  />
                </label>
                <label htmlFor="hospitalName" className="flex flex-col gap-1">
                  Hospital name :
                  <input
                    type="text"
                    name="hospitalName"
                    value={data.hospitalName}
                    onChange={handleChange}
                    className="w-full rounded-[0.3rem] border border-black p-2"
                  />
                </label>
                <label htmlFor="date" className="flex items-center gap-3">
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black p-2 py-1"
                  />
                </label>
                <label htmlFor="time" className="flex items-center gap-3">
                  Time:
                  <input
                    type="time"
                    name="time"
                    value={data.time}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black p-2 py-1"
                  />
                </label>
              </form>
              <AlertDialogFooter>
                <button
                  disabled={load}
                  className="mt-2 w-full rounded-[0.4rem] border border-black p-2 text-black shadow"
                  onClick={() => {
                    setData({});
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

export default Appointment;
