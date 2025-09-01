import { NextRequest } from 'next/server';
import { getAuthToken } from './tokens';
import { verifyCustomToken } from './jwt';
import type { ParsedAuthUser } from './types';
import { AppError } from '@/backend/error/app';

export type AuthedUser = Pick<ParsedAuthUser, 'id' | 'isMockUser'>;

export async function requireAuth(req: NextRequest, opts?: { requireRealUser?: boolean }) {
  const token = await getAuthToken(req);
  if (!token) throw AppError.unauthorized();

  const userInfo = await verifyCustomToken(token);
  if (!userInfo) throw AppError.unauthorized();

  if (opts?.requireRealUser && userInfo.isMockUser) {
    throw AppError.forbidden('Mock user not allowed');
  }

  const authedUserInfo: AuthedUser = { id: userInfo.id, isMockUser: userInfo.isMockUser };

  return { token, authedUserInfo };
}
