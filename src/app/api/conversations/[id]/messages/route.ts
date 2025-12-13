import { handleRouteError } from '@/backend/error';
import { getValidMessages } from '@/backend/services/llm/llm.service';
import { requireAuth } from '@/backend/utils/auth';
import { createRlsSupabase } from '@/libs/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { token, authedUserInfo } = await requireAuth(req, { requireRealUser: true });
    const { id } = await params;
    const db = createRlsSupabase(token);

    console.log('넘어온 id:', id);

    const messages = await getValidMessages(db, authedUserInfo.id, id);
    return NextResponse.json(messages);
  } catch (e) {
    return handleRouteError(e);
  }
}
