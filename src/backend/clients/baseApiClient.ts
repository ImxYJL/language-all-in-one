import 'server-only';
import { z } from 'zod';
import { UpstreamError } from '../utils/error/error';

export abstract class BaseApiClient {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async checkResponseOk(response: Response, resource: string): Promise<void> {
    if (response.ok) return;

    let bodyText = ''; // 디버깅을 위한 error body 수집
    try {
      bodyText = await response.text();
    } catch {}
    throw new UpstreamError(response.status, resource, `Upstream request failed (${response.status})`, bodyText);
  }

  protected async parseJsonResponse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
    const body = await response.json();
    return schema.parse(body);
  }
}
