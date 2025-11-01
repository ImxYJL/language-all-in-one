import { NextRequest } from 'next/server';
import { verifyAuthToken } from './jwt';
import type { ParsedAuthUser } from './types';
import { AppError } from '@/backend/error/app';
import { getAuthToken } from './http';

export type AuthedUser = Pick<ParsedAuthUser, 'id' | 'isMockUser'>;
export type AuthOption = {
  requireRealUser?: boolean;
};

export async function requireAuth(req: NextRequest, opts?: AuthOption) {
  const token = await getAuthToken(req);
  if (!token) throw AppError.unauthorized('인증 과정에 문제가 생겼습니다.');

  const userInfo = await verifyAuthToken(token);
  if (!userInfo) throw AppError.unauthorized('유효하지 않은 접근입니다.');

  const authedUserInfo: AuthedUser = { id: userInfo.id, isMockUser: userInfo.isMockUser };

  return { token, authedUserInfo };
}
