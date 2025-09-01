import { NextResponse } from 'next/server';

export type AppErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION'
  | 'DUPLICATE'
  | 'NOT_FOUND'
  | 'RATE_LIMIT'
  | 'INTERNAL';

export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    message: string,
    public status: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static unauthorized(details?: unknown, message = 'Unauthorized') {
    return new AppError('UNAUTHORIZED', message, 401, details);
  }

  static forbidden(details?: unknown, message = 'Forbidden') {
    return new AppError('FORBIDDEN', message, 403, details);
  }

  static validation(details?: unknown, message = '입력값을 확인해 주세요.') {
    return new AppError('VALIDATION', message, 400, details);
  }

  static duplicate(details?: unknown, message = '이미 존재하는 항목입니다.') {
    return new AppError('DUPLICATE', message, 409, details);
  }

  static notFound(details?: unknown, message = '대상을 찾을 수 없습니다.') {
    return new AppError('NOT_FOUND', message, 404, details);
  }

  static rateLimit(details?: unknown, message = '요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.') {
    return new AppError('RATE_LIMIT', message, 429, details);
  }

  static internal(details?: unknown, message = '일시적인 오류가 발생했습니다.') {
    return new AppError('INTERNAL', message, 500, details);
  }
}

export function isAppError(e: unknown): e is AppError {
  return e instanceof AppError;
}

export function appErrorToResponse(e: AppError) {
  return NextResponse.json({ code: e.code, message: e.message, details: e.details }, { status: e.status });
}

export function handleRouteError(e: unknown) {
  if (isAppError(e)) return appErrorToResponse(e);

  if (process.env.NODE_ENV !== 'production') {
    console.error('[unhandled]', e);
  }

  return appErrorToResponse(AppError.internal());
}
