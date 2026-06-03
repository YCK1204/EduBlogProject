/**
 * 이미지 경로에 basePath를 자동으로 추가합니다.
 * GitHub Pages 배포 시 /EduBlogProject prefix가 필요하기 때문입니다.
 */

// 빌드 시점에서 basePath 정보를 가져옵니다
const getBasePath = (): string => {
  // GitHub Pages 배포 환경에서는 /EduBlogProject prefix 필요
  if (typeof window !== 'undefined') {
    // 클라이언트에서는 현재 경로로 판단
    return window.location.pathname.startsWith('/EduBlogProject') ? '/EduBlogProject' : '';
  }
  // 서버에서는 빌드 환경 변수로 판단
  return process.env.GITHUB_ACTIONS === 'true' ? '/EduBlogProject' : '';
};

/**
 * 이미지 경로에 basePath를 추가합니다.
 * @param src - 원본 이미지 경로 (예: "/images/array.svg")
 * @returns basePath가 포함된 경로 (예: "/EduBlogProject/images/array.svg")
 */
export function getImagePath(src: string): string {
  // 이미 절대 URL이거나 basePath가 포함된 경우 그대로 반환
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }
  
  const basePath = getBasePath();
  
  // 이미 basePath가 포함된 경우 중복 추가 방지
  if (basePath && src.startsWith(basePath)) {
    return src;
  }
  
  // basePath 추가
  return basePath + src;
}