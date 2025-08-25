import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = ['em', 'a'];
const ALLOWED_ATTR = ['target', 'href', 'rel'];

export function sanitizeDefinitionHtml(src: string) {
  return DOMPurify.sanitize(src, {
    // 표준 태그 화이트리스트
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // 커스텀/비표준 태그는 "추가 허용"으로 넣어야 함
    ADD_TAGS: ['xref'],
    // xref에 커스텀 속성이 필요하다면 아래처럼 추가
    // ADD_ATTR: ['data-term'],
  });
}
