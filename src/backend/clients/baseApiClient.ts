import 'server-only';

import { z } from 'zod';

export abstract class BaseApiClient {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async parseJsonResponse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
    if (!response.ok) {
      return this.handleErrorResponse(response);
    }

    try {
      const body = await response.json();
      return schema.parse(body);
    } catch (error) {
      console.error('API Response parsing or validation failed', error);
      throw new Error('Failed to parse or validate API response.');
    }
  }

  // 에러 처리를 사용처에게 위임
  protected abstract handleErrorResponse(response: Response): never;
}
