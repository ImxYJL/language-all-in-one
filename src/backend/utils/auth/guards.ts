import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuthToken } from './tokens';
import { verifyCustomToken } from './jwt';

export async function requireAuth(
  req: NextRequest,
  opts?: { requireRealUser?: boolean },
): Promise<{ user: { id: string; isMockUser: boolean }; token: string } | NextResponse> {
  const token = await getAuthToken(req);
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const user = await verifyCustomToken(token);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  if (opts?.requireRealUser && user.isMockUser) {
    return NextResponse.json({ message: 'Forbidden: mock user not allowed' }, { status: 403 });
  }

  return { token, user: { id: user.id, isMockUser: user.isMockUser } };
}
