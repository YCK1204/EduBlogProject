#!/usr/bin/env python3
"""라이트 테마 SVG -> 다크 테마 SVG 생성.

문맥 인식 색상 매핑:
  - 텍스트(text/tspan)의 fill  : INK 맵   (어두운 글자 -> 밝은 글자)
  - 도형(rect/path/circle...)의 fill : SURFACE 맵 (밝은 배경 -> 어두운 배경)
  - 모든 요소의 stroke         : LINE 맵   (라인을 다크 배경에서 보이게)
  - 채도 높은 accent(파랑/초록/주황/빨강 등)는 도형 배경으로 유지
  - 'none', url(...), 미정의 색은 그대로 통과
출력: <name>.svg -> <name>-dark.svg
"""
import re
import sys
import glob
import os

# ── 잉크(글자/전경) 맵: 어두운 색 -> 밝은 색 ─────────────────────────
INK = {
    "#18181b": "#fafafa",   # 기본 본문 글자
    "#000000": "#fafafa",
    "black":   "#fafafa",
    "#27272a": "#e4e4e7",
    "#3f3f46": "#d4d4d8",
    "#52525b": "#d4d4d8",   # 보조 글자
    "#71717a": "#a1a1aa",
    "#9ca3af": "#d1d5db",
    # 진한 컬러 라벨 -> 밝은 컬러 라벨
    "#1e40af": "#93c5fd", "#1d4ed8": "#93c5fd", "#1e3a8a": "#bfdbfe",
    "#065f46": "#6ee7b7", "#047857": "#34d399", "#14532d": "#86efac",
    "#92400e": "#fcd34d", "#78350f": "#fbbf24", "#713f12": "#fde68a",
    "#b91c1c": "#fca5a5", "#dc2626": "#f87171", "#7f1d1d": "#fca5a5",
    "#6b21a8": "#d8b4fe", "#5b21b6": "#c4b5fd",
    # 채도 accent가 '글자'로 쓰일 때는 살짝 밝게
    "#3b82f6": "#60a5fa", "#10b981": "#34d399",
    "#f59e0b": "#fbbf24", "#ef4444": "#f87171",
    # 'white' 글자는 어두운/accent 칩 위에 있으므로 유지(매핑 안 함)
}

# ── 표면(도형 배경) 맵: 밝은 배경 -> 어두운 배경 ─────────────────────
SURFACE = {
    "#fafafa": "#18181b",   # 페이지 배경
    "#ffffff": "#18181b", "#fff": "#18181b", "white": "#18181b",
    "#f9fafb": "#27272a", "#f4f4f5": "#27272a", "#f3f4f6": "#27272a",
    "#e4e4e7": "#3f3f46", "#e5e7eb": "#3f3f46",
    "#d4d4d8": "#3f3f46",
    "#a1a1aa": "#52525b", "#71717a": "#52525b",
    "#18181b": "#27272a",   # 어두운 헤더/칩 -> 약간 밝은 다크(흰 글자 유지)
    "#27272a": "#3f3f46",
    # 50단계(거의 흰색) 색조: 줄무늬/은은한 패널 -> 배경에 가까운 미묘한 다크 톤
    "#f0fdf4": "#14211b", "#ecfdf5": "#14211b", "#f7fee7": "#1a2113",
    "#eff6ff": "#151d2b", "#f0f9ff": "#131d28", "#f5f3ff": "#1b1726",
    "#fffbeb": "#221d10", "#fefce8": "#211f12", "#fff7ed": "#231a10",
    "#fef2f2": "#231416", "#fff1f2": "#231417", "#fdf2f8": "#231420",
    "#fefefe": "#18181b",
    # 100단계 파스텔: 의미 있는 컬러 패널 -> 중간 톤 다크 컬러 배경
    "#dbeafe": "#1e3a5f", "#bfdbfe": "#1e40af", "#e0f2fe": "#0c4a6e",
    "#d1fae5": "#14352a", "#dcfce7": "#14352a", "#bbf7d0": "#065f46",
    "#fef3c7": "#33280f", "#fde68a": "#854d0e", "#fef08a": "#854d0e",
    "#fee2e2": "#3a1a1a", "#fecaca": "#5b1d1d",
    "#fce7f3": "#3f1430", "#fbcfe8": "#831843",
    "#f3e8ff": "#2e1d44", "#ede9fe": "#2e1065", "#ddd6fe": "#4c1d95",
    "#cffafe": "#164e63", "#ccfbf1": "#134e4a",
    # 채도 높은 accent 칩은 그대로 유지(아래 KEEP 집합)
}

# ── 라인(테두리/연결선) 맵 ───────────────────────────────────────────
LINE = {
    "#18181b": "#52525b", "#000000": "#52525b", "black": "#52525b",
    "#3f3f46": "#52525b", "#52525b": "#71717a",
    "#e4e4e7": "#3f3f46", "#e5e7eb": "#3f3f46", "#d4d4d8": "#3f3f46",
    "#f4f4f5": "#3f3f46", "#f9fafb": "#3f3f46",
    "#a1a1aa": "#52525b", "#71717a": "#52525b", "#9ca3af": "#52525b",
    "#ffffff": "#27272a", "white": "#3f3f46",
}

# 도형 배경/라인에서 그대로 둘 채도 accent (브랜드 색 유지)
KEEP = {
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#22d3ee", "#a78bfa",
    "#f87171", "#fb7185", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6",
    "#60a5fa", "#34d399", "#fbbf24", "#a855f7", "#0ea5e9", "#84cc16",
}

TEXT_TAGS = {"text", "tspan"}
HEX_RE = re.compile(r'(fill|stroke|stop-color)="([^"]*)"')
TAG_RE = re.compile(r'<([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*/?>')


def norm(c: str) -> str:
    return c.strip().lower()


def map_color(value: str, kind: str, tag: str) -> str:
    v = norm(value)
    if v in ("none", "transparent", "") or v.startswith("url("):
        return value
    if kind == "stroke":
        if v in KEEP:
            return value
        return LINE.get(v, value)
    # fill
    if tag in TEXT_TAGS:
        return INK.get(v, value)
    # 도형 fill
    if v in KEEP:
        return value
    return SURFACE.get(v, value)


def convert(svg: str) -> str:
    def repl_tag(m: re.Match) -> str:
        whole, tag = m.group(0), m.group(1)

        def repl_attr(am: re.Match) -> str:
            prop, val = am.group(1), am.group(2)
            kind = "stroke" if prop == "stroke" else "fill"  # stop-color -> fill 취급
            return f'{prop}="{map_color(val, kind, tag)}"'

        return HEX_RE.sub(repl_attr, whole)

    return TAG_RE.sub(repl_tag, svg)


def main():
    src_dir = sys.argv[1] if len(sys.argv) > 1 else "public/images"
    files = [f for f in glob.glob(os.path.join(src_dir, "*.svg"))
             if not f.endswith("-dark.svg")]
    n = 0
    for f in sorted(files):
        out = f[:-4] + "-dark.svg"
        svg = open(f, encoding="utf-8").read()
        open(out, "w", encoding="utf-8").write(convert(svg))
        n += 1
    print(f"생성 완료: {n}개 다크 SVG -> {src_dir}/*-dark.svg")


if __name__ == "__main__":
    main()
