import { NextRequest, NextResponse } from 'next/server';
import { readBearer } from '@/backend/utils/auth';

export async function middleware(req: NextRequest) {
  const token = readBearer(req.headers.get('authorization')) ?? req.cookies.get('token')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// '/vocabulary/:path*'
export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*'],
};
