import { CreateWordSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addWord } from '@/backend/services/vocabulary.service';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { lemmatizeHeadword } from '@/libs/lemmatize/lemmatize';
import { createRlsSupabase } from '@/libs/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, readBearer } from '@/backend/utils/auth';

export async function POST(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (!auth || !auth.isValid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (auth.isMockUser) {
    return NextResponse.json({ message: 'Mock user cannot save words' }, { status: 400 });
  }

  const userJwt = readBearer(req.headers.get('authorization')) ?? req.cookies.get('token')?.value;

  if (!userJwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = CreateWordSchema.parse(body);

    const examplesNormalized = parsed.examples && parsed.examples.length > 0 ? parsed.examples : null;

    const lemma = parsed.lemma && parsed.lemma.trim() ? parsed.lemma.trim() : lemmatizeHeadword(parsed.headword);

    // ✅ 사용자 JWT로 만든 RLS 클라 주입
    const supabase = createRlsSupabase(userJwt);
    const result = await addWord(supabase, auth.id, { ...parsed, lemma, examples: examplesNormalized });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = getHttpStatus(error) ?? 500;
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status });
  }
}
