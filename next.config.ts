import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Wajib true jika output: export
  },
  // Tambahkan ini jika build sering hang/stuck
  eslint: {
    // Warning: Ini akan mengabaikan error eslint saat build agar build tetap jalan
    ignoreDuringBuilds: true, 
  },
  typescript: {
    // Warning: Ini akan mengabaikan error type saat build
    ignoreBuildErrors: true, 
  }
};

export default nextConfig;