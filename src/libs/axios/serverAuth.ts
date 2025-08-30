import { cookies } from 'next/dist/server/request/cookies';

export function isServer() {
  return typeof window === 'undefined';
}

/**
 * @function getServerAuthCookieHeader
 * @description
 * 서버 환경에서만 현재 요청의 `token` 쿠키 값을 읽어,
 * 서버-서버 요청(fetch) 시 사용할 `cookie` 헤더 객체를 반환
 *
 * @returns {Promise<Record<string, string>>}
 * - token 쿠키가 존재하면 `{ cookie: "token=<value>" }`
 * - 존재하지 않으면 빈 객체 `{}` 반환
 */
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
