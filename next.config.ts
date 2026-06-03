import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // dev 모드에선 output: "export" 해제 → API Route 사용 가능
  ...(isDev ? {} : { output: "export" }),
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
