interface ThemedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
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

export default function ThemedImage({ src, alt, className, width, height }: ThemedImageProps) {
  const darkSrc = toDarkSrc(src);

  // 다크 변형이 없으면 단일 이미지로 렌더
  if (darkSrc === src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} width={width} height={height} />;
  }

  // 라이트/다크 두 이미지를 모두 렌더하고 CSS(`dark:`)로 전환한다.
  // 인라인 스크립트가 첫 페인트 전에 <html>.dark 를 적용하므로 깜빡임 없이 올바른 이미지가 보인다.
  const base = className ?? "";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`${base} dark:hidden`} width={width} height={height} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={darkSrc} alt={alt} className={`${base} hidden dark:block`} width={width} height={height} />
    </>
  );
}
