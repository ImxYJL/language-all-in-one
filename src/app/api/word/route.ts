import { NextRequest, NextResponse } from 'next/server';
import { CreateWordSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addWord } from '@/backend/services/vocabulary.service';
import { lemmatizeHeadword } from '@/libs/lemmatize/lemmatize';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { ZodError } from 'zod';
import { AppError, handleRouteError } from '@/backend/error/app';
import { isUniqueViolation } from '@/backend/error/db';

export async function POST(req: NextRequest) {
  try {
    const { token, authedUserInfo: userInfo } = await requireAuth(req, { requireRealUser: true });

    const body = await req.json();
    const parsed = CreateWordSchema.parse(body);

    const examples = parsed.examples?.length ? parsed.examples : null;
    const lemma = parsed.lemma?.trim() || lemmatizeHeadword(parsed.headword);

    const db = createRlsSupabase(token);
    const result = await addWord(db, userInfo.id, { ...parsed, lemma, examples });

    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }
    if (isUniqueViolation(e)) {
      return handleRouteError(AppError.duplicate('이미 존재하는 단어입니다.'));
    }
    return handleRouteError(e);
  }
}
