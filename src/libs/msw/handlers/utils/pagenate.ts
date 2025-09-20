import { DEFAULT_SIZE_PER_PAGE } from '@/apis/vocabulary';

export interface Cursor {
  afterId: string;
}

export interface PaginatedBody<T> {
  item: T[];
  next: Cursor | null;
}

export function paginateByCursor<T extends { id: string }>(
  list: T[],
  options?: {
    limit?: number;
    afterId?: string | null;
    comparator?: (a: T, b: T) => number;
  },
): PaginatedBody<T> {
  // TODO: page 사이즈 더 공용으로 올리기, 1 ~ 100도 상수화
  const limit = Math.min(Math.max(options?.limit ?? DEFAULT_SIZE_PER_PAGE, 1), 100);
  const afterId = options?.afterId ?? null;
  const comparator = options?.comparator ?? ((a: T, b: T) => a.id.localeCompare(b.id));

  const sorted = [...list].sort(comparator);

  const cursorIdx = afterId ? sorted.findIndex((item) => item.id === afterId) : -1;
  const startIdx = afterId ? (cursorIdx > -1 ? cursorIdx + 1 : sorted.length) : 0;

  const data = sorted.slice(startIdx, startIdx + limit);
  const next = data.length === limit && data.length > 0 ? { afterId: data[data.length - 1].id } : null;

  return { item: data, next };
}
