import { JWK } from 'jose';

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

/**
 * 주어진 값이 JWK 타입인지 확인
 * @param value 확인할 값
 */
export function isJwk(value: unknown): value is JWK {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const hasKty = 'kty' in value && typeof (value as JWK).kty === 'string';
  const hasKid = 'kid' in value && typeof (value as JWK).kid === 'string';

  return hasKty && hasKid;
}
