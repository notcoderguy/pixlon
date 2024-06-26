"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()


  return (
    <div className="flex absolute w-full min-h-screen">
      <aside className="bg-gray-900 w-[300px] p-[20px] flex flex-col justify-between">
        <ul className="flex flex-col gap-5">
          <li className={clsx(`text-white font-black tracking-widest text-center hover:bg-gray-800 transition-all duration-200 flex rounded-xl`, pathname==='/editor/dashboard' ? 'bg-gray-800' : 'bg-transparent')}>
            <Link className="px-5 py-4" href="/editor/dashboard">Dashboard</Link>
          </li>
          <li className={clsx(`text-white font-black tracking-widest text-center hover:bg-gray-800 transition-all duration-200 rounded-xl flex`,  pathname==='/editor/dashboard/create-editor' ? 'bg-gray-800' : 'bg-transparent')}>
            <Link className="px-5 py-4" href="/editor/dashboard/create-editor">Create editor</Link>
          </li>
          <li className={clsx(`text-white font-black tracking-widest text-center hover:bg-gray-800 transition-all duration-200 rounded-xl flex`,  pathname==='/editor/dashboard/image-processing' ? 'bg-gray-800' : 'bg-transparent')}>
            <Link className="px-5 py-4" href="/editor/dashboard/image-processing">Images</Link>
          </li>
          <li className={clsx(`text-white font-black tracking-widest text-center hover:bg-gray-800 transition-all duration-200 rounded-xl flex`,  pathname==='/editor/dashboard/settings' ? 'bg-gray-800' : 'bg-transparent')}>
            <Link className="px-5 py-4" href="/editor/dashboard/settings">Settings</Link>
          </li>
        </ul>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className={clsx(`text-white font-black tracking-widest text-center hover:bg-gray-800 transition-all duration-200 w-full flex justify-center rounded-xl`,  pathname==='/editor/dashboard/profile' ? 'bg-gray-800' : 'bg-transparent')}>
            <Link className="px-5 py-4" href="/editor/dashboard/profile">Profile</Link>
          </div>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-md w-full"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-[20px]">{children}</main>
    </div>
  );
};

export default layout;
