import { adminSupabase } from '@/libs/supabase/client';

interface GetUserByUsernameResponse {
  id: string;
  password: string;
  email: string;
}

export async function getUserByUsername(username: string): Promise<GetUserByUsernameResponse | null> {
  const { data, error } = await adminSupabase
    .from('users')
    .select('id,password,email')
    .eq('username', username)
    .maybeSingle(); // 없으면 null 반환

  if (error) return null;
  return data;
}
