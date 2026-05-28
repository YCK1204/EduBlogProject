# 프로그래머 피드백 — 수정 태스크

## 잘 된 것
- App Router + `output: "export"` 정적 빌드 조합으로 서버 비용 없는 확장 가능한 구조
- JSON 기반 레슨 데이터 + `generateStaticParams` 자동 인식 — 새 레슨 추가가 파일 하나로 끝남
- `IntersectionObserver` 기반 스텝 추적 사이드바 구현이 깔끔함
- TypeScript 타입 정의가 `lib/lessonTypes.ts`에 잘 분리되어 있음

---

## 수정 필요 — 우선순위 순

### P0 — 즉시 수정 (기능 브레이킹)

#### 1. 홈페이지 CTA 버튼이 링크 미연결
- **파일:** `app/page.tsx` — 46번, 93번, 125번 줄
- **문제:** `<div>` 로 만들어진 CTA 버튼들이 클릭해도 아무 페이지로도 이동하지 않음
- **수정:** `<Link href="/category/data-structures">`, `<Link href="/category/algorithms">`, `<Link href="/category/cs-basics">` 로 각각 연결

---

### P1 — 높은 우선순위

#### 2. CodeBlock 문법 강조 미적용
- **파일:** `components/CodeBlock.tsx`
- **문제:** `globals.css`에 `highlight.js` CSS를 임포트하지만 실제 컴포넌트에서 `hljs.highlightElement()` 또는 `hljs.highlight()`를 호출하지 않아 코드가 단색 텍스트로 렌더링됨
- **패키지:** `highlight.js@11.11.1` 이미 설치되어 있음
- **수정:** `useEffect` 내에서 `hljs.highlight(currentCode, { language: langToHljsAlias(currentLang) })` 를 호출하고 `__html` 로 주입하거나, `useRef`로 `<code>` 요소를 참조해 `hljs.highlightElement(ref.current)` 호출
- **언어 매핑:** `c→c`, `cpp→cpp`, `csharp→csharp`, `python→python`, `java→java`, `javascript→javascript`

#### 3. 레거시 라우트 파일 제거
- **파일들 (모두 삭제):**
  - `app/category/algorithms/[slug]/page.tsx`
  - `app/category/cs-basics/[slug]/page.tsx`
  - `app/category/data-structures/[slug]/page.tsx`
  - `app/category/programming/[slug]/page.tsx`
  - `app/posts/[slug]/page.tsx`
- **문제:** 통합 라우트 `app/category/[name]/[level]/[slug]/page.tsx` 와 구형 라우트가 공존하여 혼란 유발
- **수정:** 위 파일들 삭제. 현재 레슨 링크는 모두 `[name]/[level]/[slug]` 구조를 사용 중이므로 안전하게 제거 가능

#### 4. 구형 데이터 파일 제거
- **파일들 (모두 삭제):**
  - `data/lessons/en/array.json`
  - `data/lessons/ko/array.json`
- **문제:** 구형 포맷 잔재로, `lessonLoader.ts`에서 참조되지 않는 데드 파일

---

### P2 — 중간 우선순위

#### 5. `<img>` → `next/image` 교체
- **파일:** `components/LessonView.tsx` — `renderBlock` 함수 내 `image` 타입 처리 부분
- **문제:** `<img>` 태그 직접 사용으로 이미지 최적화 미적용
- **수정:** `import Image from "next/image"` 후 `<Image src={block.src} alt={block.alt} fill className="object-contain" />` 로 교체. 정적 빌드이므로 `next.config.ts`에 `images: { unoptimized: true }` 설정 필요

#### 6. DSLessonView 레거시 컴포넌트 제거
- **파일:** `components/DSLessonView.tsx`
- **문제:** CLAUDE.md에 "레거시, LessonView로 대체 중"으로 명시. 실제 어떤 페이지에서도 import 되지 않는지 확인 후 제거
- **확인:** `grep -r "DSLessonView" app/` 로 사용처 없으면 파일 삭제
