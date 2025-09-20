import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';
import { isServer, withServerAuthHeaders } from '@/libs/axios/serverAuth';
import { SentenceListResponse, WordListResponse } from '@/types/vocabulary';

export const DEFAULT_SIZE_PER_PAGE = 20;

export interface GetVocaListParams {
  isFavorited?: boolean;
  afterId: string | null;
  limit?: number;
}

export const getWordsApi = async ({ isFavorited, afterId, limit }: GetVocaListParams) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.get<WordListResponse>(ENDPOINT.getWords, {
    headers,
    params: {
      limit,
      ...(isFavorited ? { favorited: true } : {}),
      ...(afterId ? { afterId } : {}),
    },
  });

  return data;
};

export const getSentencesApi = async ({ isFavorited, afterId, limit }: GetVocaListParams) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.get<SentenceListResponse>(ENDPOINT.getSentences, {
    headers,
    params: {
      limit,
      ...(isFavorited ? { favorited: true } : {}),
      ...(afterId ? { afterId } : {}),
    },
  });

  return data;
};
