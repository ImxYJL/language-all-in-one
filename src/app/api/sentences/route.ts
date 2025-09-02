import { NextRequest, NextResponse } from 'next/server';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { ZodError } from 'zod';
import { AppError, handleRouteError } from '@/backend/error/app';
import { isUniqueViolation } from '@/backend/error/db';
import { CreateSentenceSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addSentence } from '@/backend/services/vocabulary.service';

export async function POST(req: NextRequest) {
  try {
    const { dbToken } = await requireAuth(req, { requireRealUser: true });

    const body = await req.json();
    const parsedBody = CreateSentenceSchema.parse(body);

    const db = createRlsSupabase(dbToken);
    const result = await addSentence(db, { ...parsedBody });

    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }
    if (isUniqueViolation(e)) {
      return handleRouteError(AppError.duplicate('이미 존재하는 문장입니다.'));
    }
    return handleRouteError(e);
  }
}
