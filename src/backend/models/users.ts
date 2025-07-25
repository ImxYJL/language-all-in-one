import { supabase } from '@/libs/supabase/client';

interface GetUserByUsernameResponse {
  id: string;
  password: string;
}

export async function getUserByUsername(username: string): Promise<GetUserByUsernameResponse | null> {
  const { data, error } = await supabase.from('users').select('*').eq('username', username).single();

  if (error) return null;
  return data;
}
