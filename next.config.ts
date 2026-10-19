import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // /privacy/ и /privacy работают одинаково (ссылки в форме и согласии ведут на /privacy/)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Стили — прямо в HTML: на медленной сети (VPN) экономит один запрос до первого показа страницы
  experimental: { inlineCss: true },
};

export default nextConfig;
