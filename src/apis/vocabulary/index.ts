import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';
import { isServer, withServerAuthHeaders } from '@/libs/axios/serverAuth';
import { CreateSentenceParsed, CreateWordParsed, SentenceListResponse, WordListResponse } from '@/types/vocabulary';

export const DEFAULT_SIZE_PER_PAGE = 20;

export interface GetVocaListParams {
  isFavorited?: boolean;
  afterId: string | null;
  limit?: number;
}

export const getWordsApi = async ({ isFavorited, afterId, limit }: GetVocaListParams) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.get<WordListResponse>(ENDPOINT.words, {
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

  const { data } = await axios.get<SentenceListResponse>(ENDPOINT.sentences, {
    headers,
    params: {
      limit,
      ...(isFavorited ? { favorited: true } : {}),
      ...(afterId ? { afterId } : {}),
    },
  });

  return data;
};

export const postWordApi = async (params: CreateWordParsed) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.post(ENDPOINT.words, params, { headers });
  return data;
};

export const postSentenceApi = async (params: CreateSentenceParsed) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.post(ENDPOINT.sentences, params, { headers });
  return data;
};

export interface PatchIsFavoriteParams {
  isFavorite: boolean;
  id: string;
}

export const patchIsFavoriteApi = async ({ id, isFavorite }: PatchIsFavoriteParams) => {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;

  const { data } = await axios.patch(
    ENDPOINT.favoriteItem(id),
    {
      value: isFavorite,
    },
    { headers },
  );
  return data;
};
