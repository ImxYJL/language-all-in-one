import { ItemType } from '@/types/vocabulary';
import { GetVocaListParams } from './vocabulary';

export const ENDPOINT = {
  login: '/login',
  getRandomWord: '/wordnik',
  getWords: ({ isFavorited, afterId, limit }: GetVocaListParams) =>
    buildGetVocaListUrl({ isFavorited, afterId, limit, itemType: 'word' }),
  getSentences: ({ isFavorited, afterId, limit }: GetVocaListParams) =>
    buildGetVocaListUrl({ isFavorited, afterId, limit, itemType: 'sentence' }),
} as const;

export function buildGetVocaListUrl({
  itemType,
  isFavorited,
  afterId,
  limit = 20,
}: GetVocaListParams & {
  itemType: ItemType;
}) {
  const searchParams = new URLSearchParams();

  if (limit) searchParams.set('limit', limit.toString());
  if (afterId) searchParams.set('afterId', afterId);
  if (isFavorited !== undefined) searchParams.set('favorited', isFavorited ? 'true' : 'false');

  const queryString = searchParams.toString();
  return queryString ? `/vocab/${itemType}s?${queryString}` : `/vocab/${itemType}s`;
}
