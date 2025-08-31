import { SignJWT, jwtVerify } from 'jose';
import { ALG, kid, signKeyPromise, verifyKeyPromise } from './keys';
import { serverEnv } from '@/validators/env';
import type { ParsedAuthUser, AuthPayload } from './types';
import { getRealUserId } from '@/backend/utils/env';

export async function createAuthToken(payload: AuthPayload, expiresIn = '1h') {
  const key = await signKeyPromise;
  return await new SignJWT({
    ...payload,
    sub: String(payload.id),
    role: 'authenticated',
    aud: serverEnv.JWT_AUDIENCE,
  })
    .setProtectedHeader({ alg: ALG, kid })
    .setIssuer(serverEnv.JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

export async function verifyCustomToken(token: string): Promise<ParsedAuthUser | null> {
  try {
    const key = await verifyKeyPromise;
    const { payload } = await jwtVerify(token, key, {
      issuer: serverEnv.JWT_ISSUER,
      audience: serverEnv.JWT_AUDIENCE,
      algorithms: [ALG],
    });
    if (!payload.sub) return null;

    const realId = getRealUserId();
    const isRealUser = !!realId && payload.sub === realId;

    return { id: payload.sub, isValid: true, isRealUser, isMockUser: !isRealUser, payload };
  } catch {
    return null;
  }
}
