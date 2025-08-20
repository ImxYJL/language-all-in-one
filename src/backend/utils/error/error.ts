import 'server-only';

/**
 * 일반적인 HTTP 요청 실패를 나타내는 저수준 에러 클래스
 */
export class HttpClientError extends Error {
  public readonly status: number;
  public readonly response: Response;

  constructor(response: Response, message?: string) {
    super(message || `Request failed with status ${response.status}`);
    this.name = 'HttpClientError';
    this.status = response.status;
    this.response = response;
  }
}

export function isHttpClientError(e: unknown): e is HttpClientError {
  return e instanceof HttpClientError;
}

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

// --- 통합 헬퍼 함수 ---

/**
 * 다양한 종류의 에러 객체로부터 HTTP 상태 코드를 안전하게 추출
 */
export function getHttpStatus(e: unknown): number | undefined {
  if (isUpstreamError(e)) return e.status;
  if (isHttpClientError(e)) return e.status;

  return undefined;
}

/**
 * unknown 타입의 에러 객체로부터 에러 메시지(string)를 안전하게 추출
 * @param error 추출할 에러 객체
 * @returns 에러 메시지 문자열
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'An unknown error occurred';
}
