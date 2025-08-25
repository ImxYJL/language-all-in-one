import { getRandomWordApi } from '@/apis/word';
import { ChatContent, ChatInput } from '@/frontend/components/chat';
import { QueryProvider } from '@/frontend/providers';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import startMockWorker from '@/libs/msw/startMockWorker';
import { makeQueryClient } from '@/libs/tanstack/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { formatKstYmd } from '../utils/times';

startMockWorker();

async function ChatPage() {
  const queryClient = makeQueryClient();

  const todayKst = formatKstYmd();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.getRandomWord, todayKst],
    queryFn: getRandomWordApi,
  });

  const dehydratedState = dehydrate(queryClient);
  // console.log('dehydratedState', dehydratedState);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <ChatContent />
      {/* <ChatInput /> */}
    </QueryProvider>
  );
}

export default ChatPage;
