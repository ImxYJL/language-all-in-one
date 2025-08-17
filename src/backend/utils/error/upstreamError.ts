import { hasResponseStatus, hasStatus } from '../typeGuard';

export class UpstreamError extends Error {
  readonly status: number;
  readonly resource: string;
  readonly body?: unknown;

  constructor(status: number, resource: string, message: string, body?: unknown) {
    super(message);
    this.name = 'UpstreamError';
    this.status = status;
    this.resource = resource;
    this.body = body;
  }
}

export function isUpstreamError(e: unknown): e is UpstreamError {
  return e instanceof UpstreamError;
}

export function getHttpStatus(e: unknown): number | undefined {
  if (isUpstreamError(e)) return e.status;
  if (hasStatus(e)) return e.status;
  if (hasResponseStatus(e)) return e.response.status;

  return undefined;
}
