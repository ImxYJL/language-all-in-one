import 'server-only';

import { z } from 'zod';

export abstract class BaseApiClient {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async parseJsonResponse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
    try {
      const body = await response.json();
      return schema.parse(body);
    } catch (error) {
      console.error('API Response parsing or validation failed', error);
      throw new Error('Failed to parse or validate API response.');
    }
  }
}
