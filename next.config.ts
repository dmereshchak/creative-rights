import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/creative-rights",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
