import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@/validators/auth';
import { getUserByUsername } from '@/backend/models/users';
import { isDev, isMockUser } from '@/backend/utils/env';
import { MOCKED_USER_ID } from '@/libs/msw/mock/users';
import { AppError, handleRouteError } from '@/backend/error/app';
import { ZodError } from 'zod';
import { createMockToken } from '@/backend/utils/auth';
import { serverEnv } from '@/validators/env';

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
      const token = await createMockToken({ id: MOCKED_USER_ID });
      return createLoginResponse(token, '모킹 유저로 로그인에 성공했습니다.');
    }

    const user = await getUserByUsername(username);
    if (!user) {
      throw AppError.unauthorized('존재하지 않는 사용자입니다.');
    }

    const supabaseLoginRes = await fetch(`${serverEnv.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: serverEnv.SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password,
      }),
    });

    if (!supabaseLoginRes.ok) {
      const errText = await supabaseLoginRes.text();
      console.error('Supabase Auth Error:', supabaseLoginRes.status, errText);
      throw AppError.unauthorized('로그인에 실패했습니다.');
    }

    const { access_token } = await supabaseLoginRes.json();

    return createLoginResponse(access_token, '로그인에 성공했습니다.');
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }
    return handleRouteError(e);
  }
}
