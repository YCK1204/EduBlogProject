"use client";

import { useLang } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useLang();
  const h = t.home;

  return (
    <div className="space-y-0">
      {/* 섹션 1: 소개 */}
      <section className="py-24 text-center max-w-3xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
          {h.aboutLabel}
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
          {h.tagline1}
          <br />
          {h.tagline2}
        </h2>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {h.intro1}{" "}
          <strong className="font-semibold text-zinc-900 dark:text-white">
            {h.introEmphasis}
          </strong>
          {h.intro2}
        </p>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* 섹션 2: 자료구조 */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
            {h.dsLabel}
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug mb-5">
            {h.dsHeading1}
            <br />
            {h.dsHeading2}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {h.dsBody}
          </p>
        </div>
        <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* 연결리스트/배열 시각화 SVG */}
            <svg
              viewBox="0 0 320 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-xs"
              aria-label="자료구조 연결리스트 다이어그램"
            >
              {/* 노드 1 */}
              <rect x="8" y="70" width="60" height="40" rx="6" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
              <text x="38" y="86" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">node</text>
              <text x="38" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="600" fontFamily="monospace">42</text>

              {/* 화살표 1→2 */}
              <line x1="68" y1="90" x2="90" y2="90" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="none" />
              <polygon points="90,86 98,90 90,94" fill="#a1a1aa" />

              {/* 노드 2 */}
              <rect x="98" y="70" width="60" height="40" rx="6" fill="none" stroke="#71717a" strokeWidth="2" />
              <text x="128" y="86" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">node</text>
              <text x="128" y="100" textAnchor="middle" fill="#52525b" fontSize="10" fontWeight="600" fontFamily="monospace">17</text>

              {/* 화살표 2→3 */}
              <line x1="158" y1="90" x2="180" y2="90" stroke="#a1a1aa" strokeWidth="1.5" />
              <polygon points="180,86 188,90 180,94" fill="#a1a1aa" />

              {/* 노드 3 */}
              <rect x="188" y="70" width="60" height="40" rx="6" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
              <text x="218" y="86" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">node</text>
              <text x="218" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="600" fontFamily="monospace">85</text>

              {/* 화살표 3→4 */}
              <line x1="248" y1="90" x2="270" y2="90" stroke="#a1a1aa" strokeWidth="1.5" />
              <polygon points="270,86 278,90 270,94" fill="#a1a1aa" />

              {/* 노드 4 (null) */}
              <rect x="278" y="70" width="38" height="40" rx="6" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="297" y="94" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">null</text>

              {/* 배열 표현 (하단) */}
              <text x="38" y="148" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">idx 0</text>
              <text x="98" y="148" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">idx 1</text>
              <text x="158" y="148" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">idx 2</text>
              <text x="218" y="148" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="monospace">idx 3</text>

              <rect x="8" y="152" width="60" height="28" rx="3" fill="#e4e4e7" />
              <rect x="78" y="152" width="60" height="28" rx="3" fill="#e4e4e7" />
              <rect x="148" y="152" width="60" height="28" rx="3" fill="#e4e4e7" />
              <rect x="218" y="152" width="60" height="28" rx="3" fill="#d4d4d8" />

              <text x="38" y="171" textAnchor="middle" fill="#52525b" fontSize="11" fontWeight="600" fontFamily="monospace">42</text>
              <text x="108" y="171" textAnchor="middle" fill="#52525b" fontSize="11" fontWeight="600" fontFamily="monospace">17</text>
              <text x="178" y="171" textAnchor="middle" fill="#52525b" fontSize="11" fontWeight="600" fontFamily="monospace">85</text>
              <text x="248" y="171" textAnchor="middle" fill="#71717a" fontSize="11" fontWeight="600" fontFamily="monospace">…</text>

              {/* 레이블 */}
              <text x="160" y="22" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace" letterSpacing="2">LINKED LIST</text>
              <text x="160" y="138" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace" letterSpacing="2">ARRAY</text>
            </svg>
          </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* 섹션 3: 알고리즘 */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden order-last md:order-first">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* 정렬 알고리즘 시각화 SVG (버블/선택 정렬 막대 그래프) */}
            <svg
              viewBox="0 0 320 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-xs"
              aria-label="알고리즘 정렬 시각화 다이어그램"
            >
              {/* 레이블 */}
              <text x="160" y="18" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace" letterSpacing="2">SORTING</text>

              {/* 막대 배경 가이드라인 */}
              <line x1="20" y1="165" x2="300" y2="165" stroke="#d4d4d8" strokeWidth="1" />

              {/* 막대 6개 (정렬 중: 비교/교환 상태 표현) */}
              {/* 막대 1 — 높이 낮음 (정렬됨) */}
              <rect x="28" y="125" width="32" height="40" rx="3" fill="#a1a1aa" />
              <text x="44" y="179" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">1</text>

              {/* 막대 2 */}
              <rect x="70" y="100" width="32" height="65" rx="3" fill="#a1a1aa" />
              <text x="86" y="179" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">3</text>

              {/* 막대 3 — 활성(비교 중) */}
              <rect x="112" y="65" width="32" height="100" rx="3" fill="#52525b" />
              <text x="128" y="179" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace" fontWeight="700">5</text>

              {/* 비교 화살표 (3↔4) */}
              <path d="M128,58 L172,58" stroke="#71717a" strokeWidth="1.2" markerEnd="url(#arr)" markerStart="url(#arrL)" fill="none" strokeDasharray="3 2" />
              <defs>
                <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#71717a" />
                </marker>
                <marker id="arrL" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                  <polygon points="6 0, 0 3, 6 6" fill="#71717a" />
                </marker>
              </defs>

              {/* 막대 4 — 활성(비교 중) */}
              <rect x="154" y="45" width="32" height="120" rx="3" fill="#52525b" />
              <text x="170" y="179" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace" fontWeight="700">7</text>

              {/* 막대 5 */}
              <rect x="196" y="90" width="32" height="75" rx="3" fill="#a1a1aa" />
              <text x="212" y="179" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">4</text>

              {/* 막대 6 */}
              <rect x="238" y="110" width="32" height="55" rx="3" fill="#c4c4c7" />
              <text x="254" y="179" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">2</text>

              {/* 목표 정렬 순서 표시 (하단 점선 화살표) */}
              <text x="160" y="197" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">comparing…</text>
            </svg>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
            {h.algoLabel}
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug mb-5">
            {h.algoHeading1}
            <br />
            {h.algoHeading2}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {h.algoBody}
          </p>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* 섹션 4: CS·프로그래밍 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 dark:bg-zinc-950">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">
            {h.csLabel}
          </p>
          <h3 className="text-4xl font-bold tracking-tight text-white leading-tight mb-6">
            {h.csHeading1}
            <br />
            {h.csHeading2}
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            {h.csBody}
          </p>
        </div>
      </section>
    </div>
  );
}
