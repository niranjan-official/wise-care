import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const getNotifications = async () => {

  const appointmentsPromise = getDocs(collection(db, "appointments"));
  const medicationsPromise = getDocs(collection(db, "medications"));
 
  const [appointmentsSnapshot, medicationsSnapshot] = await Promise.all([
    appointmentsPromise,
    medicationsPromise,
  ]);

  const appointments = appointmentsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const medications = medicationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    appointments,
    medications,
  };
};

const Page = async () => {
  const { appointments, medications } = await getNotifications();

  return (
    <div className="flex w-full flex-col min-h-screen pb-20 bg-slate-200 p-4">
      <h2 className="text-2xl font-bold">Appointments</h2>
      <ul className="mt-2 flex flex-col gap-4">
        {appointments.map(appointment => (
          <div key={appointment.id} className="w-full flex flex-col p-3 rounded-xl bg-white shadow">
          <h3 className="text-xl font-semibold capitalize">
            {appointment.doctorName}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-lg uppercase font-medium">{appointment.hospitalName}</p>
            <p className="p-1 rounded-[0.4rem] bg-black/10 px-3 text-sm">{appointment.date}</p>
            <p className="p-1 rounded-[0.4rem] bg-black/10 px-3 text-sm">{appointment.time}</p>
          </div>
          </div>
        ))}
      </ul>
      
      <h2 className="text-2xl font-bold mt-5">Medications</h2>
      <ul className="mt-2 flex flex-col gap-4">
      {medications.map(medication => (
          <div key={medication.id} className="w-full flex flex-col p-3 rounded-xl bg-white shadow">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold capitalize">{medication.medicineName}</span>
            <span>- {medication.duration}</span>
          </div>
          <div className="flex gap-3 flex-wrap items-center mt-2">
            {
              medication.times.map(time=>(
                <p className="p-1 rounded-[0.4rem] bg-black/10 px-3 text-sm">{time}</p>
              ))
            }
          </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Page;
