import { NextRequest } from 'next/server';
import { getAuthToken } from './tokens';
import { verifyCustomToken } from './jwt';
import type { ParsedAuthUser } from './types';
import { AppError } from '@/backend/error/app';
import { issueDbToken } from '@/libs/supabase/client';

export type AuthedUser = Pick<ParsedAuthUser, 'id' | 'isMockUser'>;

export async function requireAuth(req: NextRequest, opts?: { requireRealUser?: boolean }) {
  const token = await getAuthToken(req);
  if (!token) throw AppError.unauthorized();

  const userInfo = await verifyCustomToken(token);
  if (!userInfo) throw AppError.unauthorized();

  const dbToken = await issueDbToken(userInfo.id);
  if (opts?.requireRealUser && userInfo.isMockUser) {
    throw AppError.forbidden('Mock user not allowed');
  }

  const authedUserInfo: AuthedUser = { id: userInfo.id, isMockUser: userInfo.isMockUser };

  return { token, dbToken, authedUserInfo };
}
