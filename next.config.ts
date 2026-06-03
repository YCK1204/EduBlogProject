import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // dev 모드에선 output: "export" 해제 → API Route 사용 가능
  ...(isDev ? {} : { output: "export" }),
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub Pages 배포용 설정
  basePath: process.env.GITHUB_ACTIONS ? "/EduBlogProject" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/EduBlogProject/" : "",
};

export default nextConfig;
