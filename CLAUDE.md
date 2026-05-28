# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요
프로그래밍 교육 콘텐츠 정적 웹 블로그 (자료구조 · 알고리즘 · CS기초 · 프로그래밍)

## 기술 스택
- **Next.js** (App Router, `output: "export"` 정적 빌드)
- **TypeScript** · **Tailwind CSS v4**
- **백엔드 없음** — 완전 정적 사이트, 런타임 API 없음

## 개발 명령어
```bash
npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 정적 빌드 → out/ 폴더
```

## 아키텍처: 데이터 흐름

### 레슨 데이터 구조
모든 콘텐츠는 `data/lessons/` 하위 JSON 파일로 관리된다:

```
data/lessons/
  {category}/          # data-structures | algorithms | cs-basics | programming
    {level}/           # beginner | intermediate | advanced
      {slug}/
        ko.json        # 한국어 레슨
        en.json        # 영어 레슨
data/i18n/
  ko.json              # UI 문자열 (한국어)
  en.json              # UI 문자열 (영어)
```

### 레슨 JSON 스키마 (`lib/lessonTypes.ts`)
```json
{
  "slug": "array",
  "title": "배열과 동적 배열",
  "tag": "Array",
  "estimatedTime": "20분",
  "relatedSlugs": ["linked-list"],
  "summary": "...",
  "steps": [
    {
      "number": 1,
      "title": "배열이란 무엇인가",
      "blocks": [
        { "type": "text", "content": "..." },
        { "type": "points", "items": ["O(1) 접근", "..."] },
        { "type": "code", "python": "...", "javascript": "...", "java": "...", "cpp": "...", "c": "...", "csharp": "..." },
        { "type": "image", "src": "/images/foo.png", "alt": "설명" }
      ]
    }
  ]
}
```
`level` 필드는 JSON에 없고 `lessonLoader.ts`가 폴더명으로부터 주입한다 (`beginner` → `"초급"`).

### 데이터 로딩 레이어 (`lib/lessonLoader.ts`)
- `loadLesson(category, levelFolder, slug, lang)` — 단일 레슨 로드
- `buildLessonCards(category)` — 카테고리 목록 페이지용 카드 목록 빌드
- `buildRelatedEntries(category, relatedSlugs)` — 연관 항목 링크 빌드
- `getAllLessons(category)` — `generateStaticParams` 전용

### URL 구조
```
/                                      # 홈
/category/{category}                  # 카테고리 목록  (data-structures 등)
/category/{category}/{level}/{slug}   # 레슨 상세  (beginner/array 등)
```
카테고리 slug ↔ 한국어 레이블 매핑은 `lib/categories.ts`의 `SLUG_TO_LABEL` 참고.

### i18n (다국어)
- UI 문자열: `data/i18n/ko.json` / `en.json` → `lib/i18n.ts`의 `STRINGS` 객체
- 언어 상태: `components/LanguageProvider.tsx`의 `useLang()` 훅 (localStorage 기반, SSR 없음)
- 레슨 본문: 각 `ko.json` / `en.json` 파일에서 직접 분기
- 번역 키 추가 시 **두 JSON 파일 모두** 동시에 수정해야 한다

### 핵심 컴포넌트
| 컴포넌트 | 역할 |
|---|---|
| `LessonView` | 레슨 상세 전체 레이아웃 (사이드바 steps + 콘텐츠) |
| `CodeBlock` | 언어 선택 드롭다운 + 코드 렌더링, `StepCode` 타입 수신 |
| `LanguageProvider` | ko/en 전환 전역 컨텍스트 |
| `DSLessonView` | 구 자료구조 전용 뷰 (레거시, `LessonView`로 대체 중) |

## 새 레슨 추가 방법
1. `data/lessons/{category}/{level}/{slug}/ko.json` 생성 (위 스키마 준수)
2. `data/lessons/{category}/{level}/{slug}/en.json` 생성
3. 빌드 시 `generateStaticParams`가 자동 인식 — 별도 등록 불필요

## 카테고리 slug 목록
`data-structures` · `algorithms` · `cs-basics` · `programming`  
레벨 폴더: `beginner` · `intermediate` · `advanced`

## 규칙
- 한국어로 답변
- 모든 함수/파일 탐색은 반드시 Serena MCP 도구 사용 (LSP 기반 명령어 사용 금지)
- `npm run dev` 등 서버 실행 명령은 직접 실행하지 않는다 — 유저가 직접 실행함. 코드 작성만 담당

## 배포
- `next.config.ts`에 `output: "export"`, `trailingSlash: true` 설정 완료
- Vercel 또는 GitHub Pages 정적 배포

## 브랜치 전략
- `main`: 프로덕션
- `develop`: 개발 통합 브랜치
