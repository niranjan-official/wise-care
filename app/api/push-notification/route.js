import { sendWebPush } from "@/app/Push";
import { NextResponse } from "next/server";
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:mail@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY,
);

let subscription = null;

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const { date, time } = data;

    const targetDateTime = new Date(`${date}T${time}`);

    const now = new Date();

    const delay = targetDateTime.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        if(data.type === "appointment"){
            sendWebPush("You have an appointment today");
        }else if(data.type === "medication"){
            sendWebPush("Time to take your medication");
        }
      }, delay);

      return NextResponse.json({ message: "Notification scheduled successfully" });
    } else {
      return NextResponse.json(
        { message: "Scheduled time is in the past" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return NextResponse.json(
      { message: "Failed to schedule notification" },
      { status: 500 },
    );
  }
}
