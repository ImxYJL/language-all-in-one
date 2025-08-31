import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuthToken } from './tokens';
import { verifyCustomToken } from './jwt';
import { ParsedAuthUser } from '.';

type AuthedUser = Pick<ParsedAuthUser, 'id' | 'isMockUser'>;

export type AuthSuccess = {
  ok: true;
  user: AuthedUser;
  token: string;
};

export type AuthFailure = {
  ok: false;
  reason: 'no_token' | 'unauthorized' | 'forbidden';
  response: NextResponse;
};

export type AuthResult = AuthSuccess | AuthFailure;

export async function requireAuth(req: NextRequest, opts?: { requireRealUser?: boolean }): Promise<AuthResult> {
  const token = await getAuthToken(req);
  if (!token) {
    return {
      ok: false,
      reason: 'no_token',
      response: NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 }),
    };
  }

  const userInfo = await verifyCustomToken(token);
  if (!userInfo) {
    return {
      ok: false,
      reason: 'unauthorized',
      response: NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 }),
    };
  }

  if (opts?.requireRealUser && userInfo.isMockUser) {
    return {
      ok: false,
      reason: 'forbidden',
      response: NextResponse.json({ message: 'Forbidden: Mock user not allowed' }, { status: 403 }),
    };
  }

  return { ok: true, token, user: { id: userInfo.id, isMockUser: userInfo.isMockUser } };
}
