# 디자이너 피드백 — 수정 태스크

## 잘 된 것
- 다크/라이트 모드가 zinc 팔레트로 일관성 있게 구현됨
- CategoryGrid 카드 썸네일의 CSS 패턴 배경 — 이미지 없이 시각적 다양성 부여한 아이디어 좋음
- 레슨 상세 스텝 사이드바 — 스크롤 위치와 싱크 맞는 인터랙션이 깔끔함
- 헤더 활성 링크 표시가 명확함

---

## 수정 필요 — 우선순위 순

### P0 — 즉시 수정 (미완성 노출)

#### 1. 홈페이지 이미지 플레이스홀더 교체
- **파일:** `app/page.tsx` — 50~61번 줄(자료구조 섹션), 68~80번 줄(알고리즘 섹션)
- **문제:** `"Image placeholder"` 텍스트가 그대로 노출됨. 미완성 사이트처럼 보임
- **수정:** 두 이미지 영역을 SVG 인라인 일러스트로 교체
  - 자료구조 섹션: 배열/연결리스트를 암시하는 노드-링크 SVG 다이어그램 (박스 4개 + 화살표)
  - 알고리즘 섹션: 정렬 과정을 암시하는 막대 그래프 SVG (높이가 다른 컬럼들)
  - 배경은 기존 `bg-zinc-100 dark:bg-zinc-800` 유지, SVG는 zinc 계열 색상 사용
  - `"Image placeholder"` 텍스트 제거

---

### P1 — 높은 우선순위

#### 2. 다크모드 토글 헤더로 이동
- **현재 위치:** `ThemeToggle` 컴포넌트가 `app/layout.tsx`에서 플로팅 버튼으로 배치됨 (우측 하단)
- **문제:** 처음 방문자가 토글 존재를 인지하기 어려움
- **수정:**
  - `components/ThemeToggle.tsx` 를 헤더에 통합
  - `components/Header.tsx` 의 nav 우측에 아이콘 버튼으로 배치
  - 해 아이콘(라이트) / 달 아이콘(다크) SVG 사용
  - `app/layout.tsx`에서 독립적인 `<ThemeToggle />` 렌더링 제거
  - 단, 기존 ThemeToggle의 클릭 로직(localStorage + class toggle)은 유지

#### 3. 모바일 스텝 네비게이션 추가
- **파일:** `components/LessonView.tsx`
- **문제:** 스텝 사이드바가 `hidden lg:block` — 모바일에서 현재 위치를 알 수 없음
- **수정:** 모바일 전용 스텝 진행 표시 추가
  - 메인 콘텐츠 상단(챕터 헤더 카드 아래)에 `lg:hidden` 블록 추가
  - 형태: "Step 2 / 5" 텍스트 + 프로그레스 바 (`w-full h-1 bg-zinc-200` 배경, `activeStep/totalSteps * 100%` 너비의 `bg-zinc-900` 바)
  - 현재 스텝 타이틀도 함께 표시

---

### P2 — 중간 우선순위

#### 4. 코드 전용 폰트 로딩
- **파일:** `app/layout.tsx`, `app/globals.css`
- **문제:** 코드블록이 시스템 기본 폰트로 렌더링됨. CSS에 `"Fira Code"` 가 선언되어 있으나 실제 로드되지 않음
- **수정:**
  - `app/layout.tsx` `<head>` 에 Google Fonts preconnect + JetBrains Mono 링크 추가
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    ```
  - `globals.css` 코드 폰트 선언을 `"JetBrains Mono", "Fira Code", monospace` 로 업데이트
  - `components/CodeBlock.tsx` `<pre>` 태그에 `font-family` 적용 확인

#### 5. 카테고리 페이지 헤더 시각 개선
- **파일:** `components/CategoryHeader.tsx`
- **현재:** 카테고리 헤더가 단순 텍스트
- **수정:** 각 카테고리별 아이콘 또는 강조색 포인트를 추가해 카테고리 진입 시 시각적 구분감 부여
  - `data-structures`: 연결된 노드 아이콘 (SVG)
  - `algorithms`: 정렬 막대 아이콘 (SVG)
  - `cs-basics`: CPU/칩 아이콘 (SVG)
  - `programming`: `</>` 코드 아이콘 (SVG)
