import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { wordnikClient } from '../clients/wordnik/wordnik.clients';
import { getSecondsUntilKSTMidnight } from '@/app/utils/times';

export const getCachedRandomWord = cache(
  // 실제 데이터를 가져오는 함수
  async () => wordnikClient.getRandomWord(),
  // 고유 캐시 키
  ['random-word-daily'],
  // 캐시 옵션
  {
    revalidate: getSecondsUntilKSTMidnight(),
    tags: ['words', 'random'],
  },
);
