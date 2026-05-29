# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요
프로그래밍 교육 콘텐츠 웹 블로그 (자료구조 · 알고리즘 · CS기초 · 프로그래밍). 프로덕션은 정적 사이트로 빌드되지만, 개발 모드에서는 콘텐츠 편집용 API Route가 동작한다.

## 기술 스택
- **Next.js 16** (App Router, React 19)
- **TypeScript** · **Tailwind CSS v4** (`@tailwindcss/postcss`)
- 마크다운 렌더링: `react-markdown` + `remark-gfm` + `rehype-highlight` / `rehype-slug` (현재 레슨 본문에는 미사용 — 아래 레거시 참고)

## 개발 명령어
```bash
npm run dev    # 개발 서버 (localhost:3000) — output:export 해제, /api/dev/* 활성화
npm run build  # 프로덕션 정적 빌드 → out/ 폴더
npm run lint   # eslint (eslint-config-next)
```
> 패키지 매니저: `package-lock.json`과 `pnpm-lock.yaml`이 둘 다 존재한다. Windows 전용 optional deps(`@tailwindcss/oxide-win32-x64-msvc`, `lightningcss-win32-x64-msvc`)가 명시되어 있어 **Windows 개발 환경** 기준이다.

## 빌드 모드의 핵심 동작 (`next.config.ts`)
```ts
...(isDev ? {} : { output: "export" })   // 프로덕션에서만 정적 export
trailingSlash: true
images: { unoptimized: true }
```
- **개발 모드**: `output: "export"`가 해제되어 `app/api/dev/*` Route Handler가 동작 → 인앱 에디터로 레슨 JSON 직접 편집 가능.
- **프로덕션 빌드**: 정적 export. API Route는 빌드에서 제외되며, 각 핸들러도 `NODE_ENV !== "development"`면 403을 반환한다.

## 아키텍처: 데이터 흐름

### 레슨 데이터 구조 (현재 정식 콘텐츠 소스)
모든 콘텐츠는 `data/lessons/` 하위 JSON 파일로 관리된다:
```
data/lessons/
  {category}/          # data-structures | algorithms | cs-basics | programming
    {level}/           # beginner | intermediate | advanced
      {slug}/
        ko.json        # 한국어 레슨
        en.json        # 영어 레슨
data/i18n/{ko,en}.json # UI 문자열
```

### 레슨 JSON 스키마 — 저장/렌더 (`lib/lessonTypes.ts`의 `Lesson`)
`steps[].blocks[]`는 아래 타입의 union(`Block`):
- `text` · `header`(level 1–3) · `bold` · `italic` · `underbar` · `strike` · `color`(+`color`)
- `points`(`items[]`) · `ol`(`items[]`)
- `image`(`src`, `alt`, 선택 `width`, 영어 전용 `srcEn`/`altEn`)
- `code` — 플랫 키 구조: `{ "type": "code", "python": "...", "javascript": "...", "cpp": "...", ... }` (언어별 키 = `CodeLang`)
- `box` — 중첩 `blocks[]`

`level` 필드는 JSON에 없고 `lessonLoader.ts`가 폴더명으로부터 주입한다 (`beginner` → `"초급"`, `FOLDER_TO_LEVEL` 참고).

### ⚠️ 두 개의 블록 스키마가 공존한다 (주의)
| | 저장/렌더 스키마 | 에디터 스키마 |
|---|---|---|
| 파일 | `lib/lessonTypes.ts` (`Block`) | `lib/editorTypes.ts` (`EditorBlock`) |
| 코드 블록 | 언어별 플랫 키 (`{type:"code", python:"..."}`) | `{type:"code", langs:[{lang,code}]}` |
| 리스트 | `points` | `ul` |
| step 식별 | `number` | `id`(uuid) |
| level | `"초급"/"중급"/"고급"` | `"beginner"/"intermediate"/"advanced"` |

`app/dev/editor/page.tsx`가 두 형식을 상호 변환한다(`convertBlock`). **블록 타입을 추가/수정할 때는 두 스키마와 변환 로직, 렌더러(`LessonView`/`EditableBlock`), 에디터(`BlockEditor`)를 모두 함께 고쳐야 한다.**

### 데이터 로딩 레이어 (`lib/lessonLoader.ts`, 서버 전용 `fs`)
- `loadLesson(category, levelFolder, slug, lang)` — 단일 레슨
- `buildLessonCards(category)` — 카테고리 목록 카드 (ko/en 동시 로드)
- `buildRelatedEntries(category, relatedSlugs)` — 연관 링크 (레벨 폴더 자동 탐색)
- `getAllLessons(category)` — `generateStaticParams` 전용

### URL / 라우트 구조
```
/                                      # 홈 (app/page.tsx)
/category/{category}                   # 카테고리 목록
/category/{category}/{level}/{slug}    # 레슨 상세
/dev/editor?category=&level=&slug=     # 레슨 에디터 (개발 모드 전용, slug 없으면 신규)
/api/dev/{load,save,lessons}           # 에디터 백엔드 (개발 모드 전용)
```
카테고리 slug ↔ 한국어 레이블 매핑은 `lib/categories.ts`(`SLUG_TO_LABEL` / `LABEL_TO_SLUG`).

### 인앱 레슨 에디터 (개발 모드 전용)
- 진입: 레슨 페이지의 `DevEditButton`, 또는 `/dev/editor` 직접 접근. `components/EditableBlock.tsx`는 본문 인라인 편집 진입점.
- 에디터 UI: `components/dev/{BlockEditor,OverviewEditor,DevPreview}.tsx`.
- 저장 흐름: `POST /api/dev/save` → `data/lessons/{cat}/{level}/{slug}/ko.json` 기록. `en.json`은 **없을 때만** ko 내용으로 복제(기존 번역 보존). `oldLevel`과 `level`이 다르면 이전 폴더를 삭제(레벨 이동).
- 로드: `GET /api/dev/load`, 관련 레슨 선택용 목록: `GET /api/dev/lessons`.
- 세 핸들러 모두 `NODE_ENV !== "development"`면 403.

### i18n (다국어)
- UI 문자열: `data/i18n/{ko,en}.json` → `lib/i18n.ts`의 `STRINGS`.
- 언어 상태: `components/LanguageProvider.tsx`의 `useLang()` (localStorage 기반, SSR 없음).
- 레슨 본문: `ko.json` / `en.json`에서 직접 분기.
- **번역 키 추가 시 두 JSON 파일(ko/en)을 동시에 수정**해야 한다.

### 핵심 컴포넌트
| 컴포넌트 | 역할 |
|---|---|
| `LessonView` | 레슨 상세 레이아웃 (사이드바 steps + 콘텐츠 렌더) |
| `EditableBlock` | 블록 렌더 + 개발 모드 인라인 편집 |
| `CodeBlock` | 언어 선택 드롭다운 + 코드 렌더링 |
| `LanguageProvider` / `ThemeProvider` | ko↔en, 라이트↔다크 전역 컨텍스트 |
| `lib/useProgress.ts` | 레슨 진행도 추적 (localStorage) |

## 새 레슨 추가 방법
1. `data/lessons/{category}/{level}/{slug}/ko.json` 생성 (`lib/lessonTypes.ts` `Lesson` 스키마 준수)
2. `data/lessons/{category}/{level}/{slug}/en.json` 생성
3. `generateStaticParams`가 빌드 시 자동 인식 — 별도 등록 불필요
   - 또는 개발 모드에서 `/dev/editor`로 작성하면 위 파일이 자동 생성된다.

## 카테고리 / 레벨
- 카테고리 slug: `data-structures` · `algorithms` · `cs-basics` · `programming`
- 레벨 폴더: `beginner` · `intermediate` · `advanced`

## 레거시 / 미사용 코드 (수정 전 확인)
다음은 현재 어떤 라우트에서도 import되지 않는다. JSON 레슨 시스템으로 대체되었으므로, 새 콘텐츠는 여기에 추가하지 말 것:
- `lib/algoContent.ts` · `lib/csContent.ts` · `lib/dsContent.ts` · `lib/progContent.ts` (대용량 하드코딩 콘텐츠)
- `lib/categoryCards.ts`
- 마크다운 포스트 시스템: `posts/*.md` + `lib/posts.ts`(`getAllPosts`/`getPostBySlug`) — 타입만 `PostCard.tsx`에서 참조될 뿐 라우트에 연결돼 있지 않음.

## 규칙
- **한국어로 답변**
- 함수/파일 탐색은 Serena MCP 도구 사용 (사용 가능 시)
- `npm run dev` 등 서버 실행 명령은 직접 실행하지 않는다 — 유저가 직접 실행함. 코드 작성만 담당

## 배포 / 브랜치
- 정적 export(`output: "export"`, `trailingSlash: true`) → Vercel 또는 GitHub Pages.
- `main`: 프로덕션 / `develop`: 개발 통합 브랜치
