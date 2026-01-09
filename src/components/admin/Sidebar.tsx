"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  User, 
  LogOut, 
  Globe, 
  ChevronLeft,
  PieChart
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const menuGroups = [
    {
      name: "MENU UTAMA",
      menuItems: [
        { icon: LayoutDashboard, label: "Dashboard", route: "/admin/dashboard" },
        { icon: FolderKanban, label: "Proyek", route: "/admin/projects" },
        { icon: PieChart, label: "Analitik", route: "/admin/analytics" },
      ],
    },
    {
      name: "PENGATURAN",
      menuItems: [
        { icon: User, label: "Profil Team", route: "/admin/team" },
        { icon: Settings, label: "Settings", route: "/admin/settings" },
      ],
    },
  ];

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Globe className="h-8 w-8 text-blue-500" />
          <span>Nexus<span className="text-blue-500">Admin</span></span>
        </Link>

        <button
          onClick={() => setSidebarOpen(false)}
          className="block lg:hidden text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
                {group.name}
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {group.menuItems.map((menuItem, menuIndex) => {
                  const isActive = pathname === menuItem.route || pathname.startsWith(`${menuItem.route}/`);
                  return (
                    <li key={menuIndex}>
                      <Link
                        href={menuItem.route}
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-800 ${
                          isActive ? "bg-gray-800 text-white" : "text-gray-400"
                        }`}
                      >
                        <menuItem.icon className="h-5 w-5" />
                        {menuItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      
      {/* Footer Sidebar (Logout) */}
      <div className="mt-auto p-4 border-t border-gray-800">
         <button className="flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-red-500 duration-300 ease-in-out hover:bg-gray-800">
            <LogOut className="h-5 w-5" />
            Keluar
         </button>
      </div>
    </aside>
  );
};