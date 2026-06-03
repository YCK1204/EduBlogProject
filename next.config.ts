import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// GitHub Pages 배포 시에만 basePath 적용
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // dev 모드에선 output: "export" 해제 → API Route 사용 가능
  ...(isDev ? {} : { output: "export" }),
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub Pages 전용 설정
  ...(isGitHubPages ? {
    basePath: "/EduBlogProject",
    assetPrefix: "/EduBlogProject/",
  } : {}),
};

export default nextConfig;
