import { NextRequest, NextResponse } from 'next/server';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { AppError, handleRouteError } from '@/backend/error/app';
import { toggleFavorite } from '@/backend/services/vocabulary.service';
import { z } from 'zod';

const ParamsSchema = z.object({ itemId: z.uuid('invalid itemId') });
const BodySchema = z.object({ value: z.boolean() }).strict();

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ itemId: string }> }) {
  try {
    const { token } = await requireAuth(req, { requireRealUser: true });
    const { itemId } = ParamsSchema.parse(await ctx.params);
    const { value } = BodySchema.parse(await req.json());

    const db = createRlsSupabase(token);
    const res = await toggleFavorite(db, itemId, value);
    if (!res?.item_id) throw AppError.notFound();

    return NextResponse.json({
      itemId: res.item_id,
      favorited: res.favorited,
      favoritedAt: res.favorited_at,
    });
  } catch (e) {
    return handleRouteError(e);
  }
}
