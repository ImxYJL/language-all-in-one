import 'server-only';

import { serverEnv } from '@/validators/env';
import { createClient } from '@supabase/supabase-js';

export const adminSupabase = createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
