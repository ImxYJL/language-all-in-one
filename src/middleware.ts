import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/backend/utils/auth';

export async function middleware(request: NextRequest) {
  const parsedReq = await getAuthUser(request);

  const isValid = parsedReq ?? null;
  if (!isValid) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*'],
};
