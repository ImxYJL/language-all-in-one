import { NextRequest, NextResponse } from 'next/server';
import { CreateWordSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addWord } from '@/backend/services/vocabulary.service';
import { createRlsSupabase } from '@/libs/supabase/client';
import { lemmatizeHeadword } from '@/libs/lemmatize/lemmatize';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { requireAuth } from '@/backend/utils/auth/guards';

export async function POST(req: NextRequest) {
  const result = await requireAuth(req, { requireRealUser: true });
  if (!result.ok) return result.response;

  const { user, token } = result;

  try {
    const body = await req.json();
    const parsed = CreateWordSchema.parse(body);

    const examples = parsed.examples?.length ? parsed.examples : null;
    const lemma = parsed.lemma?.trim() || lemmatizeHeadword(parsed.headword);

    const supabase = createRlsSupabase(token);
    const result = await addWord(supabase, user.id, { ...parsed, lemma, examples });

    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: getErrorMessage(e) }, { status: getHttpStatus(e) ?? 500 });
  }
}
