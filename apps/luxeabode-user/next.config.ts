import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev({ persist: { path: "../../.wrangler/state/v3" } });

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@repo/ui",
    "@repo/helpers",
    "@repo/services",
    "@repo/db",
    "@repo/auth",
  ],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "4000",
    //     pathname: "/api/r2-dev/**",
    //   },
    // ],
  },
};

export default nextConfig;
