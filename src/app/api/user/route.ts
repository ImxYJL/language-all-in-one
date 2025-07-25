import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { users } from '@/libs/data/users';
import { getUser } from '@/apis/users';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    const { payload } = await jwtVerify(token, secret);

    // If the user is from the mocked data, return the mocked data
    if (payload.name) {
      const mockedUser = users.find((user) => user.id === payload.id);
      if (mockedUser) {
        return NextResponse.json(mockedUser);
      }
    }

    // Otherwise, fetch the user from Supabase
    const user = await getUser(payload.id as string);
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
