export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export function hasNumber<K extends string>(k: K) {
  return (v: unknown): v is Record<K, number> => isRecord(v) && typeof v[k] === 'number';
}

// 외부 에러 호환용
export const hasStatus = hasNumber('status');
export function hasResponseStatus(v: unknown): v is { response: { status: number } } {
  return isRecord(v) && isRecord(v.response) && typeof v.response.status === 'number';
}
