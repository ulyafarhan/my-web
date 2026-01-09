import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Wajib true jika output: export
  },
};

export default nextConfig;