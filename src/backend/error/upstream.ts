/**
 * 특정 외부 서비스(Upstream) API 호출 실패를 나타내는 고수준 에러 클래스
 * 어떤 리소스를 요청하다가 에러가 났는지 안내
 */
export class UpstreamError extends Error {
  public readonly status: number;
  public readonly resource: string;
  public readonly body?: unknown;

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
