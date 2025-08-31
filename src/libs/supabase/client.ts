import 'server-only';

import { serverEnv } from '@/validators/env';
import { createClient } from '@supabase/supabase-js';

/**
 * admin 권한을 갖는 supabase client. RLS 우회용. 로그인 과정 중에 사용
 */
export const adminSupabase = createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/**
 * JWT 인증 정보를 통해 RLS 접근하는 supabase client. 일반적인 DB 접근에 사용
 */
export function createRlsSupabase(userJwt: string) {
  return createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${userJwt}` } },
  });
}
