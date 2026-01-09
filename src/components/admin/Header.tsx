"use client";

import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { Menu, Search, Bell, User } from "lucide-react";

export const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        
        {/* Hamburger Toggle Button */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link className="block flex-shrink-0 lg:hidden" href="/">
             {/* Icon Logo Mobile */}
             <div className="h-8 w-8 rounded bg-blue-600"></div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block">
          <form action="#" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </form>
        </div>

        {/* User Area */}
        <div className="flex items-center gap-3 2xl:gap-7">
          <ul className="flex items-center gap-2 2xl:gap-4">
            {/* Notification Bell */}
            <li className="relative">
              <Link
                href="#"
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray-100 hover:text-blue-600 dark:border-strokedark dark:bg-meta-4 dark:text-white"
              >
                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                </span>
                <Bell className="h-5 w-5" />
              </Link>
            </li>
          </ul>

          {/* User Profile */}
          <div className="relative flex items-center gap-4">
             <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">Admin User</span>
                <span className="block text-xs text-gray-500">Super Admin</span>
             </span>
             <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                <User className="h-full w-full p-2 text-gray-600" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};