import VocaContent from '@/frontend/components/vocabulary/VocaContent';
import { QueryProvider } from '@/frontend/providers';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import startMockWorker from '@/libs/msw/startMockWorker';
import { makeQueryClient } from '@/libs/tanstack/queryClient';
import { dehydrate } from '@tanstack/react-query';

startMockWorker();

async function ChatPage() {
  const queryClient = makeQueryClient();

  // const todayKst = formatKstYmd();
  // await queryClient.prefetchQuery({
  //   queryKey: [QUERY_KEY.getRandomWord, todayKst],
  //   queryFn: getRandomWordApi,
  // });

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <VocaContent />
    </QueryProvider>
  );
}

export default ChatPage;
