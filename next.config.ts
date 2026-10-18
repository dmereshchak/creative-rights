import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // /privacy/ и /privacy работают одинаково (ссылки в форме и согласии ведут на /privacy/)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
