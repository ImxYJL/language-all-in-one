import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyAuthToken } from '@/backend/utils/auth';

export async function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request);

  const parsed = token ? await verifyAuthToken(token) : null;

  if (!parsed?.isValid) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
