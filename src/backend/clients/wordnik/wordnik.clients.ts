import 'server-only';

import { WORDNIK_BASE_URL, WORDNIK_DEFAULTS } from './wordnik.constants';
import {
  WnDefinition,
  WnDefinitionsSchema,
  WnErrorSchema,
  WnRandomWord,
  WnRelatedItem,
  WnRelatedSchema,
} from './wordnik.schemas';
import z from 'zod';
import { serverEnv } from '@/validators/env';

const WORDNIK_API_KEY = serverEnv.WORDNIK_API_KEY;

export interface GetDefinitionsParams {
  limit?: number;
  includeRelated?: boolean;
  useCanonical?: boolean;
  includeTags?: boolean;
}

export interface GetRelatedParams {
  useCanonical?: boolean;
  limitPerRelationshipType?: number;
  relationshipTypes?: 'synonym';
}

export class UpstreamError extends Error {
  constructor(
    public status: number,
    public resource: string,
    message: string,
  ) {
    super(message);
  }
}

function buildUrl(path: string, qs?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(`${WORDNIK_BASE_URL}${path}`);
  url.searchParams.set('api_key', WORDNIK_API_KEY);

  if (qs) {
    for (const [k, v] of Object.entries(qs)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  return url;
}

async function requestJson<T>(url: URL, resource: string, schema: z.ZodType<T>): Promise<T> {
  const startedAtMs = Date.now();
  const response = await fetch(url.toString(), { cache: 'no-store' });
  const elapsed = Date.now() - startedAtMs;
  console.log('[wordnik]', response.status, resource, `${elapsed}ms`);

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = undefined;
  }

  if (!response.ok) {
    const maybeError = WnErrorSchema.safeParse(body);
    const msg = maybeError.success ? (maybeError.data.message ?? maybeError.data.error ?? '') : '';

    throw new UpstreamError(response.status, resource, `Wordnik ${response.status} ${resource} ${msg}`.trim());
  }

  return schema.parse(body);
}

export async function getDefinitions(word: string, params?: GetDefinitionsParams): Promise<WnDefinition[]> {
  const p = { ...WORDNIK_DEFAULTS.definitions, ...params };
  const url = buildUrl(`/word.json/${encodeURIComponent(word)}/definitions`, {
    limit: p.limit,
    includeRelated: p.includeRelated,
    useCanonical: p.useCanonical,
    includeTags: p.includeTags,
  });

  return requestJson(url, 'definitions', WnDefinitionsSchema);
}

export async function getRelated(word: string, params?: GetRelatedParams): Promise<WnRelatedItem[]> {
  const p = { ...WORDNIK_DEFAULTS.related, ...params };
  const url = buildUrl(`/word.json/${encodeURIComponent(word)}/relatedWords`, {
    useCanonical: p.useCanonical,
    limitPerRelationshipType: p.limitPerRelationshipType,
    relationshipTypes: p.relationshipTypes,
  });

  try {
    return await requestJson(url, 'relatedWords', WnRelatedSchema);
  } catch (e) {
    // 유의어 없으면 Wordnik가 404를 주는 경우가 있음 → 빈 배열로 대체
    if (e instanceof UpstreamError && e.status === 404) return [];
    throw e;
  }
}

export async function getRandomWord(): Promise<string> {
  const url = buildUrl('/words.json/randomWord', {
    hasDictionaryDef: true,
  });
  const data = await requestJson<WnRandomWord>(
    url,
    'randomWord',
    z.object({
      id: z.number(),
      word: z.string(),
    }),
  );

  return data.word;
}
