import { getRandomWordApi } from '@/apis/wordnik';
import { ChatContent, ChatInput } from '@/frontend/components/chat';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import startMockWorker from '@/libs/msw/startMockWorker';
import { makeQueryClient } from '@/libs/tanstack/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { formatKstYmd } from '../utils/times';

startMockWorker();

async function ChatPage() {
  const queryClient = makeQueryClient();

  const todayKst = formatKstYmd();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.getRandomWord, todayKst],
    queryFn: getRandomWordApi,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatContent />
      {/* <ChatInput /> */}
    </HydrationBoundary>
  );
}

export default ChatPage;
