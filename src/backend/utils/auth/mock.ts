import { serverEnv } from '@/validators/env';
import { SignJWT } from 'jose';

const MOCK_LOGIN_ALG = 'HS256';

export async function createMockToken(payload: { id: string }) {
  const secret = new TextEncoder().encode(serverEnv.SUPABASE_JWT_SECRET);

  return await new SignJWT({
    ...payload,
    sub: payload.id,
    role: 'authenticated',
  })
    .setProtectedHeader({ alg: MOCK_LOGIN_ALG })
    .setIssuer('mock')
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}
