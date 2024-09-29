"use client";
import Appointment from "@/components/Appointment";
import Medication from "@/components/Medication";
import UserProfileButton from "@/components/UserProfileButton";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  registerAndSubscribe,
} from "./Push";
import { LuBellOff } from "react-icons/lu";
import { FiBell } from "react-icons/fi";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  // const [subscription, setSubscription] = useState(null);
  // const [unsupported, setUnsupported] = useState(false);
  // console.log(user);

  // useEffect(() => {
  //   unsubscribeAndResubscribe()
  //   const isUnsupported = notificationUnsupported();
  //   setUnsupported(isUnsupported);

  //   if (!isUnsupported) {
  //     checkPermissionStateAndAct(setSubscription);
  //   }
  // }, []);

  // async function unsubscribeAndResubscribe() {
  //   // Check if service worker is ready
  //   const registration = await navigator.serviceWorker.ready;
  //   const subscription = await registration.pushManager.getSubscription();
  
  //   // If there's an existing subscription, unsubscribe
  //   if (subscription) {
  //     try {
  //       const isUnsubscribed = await subscription.unsubscribe();
  //       if (isUnsubscribed) {
  //         console.log('Successfully unsubscribed from the previous subscription.');
  //         // After unsubscribing, resubscribe with the new applicationServerKey
  //         await subscribe(setSubscription); // Call your subscribe function here
  //       } else {
  //         console.log('Failed to unsubscribe.');
  //       }
  //     } catch (error) {
  //       console.error('Error while unsubscribing:', error);
  //     }
  //   } else {
  //     // No subscription found, so just subscribe
  //     await subscribe(setSubscription); // Call your subscribe function here
  //   }
  // }

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-200">
      {/* <div className="flex w-full justify-between p-4 shadow">
        <h1 className="text-2xl font-bold">WiseCare</h1>
        <div className="flex items-center gap-4">
          <button
            disabled={unsupported}
            onClick={() => registerAndSubscribe(setSubscription)}
          >
            {unsupported ? <LuBellOff /> : !subscription && <FiBell size={25} />}
          </button>
            <UserProfileButton />
        </div>
      </div> */}
      <div className="flex w-full flex-col p-4">
        <div className="flex gap-4">
          {user && (
            <>
              <Appointment userId={user?.id} />
              <Medication userId={user?.id} />
            </>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Link
            href={"/profile"}
            className="w-full rounded-xl bg-white p-4 text-black shadow"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">View Profile</h2>
              <p className="text-sm text-neutral-500">
                View your medical profile
              </p>
            </div>
          </Link>
          <Link
            href={"/find-medicine"}
            className="w-full rounded-xl bg-white p-4 text-black shadow"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Find Medicine</h2>
              <p className="text-sm text-neutral-500">
                Get details of the medicine
              </p>
            </div>
          </Link>
          <Link
            href={"/predict"}
            className="w-full rounded-xl bg-white p-4 text-black shadow"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Predict Disease</h2>
              <p className="text-sm text-neutral-500">
                Predict a disease using symptoms
              </p>
            </div>
          </Link>
          {/* {subscription ? (
            <>
              <input
                placeholder={"Type push message ..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={() => sendWebPush(message)}>
                Test Web Push
              </button>
            </>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
