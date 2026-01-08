"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/types/domain";
import { ArrowUpRight, Code2, Eye, Layout } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, featured: 0, views: 1250 });

  useEffect(() => {
    // Simulasi fetch ringan untuk stats
    fetch("/api/v1/projects").then(r => r.json()).then(d => {
      if(d.success) setStats(s => ({...s, total: d.data.length, featured: d.data.filter((p:Project) => p.is_featured).length }));
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-gray-50 p-3">
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="flex items-center font-medium text-green-600">
          <ArrowUpRight className="mr-1 h-4 w-4" />
          {trend}
        </span>
        <span className="ml-2 text-gray-400">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your portfolio performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Projects" value={stats.total} icon={Layout} trend="+12%" />
        <StatCard title="Featured Items" value={stats.featured} icon={Code2} trend="+2%" />
        <StatCard title="Total Views" value="24.5K" icon={Eye} trend="+18.2%" />
      </div>

      {/* Quick Actions / Recent (Placeholder for now) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New project added</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-blue-600 bg-blue-600 p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold">Manage Content</h3>
          <p className="mt-2 text-blue-100">Ready to update your portfolio? Add new projects or update existing ones.</p>
          <Link href="/admin/projects/new">
            <button className="mt-6 w-full rounded-lg bg-white px-4 py-2 font-semibold text-blue-600 shadow hover:bg-blue-50">
              Create New Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}