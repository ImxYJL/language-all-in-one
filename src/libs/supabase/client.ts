import { createClient } from '@supabase/supabase-js';
import { serverEnv } from '@/validators/env';

export const supabase = createClient(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_ANON_KEY);
