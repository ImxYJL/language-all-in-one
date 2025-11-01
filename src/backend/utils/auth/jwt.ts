import { jwtVerify, SignJWT } from 'jose';
import { serverEnv } from '@/validators/env';
import { ParsedAuthUser } from './types';
import { MOCKED_USER_ID } from '@/libs/msw/mock/users';

export const TOKEN_ALG = 'HS256';
export const TOKEN_DURATION = {
  number: 60 * 60 * 4,
  string: '4h',
};

const HS_SECRET = new TextEncoder().encode(serverEnv.SUPABASE_JWT_SECRET);

// 로그인 인증을 위한 supabase auth token 검증
export async function verifyAuthToken(token: string): Promise<ParsedAuthUser> {
  const { payload } = await jwtVerify(token, HS_SECRET, {
    algorithms: [TOKEN_ALG],
    issuer: `${serverEnv.SUPABASE_URL}/auth/v1`,
    audience: 'authenticated',
  });

  const id = payload.sub ?? '';
  const isMock = id === MOCKED_USER_ID || payload.isMockUser === true;

  return {
    id,
    isValid: true,
    isRealUser: !isMock,
    isMockUser: isMock,
    payload,
  };
}

/**
 * RLS용 DB Token 발급 — 여전히 HS256 기반으로 Supabase가 내부적으로 사용하는 secret을 씀.
 * 이건 Supabase 서버의 내부 인증용이라 client-side에서 사용할 일 없음.
 */
export async function issueDbToken(userId: string) {
  const secret = new TextEncoder().encode(serverEnv.SUPABASE_JWT_SECRET);
  return await new SignJWT({
    sub: userId,
    role: 'authenticated',
    aud: 'authenticated',
  })
    .setProtectedHeader({ alg: TOKEN_ALG })
    .setIssuer('supabase')
    .setIssuedAt()
    .setExpirationTime(TOKEN_DURATION.string)
    .sign(secret);
}
