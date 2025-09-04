import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { requireAuth } from '@/backend/utils/auth/guards';
import { createRlsSupabase } from '@/libs/supabase/client';
import { AppError, handleRouteError } from '@/backend/error';
import { getVocabList } from '@/backend/services/vocabulary.service';
import { VocaListRequestSchema } from '@/backend/clients/word/vocabulary.schemas';
import { ItemType } from '@/types/vocabulary';

export async function handleGetVocaList(req: NextRequest, itemType: ItemType) {
  try {
    const { dbToken } = await requireAuth(req, { requireRealUser: true });
    const db = createRlsSupabase(dbToken);

    const qarsedQueryParam = VocaListRequestSchema.parse(Object.fromEntries(new URL(req.url).searchParams));
    const result = await getVocabList(db, itemType, { ...qarsedQueryParam });

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }

    return handleRouteError(e);
  }
}
