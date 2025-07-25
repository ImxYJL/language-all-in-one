import { jwtVerify, SignJWT } from 'jose';
import { isDev, isUsingMock, getRealUserId } from '@/backend/utils/env';
import { serverEnv } from '@/validators/env';

export function getTokenFromRequest(request: Request): string | undefined {
  const authHeader = request.headers.get('authorization');
  const cookieHeader = request.headers.get('cookie');

  return authHeader?.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '')
    : cookieHeader
        ?.split('; ')
        .find((c) => c.startsWith('token='))
        ?.split('=')[1];
}

interface AuthPayload {
  id: string;
  role?: string;
  [key: string]: unknown;
}

export async function createAuthToken(payload: AuthPayload, expiresIn = '1h'): Promise<string> {
  const secret = new TextEncoder().encode(serverEnv.JWT_SECRET_KEY);

  return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(expiresIn).sign(secret);
}

export interface ParsedAuthUser {
  id: string;
  isValid: boolean;
  isRealUser: boolean;
  isMockUser: boolean;
}

export async function verifyAuthToken(token: string): Promise<ParsedAuthUser | null> {
  try {
    const secret = new TextEncoder().encode(serverEnv.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    const id = payload.id as string;
    const realId = getRealUserId();

    const isRealUser = id === realId;
    const isMockUser = !isRealUser;

    const isValid = isRealUser || isMockUser || isDev() || isUsingMock();

    return { id, isValid, isRealUser, isMockUser };
  } catch {
    return null;
  }
}
