'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getWordsApi, DEFAULT_SIZE_PER_PAGE } from '@/apis/vocabulary';
import type { WordListResponse } from '@/types/vocabulary';
import { QUERY_KEY } from '../queryKeys';

export const useGetWords = (isFavorite: boolean) => {
  const { data, fetchNextPage, isFetchingNextPage, ...rest } = useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY.words, isFavorite],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getWordsApi({
        afterId: pageParam,
        isFavorited: isFavorite,
        limit: DEFAULT_SIZE_PER_PAGE,
      }),
    getNextPageParam: (last: WordListResponse) => last.next?.afterId ?? undefined,
    refetchOnMount: false,
    staleTime: 10 * 60 * 1000,
  });

  const items = data.pages.flatMap((p) => p?.items ?? []);
  const isLastPage = !data.pages[data.pages.length - 1].next;

  return { words: items, fetchNextPage, isFetchingNextPage, isLastPage, ...rest };
};

export default useGetWords;
