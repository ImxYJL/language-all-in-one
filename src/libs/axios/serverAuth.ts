import { cookies } from 'next/dist/server/request/cookies';

export function isServer() {
  return typeof window === 'undefined';
}

export async function getServerAuthCookieHeader(): Promise<Record<string, string>> {
  if (!isServer()) return {};

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return token ? { cookie: `token=${token}` } : {};
}

export async function withServerAuthHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
  const serverAuthCookieHeader = await getServerAuthCookieHeader();

  return { ...headers, ...serverAuthCookieHeader, 'Cache-Control': 'no-store' };
}
