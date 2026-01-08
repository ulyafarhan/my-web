"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, LogOut, FileText, Settings } from "lucide-react";
import { logoutAdmin } from "@/utils/admin-client";

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/dashboard", icon: FolderKanban }, // Sementara link ke dashboard dulu
    { label: "Content", href: "#", icon: FileText },
    { label: "Settings", href: "#", icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white pb-10 pt-6">
      <div className="px-6 mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="font-bold text-white">P</span>
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Portfolio<span className="text-blue-600">.</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Platform
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-gray-50 text-blue-600 ring-1 ring-gray-950/5"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"}`} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Account
        </div>
        <button
          onClick={logoutAdmin}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5 text-red-500 group-hover:text-red-600" />
          Sign Out
        </button>
      </nav>
    </aside>
  );
};