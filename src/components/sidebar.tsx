"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <span className="text-lg font-semibold">TicketMind</span>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col py-4 grow">
        <Link 
          href="/dashboard" 
          className={`px-6 py-3 text-sm font-medium ${
            pathname === "/dashboard"
              ? "bg-gray-100 text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
            Overview
        </Link>

        <Link 
          href="/dashboard/tickets" 
          className={`px-6 py-3 text-sm font-medium ${
            pathname === "/dashboard/tickets"
              ? "bg-gray-100 text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
            Tickets
        </Link>

        <Link 
          href="/dashboard/analytics" 
          className={`px-6 py-3 text-sm font-medium ${
            pathname === "/dashboard/analytics"
              ? "bg-gray-100 text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
            Analytics
        </Link>

        <Link 
          href="/dashboard/settings" 
          className={`px-6 py-3 text-sm font-medium ${
            pathname === "/dashboard/settings"
              ? "bg-gray-100 text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
            Settings
        </Link>
      </nav>
      
      {/* User section - pushed to bottom */}
      <div className="px-6 py-4 border-t border-gray-200">
        <UserButton />
      </div>
    </aside>
  );
}