import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/validators/auth';
import { getUserByUsername } from '@/backend/models/users';
import { createAuthToken } from '@/backend/utils/auth';
import { isDev, isMockUser } from '@/backend/utils/env';
import { MOCKED_USER_ID } from '@/libs/msw/mock/users';
import { AppError, handleRouteError } from '@/backend/error/app';
import { ZodError } from 'zod';

function createLoginResponse(token: string, message: string) {
  const res = NextResponse.json({ message });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: !isDev(),
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
  });
  return res;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = LoginSchema.parse(body);

    if (isMockUser(username)) {
      const token = await createAuthToken({ id: MOCKED_USER_ID });
      return createLoginResponse(token, '모킹 유저로 로그인에 성공했습니다.');
    }

    const user = await getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw AppError.unauthorized('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    const token = await createAuthToken({ id: user.id });

    return createLoginResponse(token, '관리자 유저로 로그인에 성공했습니다.');
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }

    return handleRouteError(e);
  }
}
