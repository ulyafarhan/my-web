"use client";

import dynamic from "next/dynamic";
import { ArrowUp, DollarSign, Eye, ShoppingCart, Users } from "lucide-react";

// Chart harus di-import secara dynamic agar tidak error saat build (SSR issue)
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardPage = () => {
  // Config Chart
  const chartOptions: any = {
    chart: { type: "area", height: 350, toolbar: { show: false } },
    colors: ["#3C50E0", "#80CAEE"],
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] },
    grid: { show: true, borderColor: "#E2E8F0" },
  };

  const chartSeries = [
    { name: "Total Views", data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51] },
    { name: "Total Revenue", data: [10, 15, 20, 25, 20, 25, 30, 25, 30, 25, 30, 35] },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Kartu Statistik Atas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {[
            { title: "Total Views", val: "3.456K", icon: Eye, color: "text-blue-500" },
            { title: "Total Profit", val: "$45,2K", icon: DollarSign, color: "text-green-500" },
            { title: "New Product", val: "2,450", icon: ShoppingCart, color: "text-orange-500" },
            { title: "Total Users", val: "3.456", icon: Users, color: "text-purple-500" },
        ].map((item, i) => (
            <div key={i} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-gray-100 dark:bg-meta-4">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">{item.val}</h4>
                        <span className="text-sm font-medium text-gray-500">{item.title}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                        0.43% <ArrowUp className="h-3 w-3" />
                    </span>
                </div>
            </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                <h4 className="text-xl font-bold text-black dark:text-white">Analitik Kunjungan</h4>
            </div>
        </div>
        <div className="-ml-5">
            <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;