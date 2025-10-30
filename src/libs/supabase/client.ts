import 'server-only';

import { serverEnv } from '@/validators/env';
import { createClient } from '@supabase/supabase-js';
import { SignJWT } from 'jose';
import { TOKEN_ALG } from '@/backend/utils/auth';
/**
 * admin 권한을 갖는 supabase client. RLS 우회용. 로그인 과정 중에 사용
 */
export const adminSupabase = createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function issueDbToken(userId: string) {
  return await new SignJWT({
    sub: userId, // 사용자 UUID (auth.uid()가 이 값이 됨)
    role: 'authenticated',
    aud: 'authenticated',
  })
    .setProtectedHeader({ alg: TOKEN_ALG })
    .setIssuer(serverEnv.JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(serverEnv.SUPABASE_JWT_SECRET));
}

/**
 * JWT 인증 정보를 통해 RLS 접근하는 supabase client. 일반적인 DB 접근에 사용
 */
export function createRlsSupabase(jwt: string) {
  return createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
    },
    global: {
      headers: { Authorization: `Bearer ${jwt}`, apikey: serverEnv.SUPABASE_ANON_KEY },
    },
  });
}
