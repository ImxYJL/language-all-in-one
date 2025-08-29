// 서버 전용에서만 사용하세요(클라이언트 컴포넌트에서 import 금지)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// wink-lemmatizer는 CJS 패키지라 default로 감싸질 수 있음 → 안전 래핑
let lm: any = require('wink-lemmatizer');
lm = lm?.default ?? lm; // default가 있으면 벗겨쓰기

type POS = 'noun' | 'verb' | 'adjective' | 'adverb';

export function lemmatizeHeadword(word: string, pos?: POS): string {
  const w = (word ?? '').trim();
  if (!w) return '';

  const api = lm || {};
  const noun = (s: string) => (typeof api.noun === 'function' ? api.noun(s) : s);
  const verb = (s: string) => (typeof api.verb === 'function' ? api.verb(s) : s);
  const adj = (s: string) => (typeof api.adjective === 'function' ? api.adjective(s) : s);
  const adv = (s: string) => (typeof api.adverb === 'function' ? api.adverb(s) : s);

  if (pos) {
    if (pos === 'noun') return noun(w);
    if (pos === 'verb') return verb(w);
    if (pos === 'adjective') return adj(w);
    if (pos === 'adverb') return adv(w);
  }

  // pos 미지정: 흔한 순서로 시도
  const v = verb(w);
  if (v !== w) return v;
  const n = noun(w);
  if (n !== w) return n;
  const a = adj(w);
  if (a !== w) return a;
  return adv(w);
}
