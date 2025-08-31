import type { NextRequest } from 'next/server';
import { cookies as getCookies } from 'next/headers';

export function readBearer(auth?: string | null): string | undefined {
  if (!auth) return;
  const [scheme, ...rest] = auth.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return;
  const token = rest.join(' ').trim();

  return token || undefined;
}

export async function getAuthToken(req?: NextRequest, cookieName = 'token') {
  const fromHeader = readBearer(req?.headers.get('authorization'));
  if (fromHeader) return fromHeader;

  if (req) return req.cookies.get(cookieName)?.value;
  const store = await getCookies();

  return store.get(cookieName)?.value;
}
