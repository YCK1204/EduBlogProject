# 기획자 피드백 — 수정 태스크

## 잘 된 것
- 4개 카테고리 + 3단계 레벨 구조가 직관적이고 명확함
- 한국어/영어 이중 언어 지원으로 타겟 범위 넓음
- 카테고리 내 레벨 필터 + 검색 기능 — 기본 UX 갖춤
- 레슨 상세의 "연관 주제" 링크 — 학습 연속성에 도움

---

## 수정 필요 — 우선순위 순

### P0 — 즉시 수정 (기능 브레이킹)

#### 1. 홈페이지 CTA 네비게이션 연결
- **파일:** `app/page.tsx`
- **문제:** 각 섹션의 CTA 버튼이 아무 페이지로도 연결되지 않음 (코드 레벨 수정은 FEEDBACK_PROGRAMMER.md 참조)
- **확인:** 각 섹션별 링크 목적지
  - 자료구조 섹션 CTA → `/category/data-structures`
  - 알고리즘 섹션 CTA → `/category/algorithms`
  - CS기초·프로그래밍 섹션 CTA → `/category/cs-basics`

---

### P1 — 높은 우선순위

#### 2. 레슨 페이지 SEO 메타데이터 추가
- **파일:** `app/category/[name]/[level]/[slug]/page.tsx`
- **문제:** 레슨 상세 페이지에 `generateMetadata`가 없어 검색엔진에 제목/설명 미노출
- **수정:** `generateMetadata` 함수 추가
  ```typescript
  export async function generateMetadata({ params }) {
    const { name, level, slug } = await params;
    const lesson = loadLesson(name, level, slug, "ko");
    return {
      title: `${lesson.title} | DevNote`,
      description: lesson.summary,
      openGraph: {
        title: lesson.title,
        description: lesson.summary,
        type: "article",
      },
    };
  }
  ```

#### 3. 카테고리 페이지 SEO 메타데이터 개선
- **파일:** `app/category/[name]/page.tsx`
- **현재:** `title: "${name} | DevNote"` 만 반환 — slug 그대로 노출 (`data-structures | DevNote`)
- **수정:** `SLUG_TO_LABEL` 을 활용해 한국어 레이블 사용
  ```typescript
  return {
    title: `${SLUG_TO_LABEL[name]} | DevNote`,
    description: `${SLUG_TO_LABEL[name]} 강의 목록 — 초급부터 고급까지 단계별로 학습하세요.`,
  };
  ```

---

### P2 — 중간 우선순위

#### 4. 브레드크럼 네비게이션 추가
- **파일:** `app/category/[name]/[level]/[slug]/page.tsx` 또는 `components/LessonView.tsx`
- **문제:** 레슨 상세에서 현재 위치(홈 > 카테고리 > 레슨)가 명확하지 않음
- **수정:** 레슨 헤더 섹션 위에 브레드크럼 추가
  - `홈 > 자료구조 > 배열과 동적 배열` 형태
  - 각 항목은 `<Link>` 로 연결
  - 텍스트 크기 `text-xs`, 색상 `text-zinc-400`, 구분자 `/`

#### 5. 레슨 완료 체크 기능 (로컬스토리지)
- **파일:** 신규 훅 `lib/useProgress.ts` + `components/LessonView.tsx`
- **문제:** 사용자가 어떤 레슨을 봤는지 추적할 방법이 없어 재방문 이유가 약함
- **수정:**
  - `useProgress` 훅: `localStorage`의 `devnote_progress` 키에 완료한 slug 배열 저장/조회
  - `LessonView` 하단 네비게이션에 "이 레슨 완료 표시" 버튼 추가 (체크 아이콘 + "완료")
  - `CategoryGrid` 카드에 완료된 레슨에 작은 체크 배지 표시

#### 6. 사이트맵 생성
- **파일:** `app/sitemap.ts` (신규 생성)
- **문제:** 정적 사이트임에도 `sitemap.xml` 이 없어 검색엔진 크롤링 비효율
- **수정:** Next.js 메타데이터 API 활용
  ```typescript
  import { getAllLessons } from "@/lib/lessonLoader";
  import { CATEGORY_SLUGS } from "@/lib/categories";

  export default function sitemap() {
    const lessonUrls = CATEGORY_SLUGS.flatMap((cat) =>
      getAllLessons(cat).map((l) => ({
        url: `https://devnote.example.com/category/${cat}/${l.levelFolder}/${l.slug}`,
        lastModified: new Date(),
      }))
    );
    return [
      { url: "https://devnote.example.com", lastModified: new Date() },
      ...CATEGORY_SLUGS.map((cat) => ({
        url: `https://devnote.example.com/category/${cat}`,
        lastModified: new Date(),
      })),
      ...lessonUrls,
    ];
  }
  ```
