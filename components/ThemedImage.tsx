"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemedImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * 테마에 따라 SVG 다이어그램을 자동 교체한다.
 * 라이트 테마: 원본 `*.svg` (밝은 배경)
 * 다크 테마 : `*-dark.svg` (어두운 배경) — scripts/gen-dark-svgs.py 로 생성
 *
 * `.svg` 가 아니거나 이미 다크 변형이면 그대로 둔다.
 */
export function toDarkSrc(src: string): string {
  if (!src.endsWith(".svg") || src.endsWith("-dark.svg")) return src;
  return src.replace(/\.svg$/, "-dark.svg");
}

export default function ThemedImage({ src, alt, className }: ThemedImageProps) {
  const { theme } = useTheme();
  const resolved = theme === "dark" ? toDarkSrc(src) : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={alt} className={className} />
  );
}
