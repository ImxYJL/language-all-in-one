import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/validators/auth';
import { getUserByUsername } from '@/backend/models/users';
import { createAuthToken } from '@/backend/utils/auth';
import { isDev, isMockUser } from '@/backend/utils/env';
import { MOCKED_USER } from '@/libs/msw/mock/users';

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
  const body = await request.json();
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid login input' }, { status: 400 });
  }

  const { username, password } = parsed.data;

  if (isMockUser(username)) {
    const token = await createAuthToken({ id: MOCKED_USER.id });
    return createLoginResponse(token, 'Mock login success');
  }

  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  const token = await createAuthToken({ id: user.id });
  return createLoginResponse(token, 'Login success');
}
