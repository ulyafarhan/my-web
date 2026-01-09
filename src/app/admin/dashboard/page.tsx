"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/utils/admin-client";
import { Eye, Layout, Star } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalProjects: 0, featuredProjects: 0, totalViews: 0 });

  useEffect(() => {
    adminFetch("/api/v1/admin/stats")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
      });
  }, []);

  const dataCards = [
    { title: "Total Proyek", val: stats.totalProjects, icon: Layout, color: "text-blue-500" },
    { title: "Proyek Unggulan", val: stats.featuredProjects, icon: Star, color: "text-yellow-500" },
    { title: "Total Kunjungan", val: stats.totalViews, icon: Eye, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {dataCards.map((card, i) => (
        <div key={i} className="p-6 bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark shadow-default">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold">{card.val}</h4>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
            <card.icon className={`h-8 w-8 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}