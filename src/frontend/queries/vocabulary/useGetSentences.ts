'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { DEFAULT_SIZE_PER_PAGE, getSentencesApi } from '@/apis/vocabulary';
import type { SentenceListResponse } from '@/types/vocabulary';
import { QUERY_KEY } from '../queryKeys';

export const useGetSentences = (isFavorite: boolean) => {
  const { data, fetchNextPage, isFetchingNextPage, ...rest } = useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY.sentences, isFavorite],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getSentencesApi({
        afterId: pageParam,
        isFavorited: isFavorite,
        limit: DEFAULT_SIZE_PER_PAGE,
      }),
    getNextPageParam: (last: SentenceListResponse) => last.next?.afterId ?? undefined,
    refetchOnMount: false,
    staleTime: 10 * 60 * 1000,
  });

  const items = data.pages.flatMap((p) => p?.items ?? []);
  const isLastPage = !data.pages[data.pages.length - 1].next;

  return { sentences: items, fetchNextPage, isFetchingNextPage, isLastPage, ...rest };
};

export default useGetSentences;
