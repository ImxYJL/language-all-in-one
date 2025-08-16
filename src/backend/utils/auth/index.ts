import 'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { getRealUserId } from '@/backend/utils/env';
import { serverEnv } from '@/validators/env';

type AuthPayload = {
  id: string; // 사용자 uuid
  role?: string;
  [key: string]: unknown;
};

export async function createAuthToken(payload: AuthPayload, expiresIn = '1h') {
  const secret = new TextEncoder().encode(serverEnv.JWT_SECRET_KEY);
  return new SignJWT({ ...payload, sub: payload.id })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(serverEnv.JWT_ISSUER)
    .setAudience(serverEnv.JWT_AUDIENCE)
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export type ParsedAuthUser = {
  id: string;
  isValid: boolean; // 서명/만료/iss/aud 검증 통과 여부
  isRealUser: boolean; // uuid 규칙상 실유저인지
  isMockUser: boolean; // uuid 규칙상 모킹인지
};

// Bearer 헤더 문자열에서 토큰만 뽑는 보조 함수
function readBearer(auth?: string | null): string | undefined {
  if (!auth) return;

  const [scheme, ...rest] = auth.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return;

  const token = rest.join(' ').trim();
  return token || undefined;
}

// req가 있으면(CSR 도중 요청) req.cookies(동기) 우선, 없으면(SSR 도중 요청) await cookies() 사용
export async function getAuthUser(req?: NextRequest) {
  const tokenFromHeader = readBearer(req?.headers.get('authorization'));
  const tokenFromCookie = req ? req.cookies.get('token')?.value : (await cookies()).get('token')?.value;

  const token = tokenFromHeader ?? tokenFromCookie;
  if (!token) return null;

  return verifyAuthToken(token);
}

export async function verifyAuthToken(token: string): Promise<ParsedAuthUser | null> {
  try {
    const secret = new TextEncoder().encode(serverEnv.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret, {
      issuer: serverEnv.JWT_ISSUER,
      audience: serverEnv.JWT_AUDIENCE,
      algorithms: ['HS256'],
    });

    const id = payload.sub;
    if (!id) return null;

    const realId = getRealUserId();
    const isRealUser = !!realId && id === realId;
    const isMockUser = !isRealUser;

    return { id, isValid: true, isRealUser, isMockUser };
  } catch {
    return null;
  }
}
