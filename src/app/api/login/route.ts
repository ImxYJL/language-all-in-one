import { supabase } from '@/libs/supabase/client';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { users } from '@/libs/data/users';

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }

  const { data, error } = await supabase.from('users').select('id').eq('id', id).single();

  if (error || !data) {
    const mockedUser = users.find((user) => user.id === id);
    if (mockedUser) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
      const token = await new SignJWT({ id: mockedUser.id, name: mockedUser.name })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      const response = new NextResponse(JSON.stringify({ message: 'Login successful (mocked)' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60,
        path: '/',
      });

      return response;
    }
    return new NextResponse('User not found', { status: 404 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const token = await new SignJWT({ id: data.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  const response = new NextResponse(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    path: '/',
  });

  return response;
}