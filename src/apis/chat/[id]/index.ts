import { isServer, withServerAuthHeaders } from '@/libs/axios/serverAuth';
import { ENDPOINT } from '@/apis/endpoints';
import axios from '@/libs/axios/axios';
import { Message } from '@/backend/models/llm/types';

export const getMessagesApi = async (conversationId: string) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.get<Message[]>(ENDPOINT.messages(conversationId), {
    headers,
    params: {
      conversationId,
    },
  });

  return data;
};
