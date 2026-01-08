"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Layers, 
  Users,
  BarChart3,
  Globe
} from "lucide-react";
import { logoutAdmin } from "@/utils/admin-client";

export const Sidebar = () => {
  const pathname = usePathname();

  const mainNav = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Content", href: "/admin/content", icon: Layers },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  const systemNav = [
    { label: "Team", href: "/admin/team", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link
        href={item.href}
        className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-gray-900 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-900"}`} />
        {item.label}
      </Link>
    );
  };

  return (
    <aside className="flex h-full flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <Globe className="h-5 w-5" />
          </div>
          <span>Nexus<span className="text-gray-400">Admin</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <nav className="space-y-6">
          <div>
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Dashboard
            </div>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              System
            </div>
            <div className="space-y-1">
              {systemNav.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logoutAdmin}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};