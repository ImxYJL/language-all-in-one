import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { getMessagesApi } from '@/apis/chat/[id]';

const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.messages],
    queryFn: () => getMessagesApi(conversationId),
    staleTime: Infinity,
  });
};

export default useGetMessages;
