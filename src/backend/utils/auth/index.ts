import 'server-only';

import { importJWK, jwtVerify, SignJWT, type JWTPayload, JWK } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { serverEnv } from '@/validators/env';
import { getRealUserId } from '@/backend/utils/env';
import { isJwk } from '../typeGuard';

export type ParsedAuthUser = {
  id: string;
  isValid: true;
  isRealUser: boolean;
  isMockUser: boolean;
  payload: JWTPayload;
};

type AuthPayload = { id: string; [k: string]: unknown };

const JWT_ALG = 'ES256' as const;

const parsedJwk = JSON.parse(serverEnv.SIGNING_PRIVATE_JWK);
if (!isJwk(parsedJwk)) {
  throw new Error('Invalid SIGNING_PRIVATE_JWK in environment variables. It is not a valid JWK format.');
}

const privateJwk: JWK = parsedJwk;
const signKeyPromise = importJWK(privateJwk, JWT_ALG);

// public key 파생(검증용)
const { kty, crv, x, y, kid } = privateJwk;
const publicJwk: JWK = { kty, crv, x, y, alg: JWT_ALG, use: 'sig', kid };
const verifyKeyPromise = importJWK(publicJwk, JWT_ALG);

export async function createAuthToken(payload: AuthPayload, expiresIn = '1h') {
  const signKey = await signKeyPromise;

  return await new SignJWT({
    ...payload,
    sub: String(payload.id),
    role: 'authenticated',
    aud: serverEnv.JWT_AUDIENCE,
  })
    .setProtectedHeader({ alg: 'ES256', kid })
    .setIssuer(serverEnv.JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(signKey);
}

export async function verifyCustomToken(token: string): Promise<ParsedAuthUser | null> {
  try {
    const verifyKey = await verifyKeyPromise;
    
    const { payload } = await jwtVerify(token, verifyKey, {
      issuer: serverEnv.JWT_ISSUER,
      audience: serverEnv.JWT_AUDIENCE,
      algorithms: [JWT_ALG],
    });
    const id = payload.sub;
    if (!id) return null;

    const realId = getRealUserId();
    const isRealUser = !!realId && id === realId;
    const isMockUser = !isRealUser;

    return { id, isValid: true, isRealUser, isMockUser, payload };
  } catch {
    return null;
  }
}

export function readBearer(auth?: string | null): string | undefined {
  if (!auth) return;

  const [scheme, ...rest] = auth.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return;

  return rest.join(' ').trim() || undefined;
}

export async function getAuthUser(req?: NextRequest): Promise<ParsedAuthUser | null> {
  const tokenFromHeader = readBearer(req?.headers.get('authorization'));
  const tokenFromCookie = req ? req.cookies.get('token')?.value : (await cookies()).get('token')?.value;

  const token = tokenFromHeader ?? tokenFromCookie;
  if (!token) return null;

  return verifyCustomToken(token);
}
