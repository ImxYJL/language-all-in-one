import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { wordnikClient } from '../clients/wordnik/wordnik.clients';

function getSecondsUntilKSTMidnight(): number {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;

  const nowKST = new Date(now.getTime() + kstOffset);
  const midnightKST = new Date(nowKST);

  midnightKST.setUTCHours(24, 0, 0, 0);
  const remainingMilliseconds = midnightKST.getTime() - nowKST.getTime();

  return Math.floor(remainingMilliseconds / 1000);
}

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
