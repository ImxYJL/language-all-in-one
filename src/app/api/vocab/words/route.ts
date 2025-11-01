import { NextRequest, NextResponse } from 'next/server';
import { CreateWordSchema, VocaListRequestSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addWord, getVocabList } from '@/backend/services/vocabulary.service';
import { lemmatizeHeadword } from '@/libs/lemmatize/lemmatize';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { ZodError } from 'zod';
import { AppError, handleRouteError } from '@/backend/error/app';
import { isUniqueViolation } from '@/backend/error/db';

export async function POST(req: NextRequest) {
  try {
    const { token } = await requireAuth(req, { requireRealUser: true });

    const body = await req.json();
    const parsedBody = CreateWordSchema.parse(body);

    const examples = parsedBody.examples?.length ? parsedBody.examples : null;
    const lemma = parsedBody.lemma?.trim() || lemmatizeHeadword(parsedBody.headword);

    const db = createRlsSupabase(token);
    const result = await addWord(db, { ...parsedBody, lemma, examples });

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

export async function GET(req: NextRequest) {
  try {
    const { token } = await requireAuth(req, { requireRealUser: true });
    const db = createRlsSupabase(token);

    const parsedQueryParam = VocaListRequestSchema.parse(Object.fromEntries(new URL(req.url).searchParams));
    const result = await getVocabList(db, 'word', { ...parsedQueryParam });

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError) {
      return handleRouteError(AppError.validation());
    }

    return handleRouteError(e);
  }
}
