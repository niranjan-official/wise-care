'use client';
import React from "react";
import { IoGridOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { BsBell } from "react-icons/bs";

const Tab = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-evenly border-t bg-white p-4 text-zinc-800">
      <Link href={"/"}>
        <GoHome className={`${path === '/' && 'text-red-500'}`} size={25} />
      </Link>

      <Link href={"/find-medicine"}>
        <IoGridOutline className={`${path === '/find-medicine' && 'text-red-500'}`} size={20} />
      </Link>
      <Link href={"/notifications"}>
        <BsBell className={`${path === '/notifications' && 'text-red-500'}`} size={20} />
      </Link>
      <Link href={"/profile"}>
        <FaRegUser className={`${path === '/profile' && 'text-red-500'}`} size={20} />
      </Link>
    </div>
  );
};

export default Tab;