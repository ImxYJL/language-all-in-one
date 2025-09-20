import { DEFAULT_SIZE_PER_PAGE, getSentencesApi, getWordsApi } from '@/apis/vocabulary';
import VocaContent from '@/frontend/components/vocabulary/VocaContent';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import startMockWorker from '@/libs/msw/startMockWorker';
import { makeQueryClient } from '@/libs/tanstack/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

//startMockWorker();

async function ChatPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEY.words, false],
    initialPageParam: null,
    staleTime: 10 * 60 * 1000,
    queryFn: ({ pageParam }) => getWordsApi({ afterId: pageParam, isFavorited: false, limit: DEFAULT_SIZE_PER_PAGE }),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEY.sentences, false],
    initialPageParam: null,
    staleTime: 10 * 60 * 1000,
    queryFn: ({ pageParam }) =>
      getSentencesApi({ afterId: pageParam, isFavorited: false, limit: DEFAULT_SIZE_PER_PAGE }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VocaContent />
    </HydrationBoundary>
  );
}

export default ChatPage;
