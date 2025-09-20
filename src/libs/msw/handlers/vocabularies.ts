import { http, HttpResponse } from 'msw';
import { MOCKED_WORDS } from '../mock/vocabularies';
import { paginateByCursor, PaginatedBody } from './utils/pagenate';
import { DEFAULT_SIZE_PER_PAGE } from '@/apis/vocabulary';

function parseQuery(urlStr: string) {
  const url = new URL(urlStr);
  const limit = Number(url.searchParams.get('limit') ?? DEFAULT_SIZE_PER_PAGE);
  const afterId = url.searchParams.get('afterId') ?? null;
  const favorited = url.searchParams.get('favorited'); // 'true' | 'false' | null

  return { limit, afterId, favorited };
}

export const getWords = () =>
  http.get('/api/vocab/words', async ({ request }) => {
    const { limit, afterId, favorited } = parseQuery(request.url);

    let baseArr = MOCKED_WORDS;
    if (favorited === 'true') baseArr = baseArr.filter((x) => x.favorited);
    if (favorited === 'false') baseArr = baseArr.filter((x) => !x.favorited);

    const { item, next } = paginateByCursor(baseArr, { limit, afterId });
    const body: PaginatedBody<(typeof baseArr)[number]> = { item, next };

    return HttpResponse.json(body);
  });

const vocabularyHandler = [getWords()];

export default vocabularyHandler;
