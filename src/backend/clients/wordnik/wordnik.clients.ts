import 'server-only';
import { z } from 'zod';
import { BaseApiClient } from '../baseApiClient';
import { serverEnv } from '@/validators/env';
import { WORDNIK_BASE_URL, WORDNIK_DEFAULT } from './wordnik.constants';
import {
  WnDefinition,
  WnDefinitionsSchema,
  WnRandomWord,
  WnRandomWordSchema,
  WnRelatedItem,
  WnRelatedSchema,
} from './wordnik.schemas';
import httpClient from '@/backend/utils/httpClient';
import { isHttpClientError, UpstreamError } from '@/backend/utils/error/error';
import { QueryParamValue } from '@/types/request';

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

export class WordnikClient extends BaseApiClient {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    super(WORDNIK_BASE_URL);
    this.apiKey = apiKey;
  }

  /**
   * HTTP 요청, JSON 파싱, 에러 변환을 한번에 처리하는 private 헬퍼 메서드
   */
  private async requestAndParse<T>(
    resource: string,
    url: string,
    schema: z.ZodType<T>,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const response = await httpClient(url, options);
      return await this.parseJsonResponse<T>(response, schema);
    } catch (error) {
      if (isHttpClientError(error)) {
        // 저수준 HttpClientError를 고수준 UpstreamError로 변환해 컨텍스트를 추가
        const bodyText = await error.response.text().catch(() => ''); // body 읽기 실패 시 빈 문자열
        throw new UpstreamError(error.status, resource, `Wordnik API request for '${resource}' failed.`, bodyText);
      }
      // HttpClientError가 아닌 다른 에러는 그대로 다시 던짐
      throw error;
    }
  }

  // --- Public API Methods ---

  public async getDefinitions(word: string, params?: GetDefinitionsParams): Promise<WnDefinition[]> {
    const resource = 'definitions';
    const query = { ...WORDNIK_DEFAULT.definitions, ...params };
    const url = this.buildUrl(`/word.json/${encodeURIComponent(word)}/definitions`, query);

    return this.requestAndParse<WnDefinition[]>(resource, url, WnDefinitionsSchema, { cache: 'no-store' });
  }

  public async getRelated(word: string, params?: GetRelatedParams): Promise<WnRelatedItem[]> {
    const resource = 'relatedWords';
    const query = { ...WORDNIK_DEFAULT.related, ...params };
    const url = this.buildUrl(`/word.json/${encodeURIComponent(word)}/relatedWords`, query);

    try {
      return await this.requestAndParse<WnRelatedItem[]>(resource, url, WnRelatedSchema, { cache: 'no-store' });
    } catch (error) {
      // ** 유의어가 없는 경우 Wordnik API가 404를 반환. **
      // 이 경우 에러를 던지는 대신, 빈 배열을 반환하여 정상 처리
      if (error instanceof UpstreamError && error.status === 404) {
        return [];
      }
      // 404가 아닌 다른 에러는 그대로 전달
      throw error;
    }
  }

  public async getRandomWord(): Promise<string> {
    const resource = 'randomWord';
    const url = this.buildUrl('/words.json/randomWord', { hasDictionaryDef: true });

    const data = await this.requestAndParse<WnRandomWord>(resource, url, WnRandomWordSchema, { cache: 'no-store' });

    return data.word;
  }

  private buildUrl(path: string, queryParams?: Record<string, QueryParamValue>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    url.searchParams.set('api_key', this.apiKey);

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }
}

export const wordnikClient = new WordnikClient(serverEnv.WORDNIK_API_KEY);
